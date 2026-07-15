const https = require('https');

const fetchJson = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(JSON.parse(d)));
  });
});

(async () => {
  const data1 = await fetchJson("https://en.wikipedia.org/w/api.php?action=query&titles=File:Addis_Ababa_City_Administration_Logo.png&prop=imageinfo&iiprop=url&format=json");
  console.log("Addis:", JSON.stringify(data1));
  const data2 = await fetchJson("https://en.wikipedia.org/w/api.php?action=query&titles=File:Emblem_of_Ethiopia.svg&prop=imageinfo&iiprop=url&format=json");
  console.log("PMO:", JSON.stringify(data2));
})();
