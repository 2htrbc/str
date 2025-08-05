const express = require('express');
const request = require('request');
const cors = require('cors');
const { URL } = require('url');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// ✅ Stream channel map (key: name, value: m3u8 URL)
const streams = {
  ATBS: 'https://live20.bozztv.com/giatv/giatv-ATBSGLOBAL/ATBSGLOBAL/chunks.m3u8',
  STBS: 'https://live20.bozztv.com/akamaissh101/ssh101/stbsph88/chunks.m3u8',
  Highlightstv: 'https://live20.bozztv.com/giatvplayout7/giatv-208173/tracks-v1a1/mono.m3u8',
  Dreamstvph: 'https://live20.bozztv.com/giatvplayout7/giatv-209574/tracks-v1a1/mono.m3u8',
  startvph: 'https://live20.bozztv.com/giatvplayout7/giatv-208168/tracks-v1a1/mono.m3u8',
  Dreamstartv: 'https://live20.bozztv.com/giatvplayout7/giatv-10410/tracks-v1a1/mono.m3u8',
  STBSGLOBAL: 'https://live20.bozztv.com/giatvplayout7/giatv-208591/tracks-v1a1/mono.m3u8',
  "3RSTV": 'https://live20.bozztv.com/giatvplayout7/giatv-210267/tracks-v1a1/mono.m3u8',
  "3RSMOVIE": 'https://live20.bozztv.com/giatvplayout7/giatv-210273/tracks-v1a1/mono.m3u8',
  "3RSDRAMA": 'https://live20.bozztv.com/giatvplayout7/giatv-210291/tracks-v1a1/mono.m3u8',
  KQTV: 'https://live20.bozztv.com/giatvplayout7/giatv-209998/tracks-v1a1/mono.m3u8',
  PINASTV: 'https://live20.bozztv.com/akamaissh101/ssh101/hmdo/chunks.m3u8',
  BIHMTV: 'https://live20.bozztv.com/giatv/giatv-bihmtv/bihmtv/chunks.m3u8',
  getpublica: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=46',
movies_thriller: 'https://shls-live-enc.edgenextcdn.net/out/v1/f6d718e841f8442f8374de47f18c93a7/index.m3u8',
great_mystery: 'https://linear-861.frequency.stream/dist/lg-uk/861/hls/master/playlist.m3u8',
hope_channel_1: 'https://jstre.am/live/jsl:0sUSK6VA7GT.m3u8',
hope_channel_2: 'https://cdn-us-dca.b-cdn.net/hcorg_33O0ldvawCD/s/jsl_0sUSK6VA7GT/master.m3u8',
hope_tv_1: 'https://jstre.am/live/jsl:7A1swL7Fhlh.m3u8',
hope_tv_2: 'https://cdn-kr-icn.becdn.net/hcorg_ROeXKL3HV6a/s/jsl_7A1swL7Fhlh/master.m3u8',
movies_action: 'https://shls-live-enc.edgenextcdn.net/out/v1/46079e838e65490c8299f902a7731168/index.m3u8',
  CartoonPH: 'https://live20.bozztv.com/giatv/giatv-cartoonchannelph/cartoonchannelph/playlist.m3u8',
  mrbean: 'https://amg00627-amg00627c30-rakuten-es-3990.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanescc-rakutenes/playlist.m3u8',
  kartoon: 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-kartoonchannel-samsungnz/playlist.m3u8',
  a2z: 'https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_5.m3u8',
  tvnmoviespinoy: 'https://dice-live-ap.akamaized.net/hls/live/2000230/274551-300568/exchange274551xuwnr_274551_1400/chunklist.m3u8?hdntl=exp=1754237147~acl=%2F*~id=305edd79-9a72-49bc-8202-961b79e7dce4~data=hdntl,dWlkPUNUZmR0S3xlZTU2N2U3NS02NTg1LTQwOGEtYmIzOS1hZDhlYjIzMDVmNjMmaXA9MTI2LjIwOS41My4xODYmZXhwPTE3NTQyMzcxNzMmZWlkPTI3NDU1MSZjaWQ9ZGNlLnRhcGdvJm9pZD0zMjUmdHlwZT1MSVZF~hmac=b7e70cb35a05714068f9092b5e333c72aceb0b48c86fac94b64f086d1a686a05',
  cinemo: 'https://d1bail49udbz1k.cloudfront.net/out/v1/78e282e04f0944f3ad0aa1db7a1be645/index_3.m3u8',
  kidsflix: 'https://stream-us-east-1.getpublica.com/playlist.m3u8?network_id=50',
  cartoonnetwork: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118123.m3u8',
  Disneyjr: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118127.m3u8',
  Nickelodeon: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118128.m3u8',
  Disneychannel: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118124.m3u8',
  DisneyXD: 'https://nxt.plus:8443/live/restreamstalker/mzfJKHLK86fy/118126.m3u8',
  JungoTV: 'https://jungotvstream.chanall.tv/jungotv/jungopinoytv/playlist_720p.m3u8',
  Hallypop: 'https://jungotvstream.chanall.tv/jungotv/hallypop/playlist_720p.m3u8',
  ScreamFlix: 'https://jungotvstream.chanall.tv/jungotv/screamflix/playlist_720p.m3u8',
  fight: 'http://originhd-1.dens.tv/h/h05/02.m3u8',
  Celestialmovies: 'http://originhd-1.dens.tv/h/h14/02.m3u8',
  Rockaction: 'http://originhd-1.dens.tv/h/h15/02.m3u8',
  Rockentertaiment: 'http://originhd-1.dens.tv/h/h16/02.m3u8',
  TVN: 'http://originhd-1.dens.tv/h/h20/02.m3u8',
  TVNMovies: 'http://originhd-1.dens.tv/h/h21/02.m3u8',
  MCE: 'http://originhd-1.dens.tv/h/h18/02.m3u8',
  NHKWORLD: 'http://originhd-1.dens.tv/h/h23/02.m3u8',
  Aniplus: 'http://originhd-1.dens.tv/h/h201/02.m3u8',
  KBSKOREA: 'http://originhd-1.dens.tv/h/h241/02.m3u8',
  KBSWORLD: 'http://originhd-1.dens.tv/h/h243/02.m3u8',
  KIX: 'http://originhd-1.dens.tv/h/h220/02.m3u8',
  tv5mondestyle: 'http://originhd-1.dens.tv/h/h216/02.m3u8',
  Kplus: 'http://originhd-1.dens.tv/h/h219/02.m3u8',
  mycinemaaisa: 'http://originhd-1.dens.tv/h/h193/index.m3u8',
  myfamilychannel: 'http://originhd-1.dens.tv/h/h194/index.m3u8',
  UFC: 'http://fl1.moveonjoy.com/UFC/tracks-v1a1/mono.m3u8',
  ABC_WOLO: 'http://fl1.moveonjoy.com/ABC_EAST/mono.m3u8',
  ACC_Network: 'http://fl3.moveonjoy.com/ACC_NETWORK/mono.m3u8',
  AMC: 'http://fl5.moveonjoy.com/AMC_NETWORK/mono.m3u8',
  American_Heroes_Channel: 'http://fl3.moveonjoy.com/American_Heroes_Channel/mono.m3u8',
  Animal_Planet: 'http://fl3.moveonjoy.com/Animal_Planet/mono.m3u8',
  BBC_America: 'http://fl3.moveonjoy.com/BBC_AMERICA/mono.m3u8',
  BBC_World_News: 'http://fl3.moveonjoy.com/BBC_WORLD_NEWS/mono.m3u8',
  beIN_Sports: 'http://fl3.moveonjoy.com/BEIN_SPORTS/mono.m3u8',
  BET_Gospel: 'http://fl3.moveonjoy.com/BET_GOSPEL/mono.m3u8',
  BET_Her_East: 'http://fl3.moveonjoy.com/BET_HER/mono.m3u8',
  BET_Jams: 'http://fl3.moveonjoy.com/BET_Jams/mono.m3u8',
  BET_Soul: 'http://fl3.moveonjoy.com/BET_SOUL/mono.m3u8',
  Big_Ten_Network: 'http://fl3.moveonjoy.com/BIG_TEN_NETWORK/mono.m3u8',
  Bloomberg: 'http://fl3.moveonjoy.com/BLOOMBERG/mono.m3u8',
  Boomerang: 'http://fl3.moveonjoy.com/BOOMERANG/mono.m3u8',
  Bounce: 'http://fl3.moveonjoy.com/BOUNCE_TV/mono.m3u8',
  Bravo: 'http://fl3.moveonjoy.com/BRAVO/mono.m3u8',
  Cartoon_Network: 'http://fl3.moveonjoy.com/CARTOON_NETWORK/mono.m3u8',
  CBS_WBZ: 'http://fl3.moveonjoy.com/CBSEAST/mono.m3u8',
  CBS_Sports_Network: 'http://fl4.moveonjoy.com/CBS_SPORTS_NETWORK/mono.m3u8',
  Cinemax: 'http://fl4.moveonjoy.com/CINEMAX_EAST/mono.m3u8',
  CMT_East: 'http://fl3.moveonjoy.com/CMT/mono.m3u8',
  CNBC: 'http://fl3.moveonjoy.com/CNBC/mono.m3u8',
  CNN: 'http://fl3.moveonjoy.com/CNN/mono.m3u8',
  Comedy_Central: 'http://fl3.moveonjoy.com/Comedy_Central/mono.m3u8',
  Cooking_Channel: 'http://fl3.moveonjoy.com/COOKING_CHANNEL/mono.m3u8',
  CSPAN: 'http://fl3.moveonjoy.com/C-SPAN/mono.m3u8',
  Discovery_Channel: 'http://fl3.moveonjoy.com/Discovery_Channel/mono.m3u8',
  Discovery_Family: 'http://fl3.moveonjoy.com/DISCOVERY_FAMILY_CHANNEL/mono.m3u8',
  Discovery_Life: 'http://fl3.moveonjoy.com/DISCOVERY_LIFE/mono.m3u8',
  Disney_Channel: 'http://fl3.moveonjoy.com/DISNEY_CHANNEL/mono.m3u8',
  DisneyJr: 'http://fl3.moveonjoy.com/DISNEY_JR/mono.m3u8',
  DisneyXD: 'http://fl3.moveonjoy.com/DISNEY_XD/mono.m3u8',
  MGM_Plus: 'http://fl3.moveonjoy.com/EPIX/mono.m3u8',
  MGM_Plus_Hits: 'http://fl3.moveonjoy.com/EPIX_2/mono.m3u8',
  MGM_Plus_DriveIn: 'http://fl3.moveonjoy.com/EPIX_DRIVE_IN/mono.m3u8',
  MGM_Plus_Marquee: 'http://fl3.moveonjoy.com/EPIX_HITS/mono.m3u8',
  ESPN: 'http://rhsbjv7k.tvclub.xyz/iptv/APM3584VN3P6',
  Hallmark_Channel_East: "http://fl3.moveonjoy.com/HALLMARK_CHANNEL/mono.m3u8",
  Hallmark_Drama: "http://fl3.moveonjoy.com/HALLMARK_DRAMA/mono.m3u8",
  HBO_East: "http://143.244.60.30/HBO/mono.m3u8",
  HBO2_East: "http://143.244.60.30/HBO_2/mono.m3u8",
  HBO_Comedy_East: "http://143.244.60.30/HBO_COMEDY/mono.m3u8",
  HBO_Family_East: "http://143.244.60.30/HBO_FAMILY/mono.m3u8",
  HBO_Zone_East: "http://143.244.60.30/HBO_ZONE/mono.m3u8",
  HGTV_East: "http://143.244.60.30/HGTV/mono.m3u8",
  HLN: "http://143.244.60.30/HLN/mono.m3u8",
  ID_East: "http://143.244.60.30/INVESTIGATION_DISCOVERY/mono.m3u8",
  ION: "http://143.244.60.30/ION_TV/mono.m3u8",
  Laff_TV: "http://72.46.118.193/Laff/mono.m3u8",
  Lifetime_East: "http://143.244.60.30/LIFETIME/mono.m3u8",
  Lifetime_Movies: "http://143.244.60.30/LIFETIME_MOVIE_NETWORK/mono.m3u8",
  Logo_East: "http://143.244.60.30/Logo/mono.m3u8",
  MeTV: "http://143.244.60.30/ME_TV/mono.m3u8",
  MLB_Network: "http://143.244.60.30/MLB_NETWORK/mono.m3u8",
  MotorTrend: "http://143.244.60.30/MOTOR_TREND/mono.m3u8",
  MSNBC: "http://143.244.60.30/MSNBC/mono.m3u8",
  MTV_East: "http://143.244.60.30/MTV/mono.m3u8",
  MTV2_East: "http://143.244.60.30/MTV_2/mono.m3u8",
  MTV_Classic: "http://143.244.60.30/MTV_CLASSIC/mono.m3u8",
  MTV_Live: "http://143.244.60.30/MTV_LIVE/mono.m3u8",
  mtvU: "http://143.244.60.30/MTV_U/mono.m3u8",
  NatGeo_East: "http://143.244.60.30/National_Geographic/mono.m3u8",
  NatGeo_Wild: "http://143.244.60.30/Nat_Geo_Wild/mono.m3u8",
  NBA_TV: "http://143.244.60.30/NBA_TV/mono.m3u8",
  NBC_East: "http://fl1.moveonjoy.com/NBC_EAST/mono.m3u8",
  NewsNation: "http://fl3.moveonjoy.com/NEWS_NATION/mono.m3u8",
  NFL_Network: "http://fl3.moveonjoy.com/NFL_NETWORK/mono.m3u8",
  NHL_Network: "http://fl3.moveonjoy.com/NHL_NETWORK/mono.m3u8",
  Nickelodeon_East: "http://fl1.moveonjoy.com/NICKELODEON/mono.m3u8",
  NickJr_East: "http://fl3.moveonjoy.com/NICK_JR/mono.m3u8",
  NickMusic: "http://fl3.moveonjoy.com/NICK_MUSIC/mono.m3u8",
  NickToons_East: "http://fl1.moveonjoy.com/NICKTOONS/mono.m3u8",
  OWN_East: "http://fl3.moveonjoy.com/OWN/mono.m3u8",
  Outdoor_Channel: "http://fl3.moveonjoy.com/OUTDOOR_CHANNEL/mono.m3u8",
  Oxygen_East: "http://fl3.moveonjoy.com/OXYGEN/mono.m3u8",
  Paramount_Network_East: "http://fl3.moveonjoy.com/PARAMOUNT_NETWORK/mono.m3u8",
  PopTV_East: "http://fl3.moveonjoy.com/Pop_TV/mono.m3u8",
  ReelzChannel: "http://fl3.moveonjoy.com/REELZ/mono.m3u8",
  Revolt: "http://fl3.moveonjoy.com/REVOLT/mono.m3u8",
  SEC_Network: "http://fl3.moveonjoy.com/SEC_NETWORK/mono.m3u8",
  Showtime_East: "http://fl3.moveonjoy.com/SHOWTIME/mono.m3u8",
  Showtime_2_East: "http://fl3.moveonjoy.com/SHOWTIME_2/mono.m3u8",
  Showtime_Extreme_East: "http://fl3.moveonjoy.com/SHOWTIME_EXTREME/mono.m3u8",
  Showtime_Next_East: "http://fl3.moveonjoy.com/SHOWTIME_NEXT/mono.m3u8",
  Showtime_Women_East: "http://fl3.moveonjoy.com/SHOWTIME_WOMEN/mono.m3u8",
  Stadium: "http://fl3.moveonjoy.com/STADIUM/mono.m3u8",
  Starz_East: "http://fl3.moveonjoy.com/STARZ/mono.m3u8",
  Starz_Comedy_East: "http://fl3.moveonjoy.com/STARZ_COMEDY/mono.m3u8",
  Starz_Edge_East: "http://fl3.moveonjoy.com/STARZ_EDGE/mono.m3u8",
  Starz_Encore_East: "http://fl3.moveonjoy.com/STARZ_ENCORE/mono.m3u8",
  Starz_Encore_Action: "http://fl3.moveonjoy.com/STARZ_ENCORE_ACTION/mono.m3u8",
  Starz_Encore_Westerns: "http://fl3.moveonjoy.com/STARZ_ENCORE_WESTERNS/mono.m3u8",
  SundanceTV: "http://fl3.moveonjoy.com/SUNDANCE/mono.m3u8",
  SYFY_East: "http://fl3.moveonjoy.com/SYFY/mono.m3u8",
  TBS_East: "http://fl1.moveonjoy.com/TBS/mono.m3u8",
  TCM_East: "http://fl1.moveonjoy.com/TCM/mono.m3u8",
  Tennis_Channel: "http://fl3.moveonjoy.com/TENNIS_CHANNEL/mono.m3u8",
  TLC_East: "http://fl3.moveonjoy.com/TLC/mono.m3u8",
  TNT_East: "http://143.244.60.30/TNT/mono.m3u8",
  truTV_East: "http://fl3.moveonjoy.com/TRU_TV/mono.m3u8",
  TVLand: "http://fl3.moveonjoy.com/TV_Land/mono.m3u8",
  TVOne: "http://fl3.moveonjoy.com/TV_ONE/mono.m3u8",
  VH1_East: "http://fl3.moveonjoy.com/VH1/mono.m3u8",
  Vice: "http://fl3.moveonjoy.com/VICELAND/mono.m3u8",
  Weather_Channel: "http://fl3.moveonjoy.com/THE_WEATHER_CHANNEL/mono.m3u8",
  WeTV: "http://fl1.moveonjoy.com/WE_TV/mono.m3u8",
  YES_Network: "http://fl3.moveonjoy.com/YES_NETWORK/mono.m3u8",
  Game_Show_Network: "https://a-cdn.klowdtv.com/live2/gsn_720p/playlist.m3u8",
  WWE_Network: "http://fl3.moveonjoy.com/WWE/mono.m3u8",
  USA_Network: "http://fl3.moveonjoy.com/USA_Network/mono.m3u8",
  NASA_TV_Public: "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master_2000.m3u8",
  NASA_UHD: "https://endpnt.com/hls/nasa4k/nasa-uhd-p30-stream.m3u8",
  NASA_TV_Media: "https://ntv2.akamaized.net/hls/live/2013923/NASA-NTV2-HLS/master.m3u8",
  Magnolia: "http://fl3.moveonjoy.com/DIY/mono.m3u8",
  AXSTV: "https://dikcfc9915kp8.cloudfront.net/hls/1080p/playlist.m3u8",
  Al_Jazeera: "https://d1cy85syyhvqz5.cloudfront.net/v1/master/7b67fbda7ab859400a821e9aa0deda20ab7ca3d2/aljazeeraLive/AJE/mono.m3u8",
  TSN_1: "http://fl5.moveonjoy.com/TSN_1/mono.m3u8",
  TSN_2: "http://fl5.moveonjoy.com/TSN_2/mono.m3u8",
  TSN_3: "http://fl5.moveonjoy.com/TSN_3/mono.m3u8",
  TSN_4: "http://fl5.moveonjoy.com/TSN_4/mono.m3u8",
  TSN_5: "http://fl5.moveonjoy.com/TSN_5/mono.m3u8",

  hbo_family: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbofamily',
  hbo_hd: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbo',
  hbo_signature: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbosignature',
  hbo_hits: 'https://smart.pendy.dpdns.org/Smart.php?id=Hbohitshd',
  cinemax: 'https://smart.pendy.dpdns.org/Smart.php?id=Cinemax',
  animax: 'https://smart.pendy.dpdns.org/Smart.php?id=Animax',
  movies_nowhd: 'https://smart.pendy.dpdns.org/Smart.php?id=moviesnow_raj',
  star_movieshd: 'https://smart.pendy.dpdns.org/Smart.php?id=starmovies_raj',
  hits: 'https://smart.pendy.dpdns.org/Smart.php?id=Hits',
  warnertv: 'https://smart.pendy.dpdns.org/Smart.php?id=WarnerTV',
  scm: 'https://smart.pendy.dpdns.org/Smart.php?id=Weishimovie',
  dreamworks: 'https://smart.pendy.dpdns.org/Smart.php?id=Dreamworks',
  thrill: 'https://smart.pendy.dpdns.org/Smart.php?id=Thrill',
  hitsmovies: 'https://smart.pendy.dpdns.org/Smart.php?id=Hitsmovie',
  one: 'https://smart.pendy.dpdns.org/Smart.php?id=One',
  tvnmovies: 'https://smart.pendy.dpdns.org/Smart.php?id=Tvnmovie',
  celestial_classic: 'https://smart.pendy.dpdns.org/Smart.php?id=Celestial2',
  celestial_movieshd: 'https://smart.pendy.dpdns.org/Smart.php?id=Celestialindo',
  axnhd: 'https://smart.pendy.dpdns.org/Smart.php?id=Axn',
  paramountnetwork: 'https://smart.pendy.dpdns.org/Smart.php?id=Paramountnetwork',
  kplus: 'https://smart.pendy.dpdns.org/Smart.php?id=Kplus',
  rockactions: 'https://smart.pendy.dpdns.org/Smart.php?id=Rockaction',
  rockentertainment: 'https://smart.pendy.dpdns.org/Smart.php?id=Rockentertain',
  natgeohd: 'https://smart.pendy.dpdns.org/Smart.php?id=natgeohd_twn',
  natgeowild: 'https://smart.pendy.dpdns.org/Smart.php?id=natgeowild_twn',
  animalplanet1: 'https://smart.pendy.dpdns.org/Smart.php?id=animalplanet_twn',
  discoveryasia: 'https://smart.pendy.dpdns.org/Smart.php?id=discoverytwn_twn',
  crime_Investigation: 'https://smart.pendy.dpdns.org/Smart.php?id=ci_twn',
  discoveryhd: 'https://smart.pendy.dpdns.org/Smart.php?id=discoveryhd_twn',
  natgeohd: 'https://smart.pendy.dpdns.org/Smart.php?id=Natgeo',
  fashiontv: 'https://smart.pendy.dpdns.org/Smart.php?id=fashiontv_twn',
  history: 'https://smart.pendy.dpdns.org/Smart.php?id=History',
  bbcearthhd: 'https://smart.pendy.dpdns.org/Smart.php?id=bbcearth_twn',
  bbclifestyle: 'https://smart.pendy.dpdns.org/Smart.php?id=bbclifestyle_twn',
  natgeowild: 'https://smart.pendy.dpdns.org/Smart.php?id=Natgeowild',
  animalplanet: 'https://smart.pendy.dpdns.org/Smart.php?id=AnimalPlanet',
  tlc: 'https://smart.pendy.dpdns.org/Smart.php?id=Tlc',
  foodnetworkhd: 'https://smart.pendy.dpdns.org/Smart.php?id=Foodnetwork',
  hgtv: 'https://smart.pendy.dpdns.org/Smart.php?id=HGTV',

  Tap_Sports: "https://starofvenus.dpdns.org/tap_sports/playlist.m3u8",
Premier_Sports: "https://starofvenus.dpdns.org/premier_sports/playlist.m3u8",
Premier_Sports_2: "https://starofvenus.dpdns.org/premier_sports2/playlist.m3u8",
TVN: "https://starofvenus.dpdns.org/tvn/playlist.m3u8",
Tvn_Movies_Pinoy: "https://starofvenus.dpdns.org/tvnmovies_pinoy/playlist.m3u8",
Blast_Sports: "https://starofvenus.dpdns.org/blast_sports/playlist.m3u8",
Premier_Football: "https://starofvenus.dpdns.org/premier_football/playlist.m3u8",
Studio_Universal: "https://starofvenus.dpdns.org/studio_universal/playlist.m3u8",
Outdoor: "https://starofvenus.dpdns.org/outdoor/playlist.m3u8",

  philippines_channel: 'https://ott.m3u8..com/gma/stream/manifest.m3u8',
  
  gma: 'https://ott.m3u8.nathcreqtives.com/gma/stream/manifest.m3u8',
tv5: 'https://ott.m3u8.nathcreqtives.com/tv5/stream/manifest.m3u8',
kapamilya: 'https://ott.m3u8.nathcreqtives.com/kapamilyachannel/stream/manifest.m3u8',
oneph: 'https://ott.m3u8.nathcreqtives.com/oneph/stream/manifest.m3u8',
rptv: 'https://ott.m3u8.nathcreqtives.com/rptv/stream/manifest.m3u8',
a2zs2: 'https://ott.m3u8.nathcreqtives.com/a2z/stream/manifest.m3u8',
alltv: 'https://ott.m3u8.nathcreqtives.com/alltv/stream/manifest.m3u8',
knowledge: 'https://ott.m3u8.nathcreqtives.com/knowledgechannel/stream/manifest.m3u8',
metro: 'https://ott.m3u8.nathcreqtives.com/metrochannel/stream/manifest.m3u8',
onenews: 'https://ott.m3u8.nathcreqtives.com/onenews/stream/manifest.m3u8',
taptv: 'https://ott.m3u8.nathcreqtives.com/taptv/stream/manifest.m3u8',
gmapinoy: 'https://ott.m3u8.nathcreqtives.com/gmapinoytv/stream/manifest.m3u8',

hbo: 'https://ott.m3u8.nathcreqtives.com/hbo/stream/manifest.m3u8',
hbohits: 'https://ott.m3u8.nathcreqtives.com/hbohitshd/stream/manifest.m3u8',
hbofamily: 'https://ott.m3u8.nathcreqtives.com/hbofamilyhd/stream/manifest.m3u8',
hbosignature: 'https://ott.m3u8.nathcreqtives.com/hbosignature/stream/manifest.m3u8',
vivacinema: 'https://ott.m3u8.nathcreqtives.com/vivacinema/stream/manifest.m3u8',
cinemo: 'https://ott.m3u8.nathcreqtives.com/cinemo/stream/manifest.m3u8',
cinemaone: 'https://ott.m3u8.nathcreqtives.com/cinemaone/stream/manifest.m3u8',
cinemax: 'https://ott.m3u8.nathcreqtives.com/cinemax/stream/manifest.m3u8',
hitsmovies: 'https://ott.m3u8.nathcreqtives.com/hitsmovies/stream/manifest.m3u8',
tapmovies: 'https://ott.m3u8.nathcreqtives.com/tapmovies/stream/manifest.m3u8',
tapaction: 'https://ott.m3u8.nathcreqtives.com/tapactionflix/stream/manifest.m3u8',
blastmovies: 'https://ott.m3u8.nathcreqtives.com/blastmovies/stream/manifest.m3u8',

amazon: 'https://ott.m3u8.nathcreqtives.com/amazonmovies/stream/manifest.m3u8',

pbarush: 'https://ott.m3u8.nathcreqtives.com/pbarush/stream/manifest.m3u8',
nbatvs1: 'https://ott.m3u8.nathcreqtives.com/nbatv/stream/manifest.m3u8',
onesports: 'https://ott.m3u8.nathcreqtives.com/onesports1/stream/manifest.m3u8',
onesportsplus: 'https://ott.m3u8.nathcreqtives.com/onesportsplus/stream/manifest.m3u8',
pbo: 'https://ott.m3u8.nathcreqtives.com/pbo/stream/manifest.m3u8',
premiersports: 'https://ott.m3u8.nathcreqtives.com/premiersports/stream/manifest.m3u8',
tnt1: 'https://ott.m3u8.nathcreqtives.com/tntsports1/stream/manifest.m3u8',
tnt2: 'https://ott.m3u8.nathcreqtives.com/tntsports2/stream/manifest.m3u8',
tnt3: 'https://ott.m3u8.nathcreqtives.com/tntsports3/stream/manifest.m3u8',
tnt4: 'https://ott.m3u8.nathcreqtives.com/tntsports4/stream/manifest.m3u8',
hboboxing: 'https://ott.m3u8.nathcreqtives.com/hboboxing/stream/manifest.m3u8',
blastsports: 'https://ott.m3u8.nathcreqtives.com/blastsports/stream/manifest.m3u8',

disney: 'https://ott.m3u8.nathcreqtives.com/disneychannel/stream/manifest.m3u8',
disneyjr: 'https://ott.m3u8.nathcreqtives.com/disneyjr/stream/manifest.m3u8',
disneyxd: 'https://ott.m3u8.nathcreqtives.com/disneyxd/stream/manifest.m3u8',
dreamworks: 'https://ott.m3u8.nathcreqtives.com/cignaldreamworks/stream/manifest.m3u8',
dreamtagalog: 'https://ott.m3u8.nathcreqtives.com/dreamworkstagalized/stream/manifest.m3u8',
nick: 'https://ott.m3u8.nathcreqtives.com/nickelodeon/stream/manifest.m3u8',
nickjr: 'https://ott.m3u8.nathcreqtives.com/nickjunior/stream/manifest.m3u8',
cartoon: 'https://ott.m3u8.nathcreqtives.com/cartoonnetwork/stream/manifest.m3u8',

anc: 'https://ott.m3u8.nathcreqtives.com/anchd/stream/manifest.m3u8',
gmanews: 'https://ott.m3u8.nathcreqtives.com/gmanewstv/stream/manifest.m3u8',
gmalive: 'https://ott.m3u8.nathcreqtives.com/gmanewslive/stream/manifest.m3u8',
net25: 'https://ott.m3u8.nathcreqtives.com/net25/stream/manifest.m3u8',
ptv: 'https://ott.m3u8.nathcreqtives.com/ptv/stream/manifest.m3u8',
smni: 'https://ott.m3u8.nathcreqtives.com/smni/stream/manifest.m3u8',
cnn: 'https://ott.m3u8.nathcreqtives.com/cnn/stream/manifest.m3u8',
abc: 'https://ott.m3u8.nathcreqtives.com/abcaustralia/stream/manifest.m3u8',
cna: 'https://ott.m3u8.nathcreqtives.com/cna/stream/manifest.m3u8',

jeepney: 'https://ott.m3u8.nathcreqtives.com/jeepneytv/stream/manifest.m3u8',
tfc: 'https://ott.m3u8.nathcreqtives.com/tfc/stream/manifest.m3u8',
tapedge: 'https://ott.m3u8.nathcreqtives.com/tapedge/stream/manifest.m3u8',
paramount: 'https://ott.m3u8.nathcreqtives.com/paramountnetwork/stream/manifest.m3u8',
hitsnow: 'https://ott.m3u8.nathcreqtives.com/hitsnow/stream/manifest.m3u8',
tmc: 'https://ott.m3u8.nathcreqtives.com/tmc/stream/manifest.m3u8',
amcs2: 'https://ott.m3u8.nathcreqtives.com/amc/stream/manifest.m3u8',
history: 'https://ott.m3u8.nathcreqtives.com/history/stream/manifest.m3u8',
warnertv: 'https://ott.m3u8.nathcreqtives.com/warnertv/stream/manifest.m3u8',
hitss1: 'https://ott.m3u8.nathcreqtives.com/hits/stream/manifest.m3u8',

asianfood: 'https://ott.m3u8.nathcreqtives.com/asianfoodnetwork/stream/manifest.m3u8',
travel: 'https://ott.m3u8.nathcreqtives.com/travelchannel/stream/manifest.m3u8',

animal: 'https://ott.m3u8.nathcreqtives.com/animalplanet/stream/manifest.m3u8',
discoveryasia: 'https://ott.m3u8.nathcreqtives.com/discoveryasia/stream/manifest.m3u8',
discovery: 'https://ott.m3u8.nathcreqtives.com/discoverychannel/stream/manifest.m3u8',
crimeinvestigation: 'https://ott.m3u8.nathcreqtives.com/crimeinvestigation/stream/manifest.m3u8',

animax: 'https://ott.m3u8.nathcreqtives.com/animax/stream/manifest.m3u8',
anipluss2: 'https://ott.m3u8.nathcreqtives.com/aniplus/stream/manifest.m3u8',
starmovie: 'https://ott.miswa.org/stream/direct/starmovieshd-1/stream_0.m3u8?u=miswatv&p=7ab1b6f24a1e2c58d54a3e9ed2eb12c7d2745bf8458603e59ab276e749821897&uid=52210434',
starmovie_select: 'https://ott.miswa.org/stream/direct/starmoviesselect/stream_0.m3u8?u=miswatv&p=7ab1b6f24a1e2c58d54a3e9ed2eb12c7d2745bf8458603e59ab276e749821897&uid=52210434',  
myx: 'https://ott.m3u8.nathcreqtives.com/myxglobal/stream/manifest.m3u8',
  UNTOLD_2025: "https://tevh.9ljp.com/vod/1/2025/08/01/bd4120b363da/index5.m3u8?wsSecret=6e520070865cdb80edac26888b4fb7d9&wsTime=688e0ebd"
};

// 🎬 Proxy for .m3u8 playlist
app.get('/:stream/playlist.m3u8', (req, res) => {
  const key = req.params.stream;
  const streamUrl = streams[key];

  if (!streamUrl) return res.status(404).send('❌ Invalid stream key');

  const baseUrl = new URL(streamUrl);
  const basePath = baseUrl.href.substring(0, baseUrl.href.lastIndexOf('/') + 1);

  request.get(streamUrl, (err, response, body) => {
    if (err || response.statusCode !== 200) {
      return res.status(502).send('❌ Failed to fetch playlist');
    }

    const modified = body.replace(/^(?!#)(.+)$/gm, (line) => {
      line = line.trim();
      if (!line || line.startsWith('#')) return line;
      const fullUrl = new URL(line, basePath).href;
      return `/segment.ts?url=${encodeURIComponent(fullUrl)}`;
    });

    res.set('Content-Type', 'application/vnd.apple.mpegurl');
    res.send(modified);
  });
});

// 🎥 Proxy for .ts segments
app.get('/segment.ts', (req, res) => {
  const segmentUrl = req.query.url;
  if (!segmentUrl) return res.status(400).send('❌ No segment URL');

  request
    .get(segmentUrl)
    .on('response', (r) => res.set(r.headers))
    .on('error', () => res.status(502).send('❌ Segment failed'))
    .pipe(res);
});

// 🏠 Homepage: Channel List UI
app.get('/', (req, res) => {
  const channelList = Object.keys(streams)
    .map(name => `<li><a href="/${name}/playlist.m3u8" target="_blank">${name}</a></li>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>CHANNEL LIST</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #111;
          color: #fff;
          padding: 20px;
        }
        h1 {
          text-align: center;
          color: #f9c80e;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin: 8px 0;
        }
        a {
          color: #61dafb;
          text-decoration: none;
          font-size: 1.1em;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>CHANNEL LIST</h1>
      <ul>${channelList}</ul>
    </body>
    </html>
  `);
});

// 🚀 Launch the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
