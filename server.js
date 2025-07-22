const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Named stream list
const streams = {
  mrbean: {
    name: 'Mr. Bean',
    url: 'https://amg00627-amg00627c30-rakuten-es-3990.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanescc-rakutenes/playlist.m3u8'
  },
  kartoon: {
    name: 'Kartoon Channel',
    url: 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-kartoonchannel-samsungnz/playlist.m3u8'
  },
  a2z: {
    name: 'a2z',
    url: 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5.m3u8'
  },
  kidsflix: {
    name: 'KidsFlix',
    url: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50'
  }
};

// Middleware: CORS + Logging
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Playlist route: /playlist.m3u8?stream=mrbean
app.get('/playlist.m3u8', (req, res) => {
  const key = req.query.stream;
  const stream = streams[key];

  if (!stream) return res.status(400).send('Invalid stream name.');

  request.get(stream.url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).send('Failed to fetch playlist.');
    }

    // Rewrite all .ts URLs to go through this server
    const rewritten = body.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      return `/segment.ts?url=${encodeURIComponent(url)}`;
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(rewritten);
  });
});

// Segment proxy route
app.get('/segment.ts', (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith('http')) return res.status(400).send('Invalid segment URL.');

  request
    .get(url)
    .on('error', () => res.status(500).send('Segment error.'))
    .pipe(res);
});

// Homepage: list all streams with names
app.get('/', (req, res) => {
  const list = Object.entries(streams).map(
    ([key, stream]) => `<li><a href="/playlist.m3u8?stream=${key}">${stream.name}</a></li>`
  ).join('');

  res.send(`
    <h2>🎬 HLS Proxy Server</h2>
    <p>Select a stream below:</p>
    <ul>${list}</ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ HLS Proxy Server running at http://localhost:${PORT}`);
});
