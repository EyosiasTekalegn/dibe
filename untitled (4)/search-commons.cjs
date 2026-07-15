const https = require('https');
const fetchJson = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(JSON.parse(d)));
  });
});
(async () => {
  console.log("Water:", await fetchJson("https://commons.wikimedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Ministry_of_Water&format=json"));
  console.log("Habesha:", await fetchJson("https://commons.wikimedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Habesha&format=json"));
})();
