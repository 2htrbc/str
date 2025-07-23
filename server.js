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
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/888520f36cd94c5da4c71fddc1a5fc9b.m3u8?auth=...'
  },
  skyaction: {
    name: 'Sky Sports Action',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/wra2wlraTrewrAwohlsiCr0kUpHlswuc.m3u8?auth=...'
  },
  skyfootball: {
    name: 'Sky Sports Football',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/zuw3aYlboraPaStUP4o5ropHlbrospev.m3u8?auth=...'
  },
  skymainevent: {
    name: 'Sky Sports Main Event',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/4reStAcaHuraStIc3o7rOdRAprEy2glB.m3u8?auth=...'
  },
  skymix: {
    name: 'Sky Sports Mix',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/phAjl4we7iw0agitOpro8Rlcrotrufre.m3u8?auth=...'
  },
  skyracing: {
    name: 'Sky Sports Racing',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/x5Dodrl6Ro21RUprudEQAFRUTEfLPhec.m3u8?auth=...'
  },
  skygolf: {
    name: 'Sky Sports Golf',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/juDiYAyaWljAtH55usw2sWogINI49kIY.m3u8?auth=...'
  },
  skycricket: {
    name: 'Sky Sports Cricket',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/j5ru6icHofROsespidec64w0s7lgo8ot.m3u8?auth=...'
  },
  skytennis: {
    name: 'Sky Sports Tennis',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/pA5reZusPAvispo16hUb2e5pahlthLB2.m3u8?auth=...'
  },
  skypremierleague: {
    name: 'Sky Sports Premier League',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/swapr5jlpHidrlfR65ofRi8a0itHI6oc.m3u8?auth=...'
  },
  skymotogp: {
    name: 'Sky Sports MotoGP',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/1c6f53f565af34b3099d28adba983591.m3u8?auth=...'
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
