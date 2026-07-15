const https = require('https');
const fs = require('fs');

const d = (url, path) => new Promise(resolve => {
  https.get(url, res => {
    res.pipe(fs.createWriteStream(path)).on('finish', () => resolve());
  });
});

(async () => {
  await d("https://www.ethiojobs.net/images/company_logo/Ethiopian%20Construction%20Works%20Corporation.png", "public/partners/ecwc.png");
})();
