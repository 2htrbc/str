const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/stream', (req, res) => {
  const url = 'https://wikinew.newkso.ru/wiki/ustvbtn/mono.m3u8';
  const headers = {
    'Host': 'wikinew.newkso.ru',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Origin': 'https://topembed.pw',
    'Referer': 'https://topembed.pw/',
    'Connection': 'keep-alive'
  };

  request({ url, headers }).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy running on port ${port}`));
