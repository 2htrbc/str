const express = require('express');
const request = require('request');
const app = express();
const PORT = process.env.PORT || 3000;

// Named stream list
const streams = {
  mrbean: {
    name: 'Mr. Bean',
    url: 'https://amg00627-amg00627c30-rakuten-es-3990.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanescc-rakutenes/playlist.m3u8'
  },
  kartoon: {
    name: 'Kartoon Channel',
    url: 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-kartoonchannel-samsungnz/playlist.m3u8'
  },
  a2z: {
    name: 'a2z',
    url: 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_5.m3u8'
  },
  kidsflix: {
    name: 'KidsFlix',
    url: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50'
  },
  skyf1: {
    name: 'Sky Sports F1',
    url: 'https://s.rocketdns.info:443/live/xmltv/02a162774b/2189.m3u8'
  },
  skyaction: {
    name: 'Sky Sports Action',
    url: 'https://nl1.rocketdns.info:25463/live/xmltv/02a162774b/2194.m3u8?token=HkNcWEBYFAkUUQFXA1lQDQBfUgcFDVFRAVBRUFJRVAJWVQYOVgEBAwUSH0ZAFRFRUwtoXlQaXgFTWAcdERBBVhc+XV0RChQABgcAUQFDTxZGD1pSEgJUH0ARWlURXxALXVEDGx8SU0tCVUEKUg08UFcQXlRVGl5dFw1fHREKXGwBBFlYXVQUCRQAEUgRCBBEEFxZQlxUSBEACEdDUhFXEV9DBgEHABQfFFNcEV0VEU0QXBVneBpIEQcZR1RdFltcC0MOG14DQwsUHBENQD4RUUESRVJRVQFBQFsRARFJEF4EGWtaXF5YVlVEWgtdEkEOEFcCBxIURl4ND1pFXBdtQwwFFgMRAQYCBAURGQ=='
  },
  skyfootball: {
    name: 'Sky Sports Football',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/zuw3aYlboraPaStUP4o5ropHlbrospev.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6Inp1dzNhWWxib3JhUGFTdFVQNG81cm9wSGxicm9zcGV2IiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTQzN30.S0xFQU5FTUJFRA'
  },
  skymainevent: {
    name: 'Sky Sports Main Event',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/4reStAcaHuraStIc3o7rOdRAprEy2glB.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6IjRyZVN0QWNhSHVyYVN0SWMzbzdyT2RSQXByRXkyZ2xCIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTQ5MX0.S0xFQU5FTUJFRA'
  },
  skymix: {
    name: 'Sky Sports Mix',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/phAjl4we7iw0agitOpro8Rlcrotrufre.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6InBoQWpsNHdlN2l3MGFnaXRPcHJvOFJsY3JvdHJ1ZnJlIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTU4Nn0.S0xFQU5FTUJFRA'
  },
  skyracing: {
    name: 'Sky Sports Racing',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/x5Dodrl6Ro21RUprudEQAFRUTEfLPhec.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6Ing1RG9kcmw2Um8yMVJVcHJ1ZEVRQUZSVVRFZkxQaGVjIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTY1NH0.S0xFQU5FTUJFRA'
  },
  skygolf: {
    name: 'Sky Sports Golf',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/juDiYAyaWljAtH55usw2sWogINI49kIY.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6Imp1RGlZQXlhV2xqQXRINTV1c3cyc1dvZ0lOSTQ5a0lZIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTc0NH0.S0xFQU5FTUJFRA'
  },
  skycricket: {
    name: 'Sky Sports Cricket',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/j5ru6icHofROsespidec64w0s7lgo8ot.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6Imo1cnU2aWNIb2ZST3Nlc3BpZGVjNjR3MHM3bGdvOG90IiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTc5MX0.S0xFQU5FTUJFRA'
  },
  skytennis: {
    name: 'Sky Sports Tennis',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/pA5reZusPAvispo16hUb2e5pahlthLB2.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6InBBNXJlWnVzUEF2aXNwbzE2aFViMmU1cGFobHRoTEIyIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTg1Mn0.S0xFQU5FTUJFRA'
  },
  skypremierleague: {
    name: 'Sky Sports Premier League',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/swapr5jlpHidrlfR65ofRi8a0itHI6oc.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6InN3YXByNWpscEhpZHJsZlI2NW9mUmk4YTBpdEhJNm9jIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTg5Nn0.S0xFQU5FTUJFRA'
  },
  skymotogp: {
    name: 'Sky Sports MotoGP',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/1c6f53f565af34b3099d28adba983591.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6IjFjNmY1M2Y1NjVhZjM0YjMwOTlkMjhhZGJhOTgzNTkxIiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTk2N30.S0xFQU5FTUJFRA'
  }
};

// Middleware: CORS + Logging
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Playlist route: /playlist.m3u8?stream=skyf1
app.get('/playlist.m3u8', (req, res) => {
  const key = req.query.stream;
  const stream = streams[key];

  if (!stream) return res.status(400).send('Invalid stream name.');

  request.get(stream.url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).send('Failed to fetch playlist.');
    }

    const rewritten = body.replace(/(https?:\/\/[^\s]+)/g, (url) => {
      return `/segment.ts?url=${encodeURIComponent(url)}`;
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(rewritten);
  });
});

// Segment proxy route
app.get('/segment.ts', (req, res) => {
  const url = req.query.url;
  if (!url || !url.startsWith('http')) return res.status(400).send('Invalid segment URL.');

  request
    .get(url)
    .on('error', () => res.status(500).send('Segment error.'))
    .pipe(res);
});

// Homepage: list all streams
app.get('/', (req, res) => {
  const list = Object.entries(streams).map(
    ([key, stream]) => `<li><a href="/playlist.m3u8?stream=${key}">${stream.name}</a></li>`
  ).join('');

  res.send(`
    <h2>🎬 HLS Proxy Server</h2>
    <p>Select a stream below:</p>
    <ul>${list}</ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ HLS Proxy Server running at http://localhost:${PORT}`);
});
