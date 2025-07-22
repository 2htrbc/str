const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  // CORS headers (optional for VLC)
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/master.m3u8', (req, res) => {
  const streamUrl = 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/26f350e4a688a9a15a10f1c76712551f.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6IjI2ZjM1MGU0YTY4OGE5YTE1YTEwZjFjNzY3MTI1NTFmIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzE3MzA4MH0.S0xFQU5FTUJFRA';

  const headers = {
    'User-Agent': 'VLC/3.0.20 LibVLC/3.0.20',
    'Referer': 'https://kleanembed.online/',
    'Origin': 'https://kleanembed.online',
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
