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
      STBSGLOBAL: {
    name: 'STBS GLOBAL',
   url: 'https://live20.bozztv.com/giatvplayout7/giatv-208591/tracks-v1a1/mono.m3u8'
    },
  "3RSTV": {
    name: '3RS TV',
    url: 'https://live20.bozztv.com/giatvplayout7/giatv-210267/tracks-v1a1/mono.m3u8'
  },
  "3RSMOVIE": {
    name: '3RS MOVIE',
    url: 'https://live20.bozztv.com/giatvplayout7/giatv-210273/tracks-v1a1/mono.m3u8'
  },
  "3RSDRAMA": {
    name: '3RS DRAMA',
    url: 'https://live20.bozztv.com/giatvplayout7/giatv-210291/tracks-v1a1/mono.m3u8'
  },
  "KQTV": {
    name: 'KQTV',
    url: 'https://live20.bozztv.com/giatvplayout7/giatv-209998/tracks-v1a1/mono.m3u8'
  },
    "PINASTV": {
    name: 'PINAS TV',
    url: 'https://live20.bozztv.com/akamaissh101/ssh101/hmdo/chunks.m3u8'
        },
    "CartoonPH": {
    name: 'Catoon PH',
    url: 'https://live20.bozztv.com/giatv/giatv-cartoonchannelph/cartoonchannelph/playlist.m3u8'
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
    onenews: {
    name: 'one news',
    url: 'lb53.xxip9.top:25461/live/J4imiTEM45/9WJoH8jsnz/101774.m3u8?token=ThFcUhFaQQwRBgEDBFQAVAdRBVcCAgVQAFUHUV9SAwYAVw1RBFFVAlcQHkdBQURQV1g7WFQWCgNTU1QEDR8RR0ZWRmwLVkEMEQsAVAsCFBkUQQ1cVRYKAk9AE1pdEQkQBAMFClQAQRoRV0oRV0dYVFpqAFRGXVNXQVgNRlVfHxBaXWtXB18CWFcQCEcCFxoXX0YUEwpaRV4PTkFRUEdBU0FWFglAAFUOARAeR1FaQ1tCRx0TChZgekFOQVZBR1ZcRlpbXUAIQVsARwpHHhdfRmlHAUJERlVTDgcREQMRAxAZEVlSGm0AWV1cVwZGXFlbRRdeEwIWHBAODQ1aTVxBbUVaUBFYEFUPBAMFR08='
      },
  cinemo: {
    name: 'cinemo',
    url: 'https://d1bail49udbz1k.cloudfront.net/out/v1/78e282e04f0944f3ad0aa1db7a1be645/index_3.m3u8'
  },
  kidsflix: {
    name: 'KidsFlix',
    url: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50'
  },
  cartoonnetwork: {
    name: 'catoom network',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118123.m3u8'
  },
  Disneyjr: {
    name: 'Disney jr',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118127.m3u8'
  },
  Nickelodeon: {
    name: 'Nickelodeon',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118128.m3u8'
  },
  Disneychannel: {
    name: 'disney channel',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118124.m3u8'
  },
  DisneyXD: {
    name: 'Disney XD',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118126.m3u8'
  },
  tnt: {
    name: 'tnt us',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118124.m3u8'
  },
  AMC: {
    name: 'AMC',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/172556.m3u8'
  },
  espn1: {
    name: 'espn1',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/169421.m3u8'
   },
  espn2: {
    name: 'espn2',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/169422.m3u8'   
  },  
  Daznf1: {
    name: 'Dazn F1',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/53097.m3u8'
  },
  dazn1: {
    name: 'dazn1',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/256560.m3u8'
   },
  daz2: {
    name: 'dazn2',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/25277.m3u8'       
  },  
  Dazn3: {
    name: 'Dazn3',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/53097.m3u8'   
      },
  daznlaliga: {
    name: 'dazn laliga',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/259101.m3u8'
   },
  daz5: {
    name: 'dazn5',
    url: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/169422.m3u8'   
  },
  skyaction: {
    name: 'Sky Sports Action',
    url: 'http://lb51.xxip9.top:25461/live/J4imiTEM45/9WJoH8jsnz/53705.m3u8?token=ThFcUhFaQQwRC1FSV1dVBgFQVQVVDAICUAZUAQ4ABQUFC1cCUVQCUwIQHkdBQURQV1g7WFQWCgdQVVMGFRFGQVBBa1oGEFkUCgADXAUXGhdCXAlUEg4AHkESClcbCREBBgIFAUAeQVNLRlcXXFRaalJQElhTURIIDRcPXxURXFxqV1FeA1wHFAkQAkceF19GRhdeX0VYXB5BAApHS1JHVxcJFgFVC1YUHxBRCkdbQkdPF14TYHwSHkEHG0dcXUBbWl0WCUBfUEMLEB5HW0ZpR1NGEENVVV1XEUBZEQkRHxBYUkxsAV0NWFZRRgxdW0UXDBdWExwWXV0NCxdcS2xDW1ERDhFXB1EHChBP'
  },
  skyfootball: {
    name: 'Sky Sports Football',
    url: 'https://subrugopuciblchlvl6uqa666p23rig.happy-ending.site/klean/zuw3aYlboraPaStUP4o5ropHlbrospev.m3u8?auth=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHJlYW1JZCI6Inp1dzNhWWxib3JhUGFTdFVQNG81cm9wSGxicm9zcGV2IiwidHlwZSI6InBsYXlsaXN0X2FjY2VzcyIsImV4cCI6MTc1MzI4OTQzN30.S0xFQU5FTUJFRA'
  },
  skymainevent: {
    name: 'Sky Sports Main Event',
    url: 'http://31.220.3.103:2095/play/live.php?mac=00:1A:79:E7:32:0C&stream=175174&extension=m3u8&play_token=BKrIBeTdPJ'
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
    url: 'http://31.220.3.103:2095/play/live.php?mac=00:1A:79:E7:32:0C&stream=175170&extension=.m3u8'
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
      Celestialmovies: {
    name: 'Celestial Movies',
   url: 'http://originhd-1.dens.tv/h/h14/02.m3u8'
    }, 
    Rockaction: {
    name: 'Rockaction',
   url: 'http://originhd-1.dens.tv/h/h15/02.m3u8'
    }, 
    Rockentertaiment: {
    name: 'Rockentertaiment',
   url: 'http://originhd-1.dens.tv/h/h16/02.m3u8'
    }, 
    TVN: {
    name: 'TVN',
   url: 'http://originhd-1.dens.tv/h/h20/02.m3u8'
    }, 
    TVNMovies: {
    name: 'TVN MOVIES',
   url: 'http://originhd-1.dens.tv/h/h21/02.m3u8'
    }, 
    MCE: {
    name: 'MCE',
   url: 'http://originhd-1.dens.tv/h/h18/02.m3u8'
    }, 
    NHKWORLD: {
    name: 'NHKWORLD',
   url: 'http://originhd-1.dens.tv/h/h23/02.m3u8'
          }, 
    Aniplus: {
    name: 'Aniplus',
   url: 'http://originhd-1.dens.tv/h/h201/02.m3u8'
    }, 
    KBSKOREA: {
    name: 'KBS KOREA',
   url: 'http://originhd-1.dens.tv/h/h241/02.m3u8'
    }, 
    KBSWORLD: {
    name: 'KBSWORLD',
   url: 'http://originhd-1.dens.tv/h/h243/02.m3u8'
    }, 
    KIX: {
    name: 'KIX',
   url: 'http://originhd-1.dens.tv/h/h220/02.m3u8'
          }, 
    tv5mondestyle: {
    name: 'tv5 monde style',
   url: 'http://originhd-1.dens.tv/h/h216/02.m3u8'
          }, 
    Kplus: {
    name: 'kplus',
   url: 'http://originhd-1.dens.tv/h/h219/02.m3u8'
    }, 
    UFC: {
    name: 'UFC',
   url: 'http://fl1.moveonjoy.com/UFC/tracks-v1a1/mono.m3u8'
    }, 
    HBO: {
    name: 'HBO',
   url: 'http://ssliste.simpsongroups.com:80/live/zikojelica/E845P2V9ae/60672.m3u8'
      },
  True_FM_TV: {
    name: 'True FM TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/truefmtv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  TV_Maria: {
    name: 'TV Maria',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tvmaria/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  TV5: {
    name: 'TV5',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tv5/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  tvN_Movies_Pinoy: {
    name: 'tvN Movies Pinoy',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tvnmoviespinoy/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  UAAP_Varsity_Channel: {
    name: 'UAAP Varsity Channel',
    url: 'https://ott.athenatv.net/stream/phcathenatv/uaapvarsitychannel/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  UNTV: {
    name: 'UNTV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/untv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  VIVA_Cinema: {
    name: 'VIVA Cinema',
    url: 'https://ott.athenatv.net/stream/phcathenatv/vivacinema/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
    }, 
    SMNI: {
    name: 'SMNI',
    url: 'https://ott.athenatv.net/stream/phcathenatv/smni/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  SOLARFLIX: {
    name: 'SOLARFLIX',
    url: 'https://ott.athenatv.net/stream/phcathenatv/solarflix/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  TMC: {
    name: 'TMC',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tmc/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
    },
  A2Z: {
    name: 'A2Z',
    url: 'https://ott.athenatv.net/stream/phcathenatv/a2z/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  ALIW_TV: {
    name: 'ALIW TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/aliwtv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  ALL_TV: {
    name: 'ALL TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/alltv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  ANC_PH: {
    name: 'ANC PH',
    url: 'https://ott.athenatv.net/stream/phcathenatv/ancph/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Billonaryo_News_Channel: {
    name: 'Billonaryo News Channel',
    url: 'https://ott.athenatv.net/stream/phcathenatv/billonaryonewschannel/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Blast_Sports: {
    name: 'Blast Sports',
    url: 'https://ott.athenatv.net/stream/phcathenatv/blastsports/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Boomerang: {
    name: 'Boomerang',
    url: 'https://ott.athenatv.net/stream/skyuk/boomerang/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Buko: {
    name: 'Buko',
    url: 'https://ott.athenatv.net/stream/phcathenatv/buko/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Cartoon_Network: {
    name: 'Cartoon Network',
    url: 'https://ott.athenatv.net/stream/skyuk/cartoonnetwork/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Cartoonito: {
    name: 'Cartoonito',
    url: 'https://ott.athenatv.net/stream/skyuk/cartoonito/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Celestial_Movies_Pinoy: {
    name: 'Celestial Movies Pinoy',
    url: 'https://ott.athenatv.net/stream/phcathenatv/celestialmoviespinoy/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Cinema_One: {
    name: 'Cinema One',
    url: 'https://ott.athenatv.net/stream/phcathenatv/cinemaone/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Cinemo: {
    name: 'Cinemo',
    url: 'https://ott.athenatv.net/stream/phcathenatv/cinemo/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  CLTV_36: {
    name: 'CLTV 36',
    url: 'https://ott.athenatv.net/stream/phcathenatv/cltv36/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  DZMM_Teleradyo_HD: {
    name: 'DZMM Teleradyo HD',
    url: 'https://ott.athenatv.net/stream/phcathenatv/dzmmteleradyo/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  DZMM_Teleradyo_SD: {
    name: 'DZMM Teleradyo SD',
    url: 'https://ott.athenatv.net/stream/phcathenatv/dzmmteleradyosd/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Premier_Sports: {
    name: 'Premier Sports',
    url: 'https://ott.athenatv.net/stream/phcathenatv/premiersports/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Premier_Sports_2: {
    name: 'Premier Sports 2',
    url: 'https://ott.athenatv.net/stream/phcathenatv/premiersports2/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Premier_Football: {
    name: 'Premier Football',
    url: 'https://ott.athenatv.net/stream/phcathenatv/premierfootball/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Tap_Action_Flix: {
    name: 'Tap Action Flix',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tapactionflix/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Tap_Edge: {
    name: 'Tap Edge',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tapedge/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Tap_Movies: {
    name: 'Tap Movies',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tapmovies/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Tap_Sports: {
    name: 'Tap Sports',
    url: 'https://ott.athenatv.net/stream/phcathenatv/tapsports/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Tap_TV: {
    name: 'Tap TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/taptv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  DZRH_TV: {
    name: 'DZRH TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/dzrhtv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  GMA: {
    name: 'GMA',
    url: 'https://ott.athenatv.net/stream/phcathenatv/gma/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  GTV: {
    name: 'GTV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/gtv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  IBC13: {
    name: 'IBC13',
    url: 'https://ott.athenatv.net/stream/phcathenatv/ibc13/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  INC_TV: {
    name: 'INC TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/inctv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Jeepney_TV: {
    name: 'Jeepney TV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/jeepneytv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Kapamilya_Channel: {
    name: 'Kapamilya Channel',
    url: 'https://ott.athenatv.net/stream/phcathenatv/kapamilyachannel/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Knowledge_Channel: {
    name: 'Knowledge Channel',
    url: 'https://ott.athenatv.net/stream/phcathenatv/knowledgechannel/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Metro_Channel: {
    name: 'Metro Channel',
    url: 'https://ott.athenatv.net/stream/phcathenatv/metrochannel/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  MPTV: {
    name: 'MPTV',
    url: 'https://ott.athenatv.net/stream/phcathenatv/mptv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  MYX_PH: {
    name: 'MYX PH',
    url: 'https://ott.athenatv.net/stream/phcathenatv/myxph/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  NBA_TV_Philippines: {
    name: 'NBA TV Philippines',
    url: 'https://ott.athenatv.net/stream/phcathenatv/nbatvphilippines/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  NET25: {
    name: 'NET25',
    url: 'https://ott.athenatv.net/stream/phcathenatv/net25/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Nick_Jr: {
    name: 'Nick Jr',
    url: 'https://ott.athenatv.net/stream/skyuk/nickjr/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Nickelodeon: {
    name: 'Nickelodeon',
    url: 'https://ott.athenatv.net/stream/skyuk/nickelodeon/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  Nicktoons: {
    name: 'Nicktoons',
    url: 'https://ott.athenatv.net/stream/skyuk/nicktoons/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  One_News: {
    name: 'One News',
    url: 'https://ott.athenatv.net/stream/phcathenatv/onenews/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
  One_PH: {
    name: 'One PH',
    url: 'https://ott.athenatv.net/stream/phcathenatv/oneph/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
  },
One_Sports: {
  name: 'One Sports',
  url: 'https://ott.athenatv.net/stream/phcathenatv/onesports/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
One_Sports_Plus: {
  name: 'One Sports +',
  url: 'https://ott.athenatv.net/stream/phcathenatv/onesports-1/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
PBA_Rush: {
  name: 'PBA Rush',
  url: 'https://ott.athenatv.net/stream/phcathenatv/pbarush/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
PBO: {
  name: 'PBO',
  url: 'https://ott.athenatv.net/stream/phcathenatv/pbo/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
Premier_Sports_1: {
  name: 'Premier Sports 1',
  url: 'https://ott.athenatv.net/stream/skyie/premiersports1/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
Premier_Sports_2: {
  name: 'Premier Sports 2',
  url: 'https://ott.athenatv.net/stream/skyie/premiersports2/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
PPV_Channel_1: {
  name: 'PPV Channel 1',
  url: 'https://ott.athenatv.net/stream/phcathenatv/ppvchannel1/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
PPV_Channel_2: {
  name: 'PPV Channel 2',
  url: 'https://ott.athenatv.net/stream/phcathenatv/ppvchannel2/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
PTV: {
  name: 'PTV',
  url: 'https://ott.athenatv.net/stream/phcathenatv/ptv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
RPTV: {
  name: 'RPTV',
  url: 'https://ott.athenatv.net/stream/phcathenatv/rptv/stream_0.m3u8?u=phc-free&p=70ebfe055fb9df4f9b91b21907a517a27f6c97076aedda2c268712ec6766bf52'
},
    ABC_WOLO: {
    name: 'ABC (WOLO)',
    url: 'http://fl1.moveonjoy.com/ABC_EAST/mono.m3u8'
  },
  ACC_Network: {
    name: 'ACC Network',
    url: 'http://fl3.moveonjoy.com/ACC_NETWORK/mono.m3u8'
  },
  AMC: {
    name: 'AMC',
    url: 'http://fl5.moveonjoy.com/AMC_NETWORK/mono.m3u8'
  },
  American_Heroes_Channel: {
    name: 'American Heroes Channel',
    url: 'http://fl3.moveonjoy.com/American_Heroes_Channel/mono.m3u8'
  },
  Animal_Planet: {
    name: 'Animal Planet',
    url: 'http://fl3.moveonjoy.com/Animal_Planet/mono.m3u8'
  },
  BBC_America: {
    name: 'BBC America',
    url: 'http://fl3.moveonjoy.com/BBC_AMERICA/mono.m3u8'
  },
  BBC_World_News: {
    name: 'BBC World News',
    url: 'http://fl3.moveonjoy.com/BBC_WORLD_NEWS/mono.m3u8'
  },
  beIN_Sports: {
    name: 'beIN Sports',
    url: 'http://fl3.moveonjoy.com/BEIN_SPORTS/mono.m3u8'
  },
  BET_Gospel: {
    name: 'BET Gospel',
    url: 'http://fl3.moveonjoy.com/BET_GOSPEL/mono.m3u8'
  },
  BET_Her_East: {
    name: 'BET Her East',
    url: 'http://fl3.moveonjoy.com/BET_HER/mono.m3u8'
  },
  BET_Jams: {
    name: 'BET Jams',
    url: 'http://fl3.moveonjoy.com/BET_Jams/mono.m3u8'
  },
  BET_Soul: {
    name: 'BET Soul',
    url: 'http://fl3.moveonjoy.com/BET_SOUL/mono.m3u8'
  },
  Big_Ten_Network: {
    name: 'Big Ten Network',
    url: 'http://fl3.moveonjoy.com/BIG_TEN_NETWORK/mono.m3u8'
  },
  Bloomberg: {
    name: 'Bloomberg',
    url: 'http://fl3.moveonjoy.com/BLOOMBERG/mono.m3u8'
  },
  Boomerang: {
    name: 'Boomerang',
    url: 'http://fl3.moveonjoy.com/BOOMERANG/mono.m3u8'
  },
  Bounce: {
    name: 'Bounce',
    url: 'http://fl3.moveonjoy.com/BOUNCE_TV/mono.m3u8'
  },
  Bravo: {
    name: 'Bravo',
    url: 'http://fl3.moveonjoy.com/BRAVO/mono.m3u8'
  },
  Cartoon_Network: {
    name: 'Cartoon Network',
    url: 'http://fl3.moveonjoy.com/CARTOON_NETWORK/mono.m3u8'
  },
  CBS_WBZ: {
    name: 'CBS (WBZ)',
    url: 'http://fl3.moveonjoy.com/CBSEAST/mono.m3u8'
  },
  CBS_Sports_Network: {
    name: 'CBS Sports Network',
    url: 'http://fl4.moveonjoy.com/CBS_SPORTS_NETWORK/mono.m3u8'
  },
  Cinemax: {
    name: 'Cinemax',
    url: 'http://fl4.moveonjoy.com/CINEMAX_EAST/mono.m3u8'
  },
  CMT_East: {
    name: 'CMT East',
    url: 'http://fl3.moveonjoy.com/CMT/mono.m3u8'
  },
  CNBC: {
    name: 'CNBC',
    url: 'http://fl3.moveonjoy.com/CNBC/mono.m3u8'
  },
  CNN: {
    name: 'CNN',
    url: 'http://fl3.moveonjoy.com/CNN/mono.m3u8'
  },
  Comedy_Central: {
    name: 'Comedy Central',
    url: 'http://fl3.moveonjoy.com/Comedy_Central/mono.m3u8'
  },
  Cooking_Channel: {
    name: "Cooking Channel",
    url: "http://fl3.moveonjoy.com/COOKING_CHANNEL/mono.m3u8"
  },
  CSPAN: {
    name: "C-SPAN",
    url: "http://fl3.moveonjoy.com/C-SPAN/mono.m3u8"
  },
  Discovery_Channel: {
    name: "Discovery Channel",
    url: "http://fl3.moveonjoy.com/Discovery_Channel/mono.m3u8"
  },
  Discovery_Family: {
    name: "Discovery Family",
    url: "http://fl3.moveonjoy.com/DISCOVERY_FAMILY_CHANNEL/mono.m3u8"
  },
  Discovery_Life: {
    name: "Discovery Life",
    url: "http://fl3.moveonjoy.com/DISCOVERY_LIFE/mono.m3u8"
  },
  Disney_Channel: {
    name: "Disney Channel",
    url: "http://fl3.moveonjoy.com/DISNEY_CHANNEL/mono.m3u8"
  },
  DisneyJr: {
    name: "DisneyJr",
    url: "http://fl3.moveonjoy.com/DISNEY_JR/mono.m3u8"
  },
  DisneyXD: {
    name: "DisneyXD",
    url: "http://fl3.moveonjoy.com/DISNEY_XD/mono.m3u8"
  },
  MGM_Plus: {
    name: "MGM+",
    url: "http://fl3.moveonjoy.com/EPIX/mono.m3u8"
  },
  MGM_Plus_Hits: {
    name: "MGM+ Hits",
    url: "http://fl3.moveonjoy.com/EPIX_2/mono.m3u8"
  },
  MGM_Plus_DriveIn: {
    name: "MGM+ Drive-In",
    url: "http://fl3.moveonjoy.com/EPIX_DRIVE_IN/mono.m3u8"
  },
  MGM_Plus_Marquee: {
    name: "MGM+ Marquee",
    url: "http://fl3.moveonjoy.com/EPIX_HITS/mono.m3u8"
  },
  ESPN: {
    name: "ESPN",
    url: "http://rhsbjv7k.tvclub.xyz/iptv/APM3584VN3P6"
  },
  Hallmark_Channel_East: {
    name: "Hallmark Channel East",
    url: "http://fl3.moveonjoy.com/HALLMARK_CHANNEL/mono.m3u8"
  },
  Hallmark_Drama: {
    name: "Hallmark Drama",
    url: "http://fl3.moveonjoy.com/HALLMARK_DRAMA/mono.m3u8"
  },
  HBO_East: {
    name: "HBO East",
    url: "http://143.244.60.30/HBO/mono.m3u8"
  },
  HBO2_East: {
    name: "HBO2 East",
    url: "http://143.244.60.30/HBO_2/mono.m3u8"
  },
  HBO_Comedy_East: {
    name: "HBO Comedy East",
    url: "http://143.244.60.30/HBO_COMEDY/mono.m3u8"
  },
  HBO_Family_East: {
    name: "HBO Family East",
    url: "http://143.244.60.30/HBO_FAMILY/mono.m3u8"
  },
  HBO_Zone_East: {
    name: "HBO Zone East",
    url: "http://143.244.60.30/HBO_ZONE/mono.m3u8"
  },
  HGTV_East: {
    name: "HGTV East",
    url: "http://143.244.60.30/HGTV/mono.m3u8"
  },
  HLN: {
    name: "HLN",
    url: "http://143.244.60.30/HLN/mono.m3u8"
  },
  ID_East: {
    name: "ID (Investigation Discovery) East",
    url: "http://143.244.60.30/INVESTIGATION_DISCOVERY/mono.m3u8"
  },
  ION: {
    name: "ION",
    url: "http://143.244.60.30/ION_TV/mono.m3u8"
  },
  Laff_TV: {
    name: "Laff TV",
    url: "http://72.46.118.193/Laff/mono.m3u8"
  },
  Lifetime_East: {
    name: "Lifetime East",
    url: "http://143.244.60.30/LIFETIME/mono.m3u8"
  },
  Lifetime_Movies: {
    name: "Lifetime Movies Network",
    url: "http://143.244.60.30/LIFETIME_MOVIE_NETWORK/mono.m3u8"
  },
  Logo_East: {
    name: "Logo East",
    url: "http://143.244.60.30/Logo/mono.m3u8"
  },
  MeTV: {
    name: "MeTV",
    url: "http://143.244.60.30/ME_TV/mono.m3u8"
  },
  MLB_Network: {
    name: "MLB Network",
    url: "http://143.244.60.30/MLB_NETWORK/mono.m3u8"
  },
  MotorTrend: {
    name: "MotorTrend",
    url: "http://143.244.60.30/MOTOR_TREND/mono.m3u8"
  },
  MSNBC: {
    name: "MSNBC",
    url: "http://143.244.60.30/MSNBC/mono.m3u8"
  },
  MTV_East: {
    name: "MTV East",
    url: "http://143.244.60.30/MTV/mono.m3u8"
  },
  MTV2_East: {
    name: "MTV2 East",
    url: "http://143.244.60.30/MTV_2/mono.m3u8"
  },
  MTV_Classic: {
    name: "MTV Classic",
    url: "http://143.244.60.30/MTV_CLASSIC/mono.m3u8"
  },
  MTV_Live: {
    name: "MTV Live",
    url: "http://143.244.60.30/MTV_LIVE/mono.m3u8"
  },
  mtvU: {
    name: "mtvU",
    url: "http://143.244.60.30/MTV_U/mono.m3u8"
  },
  NatGeo_East: {
    name: "National Geographic East",
    url: "http://143.244.60.30/National_Geographic/mono.m3u8"
  },
  NatGeo_Wild: {
    name: "National Geographic Wild",
    url: "http://143.244.60.30/Nat_Geo_Wild/mono.m3u8"
  },
  NBA_TV: {
    name: "NBA TV",
    url: "http://143.244.60.30/NBA_TV/mono.m3u8"
  },
  NBC_East: {
    name: "NBC East (Chicago)",
    url: "http://fl1.moveonjoy.com/NBC_EAST/mono.m3u8"
  },
  NewsNation: {
    name: "NewsNation",
    url: "http://fl3.moveonjoy.com/NEWS_NATION/mono.m3u8"
  },
  NFL_Network: {
    name: "NFL Network",
    url: "http://fl3.moveonjoy.com/NFL_NETWORK/mono.m3u8"
  },
  NHL_Network: {
    name: "NHL Network",
    url: "http://fl3.moveonjoy.com/NHL_NETWORK/mono.m3u8"
  },
  Nickelodeon_East: {
    name: "Nickelodeon East",
    url: "http://fl1.moveonjoy.com/NICKELODEON/mono.m3u8"
  },
  NickJr_East: {
    name: "NickJr East",
    url: "http://fl3.moveonjoy.com/NICK_JR/mono.m3u8"
  },
  NickMusic: {
    name: "NickMusic USA",
    url: "http://fl3.moveonjoy.com/NICK_MUSIC/mono.m3u8"
  },
  NickToons_East: {
    name: "NickToons East",
    url: "http://fl1.moveonjoy.com/NICKTOONS/mono.m3u8"
  },
  OWN_East: {
    name: "Oprah Winfrey Network (OWN) East",
    url: "http://fl3.moveonjoy.com/OWN/mono.m3u8"
  },
  Outdoor_Channel: {
    name: "Outdoor Channel",
    url: "http://fl3.moveonjoy.com/OUTDOOR_CHANNEL/mono.m3u8"
  },
  Oxygen_East: {
    name: "Oxygen East",
    url: "http://fl3.moveonjoy.com/OXYGEN/mono.m3u8"
  },
  Paramount_Network_East: {
    name: "Paramount Network East",
    url: "http://fl3.moveonjoy.com/PARAMOUNT_NETWORK/mono.m3u8"
  },
  PopTV_East: {
    name: "PopTV East",
    url: "http://fl3.moveonjoy.com/Pop_TV/mono.m3u8"
  },
  ReelzChannel: {
    name: "ReelzChannel",
    url: "http://fl3.moveonjoy.com/REELZ/mono.m3u8"
  },
  Revolt: {
    name: "Revolt",
    url: "http://fl3.moveonjoy.com/REVOLT/mono.m3u8"
  },
  SEC_Network: {
    name: "SEC Network",
    url: "http://fl3.moveonjoy.com/SEC_NETWORK/mono.m3u8"
  },
  Showtime_East: {
    name: "Showtime East",
    url: "http://fl3.moveonjoy.com/SHOWTIME/mono.m3u8"
  },
  Showtime_2_East: {
    name: "Showtime 2 East",
    url: "http://fl3.moveonjoy.com/SHOWTIME_2/mono.m3u8"
  },
  Showtime_Extreme_East: {
    name: "Showtime Extreme East",
    url: "http://fl3.moveonjoy.com/SHOWTIME_EXTREME/mono.m3u8"
  },
  Showtime_Next_East: {
    name: "Showtime Next East",
    url: "http://fl3.moveonjoy.com/SHOWTIME_NEXT/mono.m3u8"
  },
  Showtime_Women_East: {
    name: "Showtime Women East",
    url: "http://fl3.moveonjoy.com/SHOWTIME_WOMEN/mono.m3u8"
  },
  Stadium: {
    name: "Stadium",
    url: "http://fl3.moveonjoy.com/STADIUM/mono.m3u8"
  },
  Starz_East: {
    name: "Starz East",
    url: "http://fl3.moveonjoy.com/STARZ/mono.m3u8"
  },
  Starz_Comedy_East: {
    name: "Starz Comedy East",
    url: "http://fl3.moveonjoy.com/STARZ_COMEDY/mono.m3u8"
  },
  Starz_Edge_East: {
    name: "Starz Edge East",
    url: "http://fl3.moveonjoy.com/STARZ_EDGE/mono.m3u8"
  },
  Starz_Encore_East: {
    name: "Starz Encore East",
    url: "http://fl3.moveonjoy.com/STARZ_ENCORE/mono.m3u8"
  },
  Starz_Encore_Action: {
    name: "Starz Encore Action",
    url: "http://fl3.moveonjoy.com/STARZ_ENCORE_ACTION/mono.m3u8"
  },
  Starz_Encore_Westerns: {
    name: "Starz Encore Westerns",
    url: "http://fl3.moveonjoy.com/STARZ_ENCORE_WESTERNS/mono.m3u8"
  },
  SundanceTV: {
    name: "SundanceTV",
    url: "http://fl3.moveonjoy.com/SUNDANCE/mono.m3u8"
  },
  SYFY_East: {
    name: "SYFY East",
    url: "http://fl3.moveonjoy.com/SYFY/mono.m3u8"
  },
  TBS_East: {
    name: "TBS East",
    url: "http://fl1.moveonjoy.com/TBS/mono.m3u8"
  },
  TCM_East: {
    name: "TCM (Turner Classic Movies) East",
    url: "http://fl1.moveonjoy.com/TCM/mono.m3u8"
  },
  Tennis_Channel: {
    name: "Tennis Channel",
    url: "http://fl3.moveonjoy.com/TENNIS_CHANNEL/mono.m3u8"
  },
  TLC_East: {
    name: "TLC (The Learning Channel) East",
    url: "http://fl3.moveonjoy.com/TLC/mono.m3u8"
  },
  TNT_East: {
    name: "TNT East",
    url: "http://143.244.60.30/TNT/mono.m3u8"
  },
  truTV_East: {
    name: "truTV East",
    url: "http://fl3.moveonjoy.com/TRU_TV/mono.m3u8"
  },
  TVLand: {
    name: "TVLand",
    url: "http://fl3.moveonjoy.com/TV_Land/mono.m3u8"
  },
  TVOne: {
    name: "TVOne",
    url: "http://fl3.moveonjoy.com/TV_ONE/mono.m3u8"
  },
  VH1_East: {
    name: "VH1 East",
    url: "http://fl3.moveonjoy.com/VH1/mono.m3u8"
  },
  Vice: {
    name: "Vice",
    url: "http://fl3.moveonjoy.com/VICELAND/mono.m3u8"
  },
  Weather_Channel: {
    name: "Weather Channel",
    url: "http://fl3.moveonjoy.com/THE_WEATHER_CHANNEL/mono.m3u8"
  },
  WeTV: {
    name: "WeTV",
    url: "http://fl1.moveonjoy.com/WE_TV/mono.m3u8"
  },
  YES_Network: {
    name: "YES Network",
    url: "http://fl3.moveonjoy.com/YES_NETWORK/mono.m3u8"
  },
  Game_Show_Network: {
    name: "GAME SHOW NETWORK",
    url: "https://a-cdn.klowdtv.com/live2/gsn_720p/playlist.m3u8"
  },
  WWE_Network: {
    name: "WWE NETWORK",
    url: "http://fl3.moveonjoy.com/WWE/mono.m3u8"
  },
  USA_Network: {
    name: "USA Network",
    url: "http://fl3.moveonjoy.com/USA_Network/mono.m3u8"
  },
  NASA_TV_Public: {
    name: "NASA TV Public",
    url: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master_2000.m3u8"
  },
  NASA_UHD: {
    name: "NASA UHD",
    url: "https://endpnt.com/hls/nasa4k/nasa-uhd-p30-stream.m3u8"
  },
  NASA_TV_Media: {
    name: "NASA TV Media",
    url: "https://ntv2.akamaized.net/hls/live/2013923/NASA-NTV2-HLS/master.m3u8"
  },
  Magnolia: {
    name: "Magnolia",
    url: "http://fl3.moveonjoy.com/DIY/mono.m3u8"
  },
  AXSTV: {
    name: "AXSTV",
    url: "https://dikcfc9915kp8.cloudfront.net/hls/1080p/playlist.m3u8"
  },
  Al_Jazeera: {
    name: "Al Jazeera",
    url: "https://d1cy85syyhvqz5.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/aljazeeraLive/AJE/mono.m3u8"
  },
  TSN_1: {
    name: "TSN 1",
    url: "http://fl5.moveonjoy.com/TSN_1/mono.m3u8"
  },
  TSN_2: {
    name: "TSN 2",
    url: "http://fl5.moveonjoy.com/TSN_2/mono.m3u8"
  },
  TSN_3: {
    name: "TSN 3",
    url: "http://fl5.moveonjoy.com/TSN_3/mono.m3u8"
  },
  TSN_4: {
    name: "TSN 4",
    url: "http://fl5.moveonjoy.com/TSN_4/mono.m3u8"
  },
  TSN_5: {
    name: "TSN 5",
    url: "http://fl5.moveonjoy.com/TSN_5/mono.m3u8"
  }
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
    <h2>CHANNEL LIST</h2>
    <p>Click a channel:</p>
    <ul>${links}</ul>
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
