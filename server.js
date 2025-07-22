const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// List of stream endpoints
const streams = {
  stream1: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/pH1yC6tG9rU2pL5zQ0nH3sI8wB4tFi.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6InBIMXlDNnRHOXJVMnBMNXpRMG5IM3NJOHdCNHRGaSIsInR5cGUiOiJwbGF5bGlzdF9hY2Nlc3MiLCJleHAiOjE3NTMxODI1MjB9.S0xFQU5FTUJFRA',
  stream2: 'https://example.com/stream2/master.m3u8',
  stream3: 'https://example.com/stream3/master.m3u8'
};

// Middleware for logging and CORS
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Dynamically create routes for each stream
Object.keys(streams).forEach((key) => {
  app.get(`/${key}`, (req, res) => {
    const streamUrl = streams[key];
    console.log(`Proxying: ${streamUrl}`);

    request
      .get(streamUrl)
      .on('error', (err) => {
        console.error(`Error fetching ${streamUrl}:`, err.message);
        res.status(500).send('Stream error');
      })
      .pipe(res);
  });
});

// Default route
app.get('/', (req, res) => {
  res.send(`
    <h2>IPTV Proxy Server</h2>
    <ul>
      ${Object.keys(streams)
        .map((key) => `<li><a href="/${key}">${key}</a></li>`)
        .join('')}
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ IPTV proxy server running on http://localhost:${PORT}`);
});
