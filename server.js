const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Your stream URLs (HLS master or variant .m3u8)
const streamList = {
  1: 'https://2-fss-2.streamhoster.com/pl_140/amlst:200914-1298290/chunklist_b2000000.m3u8',
  2: 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-kartoonchannel-samsungnz/playlist.m3u8',
  3: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50',
};

// CORS + Logging
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve .m3u8 playlists
app.get('/playlist.m3u8', (req, res) => {
  const streamId = req.query.stream;
  const streamUrl = streamList[streamId];

  if (!streamUrl) {
    return res.status(400).send('Invalid stream ID');
  }

  request.get(streamUrl, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).send('Failed to load playlist');
    }

    // Rewrite .ts segment URLs to go through /segment endpoint
    const rewritten = body.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      return `/segment.ts?url=${encodeURIComponent(url)}`;
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(rewritten);
  });
});

// Proxy .ts segments
app.get('/segment.ts', (req, res) => {
  const url = req.query.url;

  if (!url || !url.startsWith('http')) {
    return res.status(400).send('Invalid segment URL');
  }

  request
    .get(url)
    .on('error', () => res.status(500).send('Segment error'))
    .pipe(res);
});

// Root page
app.get('/', (req, res) => {
  res.send(`
    <h2>HLS Proxy Server</h2>
    <p>Use the links below:</p>
    <ul>
      <li><a href="/playlist.m3u8?stream=1">Stream 1</a></li>
      <li><a href="/playlist.m3u8?stream=2">Stream 2</a></li>
      <li><a href="/playlist.m3u8?stream=3">Stream 3</a></li>
    </ul>
  `);
});

// Start
app.listen(PORT, () => {
  console.log(`✅ HLS Proxy Server running at http://localhost:${PORT}`);
});
