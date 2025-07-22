const express = require('express');
const request = require('request');
const app = express();

// Optional CORS (VLC usually ignores, browsers care more)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/master.m3u8', (req, res) => {
  const streamUrl = 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5.m3u8';

  const headers = {
    'User-Agent': req.headers['user-agent'] || 'VLC/3.0.18 LibVLC/3.0.18',
    'Referer': 'https://example.com/',  // Optional: Match expected referer if needed
    'Origin': 'https://example.com',
    'Accept': '*/*',
  };

  request({
    url: streamUrl,
    headers,
    gzip: false,
    encoding: null, // binary mode ensures smooth stream pipe
  })
    .on('response', (response) => {
      const contentType = response.headers['content-type'] || 'application/vnd.apple.mpegurl';
      res.setHeader('Content-Type', contentType);
    })
    .on('error', (err) => {
      console.error('Streaming error:', err.message);
      res.status(500).send('Stream error: ' + err.message);
    })
    .pipe(res);
});

const PORT = 7860;
app.listen(PORT, () => {
  console.log(`✅ Stream proxy running at: http://localhost:${PORT}/master.m3u8`);
});
