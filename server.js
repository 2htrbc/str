const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/stream', (req, res) => {
  const url = 'https://yfkijlwj1wm320xr.youaresoselfish.online/v3/director/VE1Y2MyYTFhM2RmNmJjLTk1MGItZjdiNC03YTQ1LTA3ZTdkMmYy/master.m3u8?md5=D13ZqEXuyCRqIbwLoafbYw&expires=1752753885&t=1752710685'; // your real stream URL

  const headers = {
    'Host': 'yfkijlwj1wm320xr.youaresoselfish.online',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Origin': 'https://veplay.top',
    'Referer': 'https://veplay.top/',
    'Connection': 'keep-alive'
  };

  request({ url, headers }).on('error', err => {
    res.status(500).send('Stream error');
  }).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
