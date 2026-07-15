const https = require('https');
const fetchJson = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(JSON.parse(d)));
  });
});
(async () => {
  const d1 = await fetchJson("https://commons.wikimedia.org/w/api.php?action=query&list=allimages&aiprop=url&aiprefix=Ministry_of_Water&format=json");
  console.log("Water:", JSON.stringify(d1.query.allimages));
  const d2 = await fetchJson("https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=Habesha%20Cement&srnamespace=6&format=json");
  console.log("Habesha:", JSON.stringify(d2.query.search));
})();
