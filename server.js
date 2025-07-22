const express = require('express');
const request = require('request');
const app = express();

app.use((req, res, next) => {
  // CORS headers (optional for VLC)
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/master.m3u8', (req, res) => {
  const streamUrl = 'https://dice-live-ap.akamaized.net/hls/live/2000230/274551-300568/exchange274551xuwnr_274551_800/chunklist.m3u8?hdntl=exp=1753251648~acl=%2f*~id=8adbb090-326d-4f9a-95a4-cd40f8663de3~data=hdntl,dWlkPVRIeWk2RnxjYTkxOGMzNi0yMjM2LTRhYjYtYTc4ZC1mNDgzY2RhYTliZjkmaXA9MTgwLjE5MC4xNzUuMjAxJmV4cD0xNzUzMjUxNjc3JmVpZD0yNzQ1NTEmY2lkPWRjZS50YXBnbyZvaWQ9MzI1JnR5cGU9TElWRQ~hmac=a6390b080c036a23c6ecedd6617ba154b1a190586fbf8c3ebb01a7cfa1e611f5';

  const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:139.0) Gecko/20100101 Firefox/139.0',
    'Referer': 'https://app.blasttv.ph/',
    'Origin': 'https://app.blasttv.ph',
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
