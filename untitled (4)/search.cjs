const https = require('https');

const fetchJson = (url) => new Promise(resolve => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    let d = '';
    res.on('data', c => d += c);
    res.on('end', () => resolve(JSON.parse(d)));
  });
});

(async () => {
  const data1 = await fetchJson("https://en.wikipedia.org/w/api.php?action=query&titles=Habesha_Cement_Share_Company&prop=pageimages&format=json&pithumbsize=500");
  console.log("Habesha:", JSON.stringify(data1));
  const data2 = await fetchJson("https://en.wikipedia.org/w/api.php?action=query&titles=Ethiopian_Construction_Works_Corporation&prop=pageimages&format=json&pithumbsize=500");
  console.log("ECWC:", JSON.stringify(data2));
})();
