const express = require('express');
const request = require('request');
const { URL } = require('url');
const app = express();
const PORT = process.env.PORT || 3000;

// Define streams
const streams = {
  ATBS: {
    name: 'ATBS Global',
    url: 'https://live20.bozztv.com/giatv/giatv-ATBSGLOBAL/ATBSGLOBAL/chunks.m3u8'
  },
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
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/53097.m3u8'
  },
  skyaction: {
    name: 'Sky Sports Action',
    url: 'https://s.rocketdns.info:443/live/xmltv/02a162774b/2195.m3u8'
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
    url: 'http://vad7.secsoc.cc:8080/live/play/YkVwekwzRkRMM2xTZVZOdWNHbFNNMGxDT0VGNlltZE1TSGhHVTJwUFdrUlljRXQ0TjNoM1Rsb3hiejA9/297522'
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
  },
  fight: {
    name: 'fight',
   url: 'http://originhd-1.dens.tv/h/h05/02.m3u8'
      },
  STBS: {
    name: 'stbs',
   url: 'https://live20.bozztv.com/akamaissh101/ssh101/stbsph88/chunks.m3u8'
    },
    Highlightstv: {
    name: 'Highlighttv',
   url: 'https://live20.bozztv.com/giatvplayout7/giatv-208173/tracks-v1a1/mono.m3u8'
    },
    Dreamstvph: {
    name: 'Dreams tv ph',
   url: 'https://live20.bozztv.com/giatvplayout7/giatv-209574/tracks-v1a1/mono.m3u8'
    },
    startvph: {
    name: 'Star TV PHILIPPINES',
   url: 'https://live20.bozztv.com/giatvplayout7/giatv-208168/tracks-v1a1/mono.m3u8'
    },
    Dreamstartv: {
    name: 'Dream star tv',
   url: 'https://live20.bozztv.com/giatvplayout7/giatv-10410/tracks-v1a1/mono.m3u8'
    },
};

// Enable CORS + logging
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Serve .m3u8 proxy
app.get('/playlist.m3u8', (req, res) => {
  const key = req.query.stream;
  const stream = streams[key];

  if (!stream) return res.status(400).send('❌ Invalid stream key.');

  const baseUrl = new URL(stream.url);
  const basePath = baseUrl.href.substring(0, baseUrl.href.lastIndexOf('/') + 1);

  request.get(stream.url, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(500).send('❌ Unable to fetch the playlist.');
    }

    // Replace relative or absolute paths
    const rewritten = body.replace(/^(?!#)(.+)$/gm, (line) => {
      line = line.trim();
      if (!line || line.startsWith('#')) return line;

      // Handle relative + absolute
      const absoluteUrl = new URL(line, basePath).href;
      return `/segment.ts?url=${encodeURIComponent(absoluteUrl)}`;
    });

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(rewritten);
  });
});

// Serve segments (.ts, .aac, nested .m3u8)
app.get('/segment.ts', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !/^https?:\/\//i.test(targetUrl)) {
    return res.status(400).send('❌ Invalid or missing URL.');
  }

  request
    .get(targetUrl)
    .on('response', (r) => {
      const contentType = r.headers['content-type'] || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
    })
    .on('error', () => res.status(500).send('❌ Segment proxy failed.'))
    .pipe(res);
});

// Homepage
app.get('/', (req, res) => {
  const links = Object.entries(streams).map(
    ([key, stream]) => `<li><a href="/playlist.m3u8?stream=${key}" target="_blank">${stream.name}</a></li>`
  ).join('');

  res.send(`
    <h2>🎬 Fully Supported HLS Proxy</h2>
    <p>Click a channel:</p>
    <ul>${links}</ul>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
