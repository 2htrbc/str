const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  // CORS headers (optional for VLC)
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/master.m3u8', (req, res) => {
  const streamUrl = 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5.m3u8';

  const headers = {
    'User-Agent': '',
    'Referer': '',
    'Origin': '',
    'Accept': '*/*',
  };

  // Important: Prevent compression issues with binary streams
  request({
    url: streamUrl,
    headers,
    gzip: false,
    encoding: null, // binary mode
  })
    .on('response', (response) => {
      // Pass through the correct content-type from origin if available
      const contentType = response.headers['content-type'] || 'application/vnd.apple.mpegurl';
      res.setHeader('Content-Type', contentType);
    })
    .on('error', (err) => {
      res.status(500).send('Stream error: ' + err.message);
    })
    .pipe(res);
});

const PORT = 7860;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}/stream`);
});
