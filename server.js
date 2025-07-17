const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/stream', (req, res) => {
  const streamUrl = 'https://zekonew.newkso.ru/zeko/premium300/mono.m3u8';

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Android 13; Mobile; rv:139.0) Gecko/139.0 Firefox/139.0',
    'Referer': 'https://yoxplay.xyz/',
    'Origin': 'https://yoxplay.xyz',
    'Accept-Encoding': 'gzip, deflate, br',
  };

  // Set MIME type for HLS playlist
  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');

  // Stream with error handling
  request({ url: streamUrl, headers })
    .on('error', (err) => {
      res.status(500).send('Stream error: ' + err.message);
    })
    .pipe(res);
});

app.listen(7860, () => {
  console.log('✅ Server running on http://localhost:7860');
});
