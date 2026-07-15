const https = require('https');
const fetchJson = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(JSON.parse(d)));
  });
});
(async () => {
  console.log("ERA:", await fetchJson("https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Ethiopian_Roads&format=json"));
  console.log("ECAA:", await fetchJson("https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Ethiopian_Civil_Aviation&format=json"));
  console.log("ECWC:", await fetchJson("https://en.wikipedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Ethiopian_Construction&format=json"));
})();
