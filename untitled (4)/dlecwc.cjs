const https = require('https');
const fs = require('fs');

const d = (url, path) => new Promise(resolve => {
  https.get(url, res => {
    res.pipe(fs.createWriteStream(path)).on('finish', () => resolve());
  });
});

(async () => {
  await d("https://www.2merkato.com/images/directories/logo/construction/ethiopian_construction_works_corporation.png", "public/partners/ecwc.png");
})();
