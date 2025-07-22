const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/stream', (req, res) => {
  const streamUrl = 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/26f350e4a688a9a15a10f1c76712551f.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6IjI2ZjM1MGU0YTY4OGE5YTE1YTEwZjFjNzY3MTI1NTFmIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzE3MzA4MH0.S0xFQU5FTUJFRA';

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Android 13; Mobile; rv:139.0) Gecko/139.0 Firefox/139.0',
    'Referer': 'https://kleanembed.online/',
    'Origin': 'https://kleanembed.online',
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
