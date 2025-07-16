const express = require('express');
const request = require('request');
const app = express();

// Allow cross-origin (CORS)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Stream route
app.get('/stream', (req, res) => {
  const streamUrl = 'https://zekonew.newkso.ru/zeko/premium300/mono.m3u8';

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Android 13; Mobile; rv:139.0) Gecko/139.0 Firefox/139.0',
    'Referer': 'https://yoxplay.xyz/',
    'Origin': 'https://yoxplay.xyz',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
  };

  request
    .get({ url: streamUrl, headers })
    .on('error', (err) => {
      console.error('Proxy Error:', err.message);
      res.status(500).send('Stream failed: ' + err.message);
    })
    .pipe(res);
});

const PORT = process.env.PORT || 7860;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
