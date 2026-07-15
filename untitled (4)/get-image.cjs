const https = require('https');

const fetchImg = (url) => new Promise((resolve) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    resolve(res.statusCode);
  });
});

(async () => {
  console.log('Addis:', await fetchImg("https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Addis_in_night.jpg/500px-Addis_in_night.jpg"));
})();
