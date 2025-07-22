const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// DASH (MPD) DRM Streams
const drmStreams = {
  kapamilya: {
    name: 'Kapamilya Channel HD',
    mpd: 'http://143.44.136.110:6910/001/2/ch00000090990000001286/manifest.mpd?virtualDomain=001.live_hls.zte.com',
    license: 'http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00',
    type: 'com.widevine.alpha',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKm2Lrh11LXGy-bF04OpzO3M4xMrbRigxnTzbIFP5gMYKsSmAkwZnw_wsu&s=10'
  }
};

// CORS and Logging Middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// DASH manifest route
app.get('/manifest.mpd', (req, res) => {
  const stream = drmStreams[req.query.stream];
  if (!stream) return res.status(400).send('Invalid stream.');

  res.redirect(stream.mpd); // Redirect directly to the real MPD URL
});

// DRM license info route (optional helper for clients)
app.get('/license-info', (req, res) => {
  const stream = drmStreams[req.query.stream];
  if (!stream) return res.status(400).send('Invalid stream.');

  res.json({
    license_key: stream.license,
    license_type: stream.type,
    mpd: stream.mpd
  });
});

// Home page - shows available DRM streams
app.get('/', (req, res) => {
  const list = Object.entries(drmStreams)
    .map(([key, s]) => `
      <li>
        <img src="${s.logo}" alt="${s.name}" style="height:40px;vertical-align:middle;" />
        <strong>${s.name}</strong><br/>
        ➤ <a href="/manifest.mpd?stream=${key}">Play MPD</a> |
        <a href="/license-info?stream=${key}">View License Info</a>
      </li>
    `).join('');

  res.send(`
    <h2>🎥 DASH DRM Proxy Server</h2>
    <ul>${list}</ul>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ DASH Proxy Server running at http://localhost:${PORT}`);
});
