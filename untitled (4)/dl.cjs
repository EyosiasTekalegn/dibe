const https = require('https');
const fs = require('fs');

const d = (url, path) => new Promise(resolve => {
  https.get(url, {rejectUnauthorized: false}, res => {
    res.pipe(fs.createWriteStream(path)).on('finish', () => resolve());
  });
});

(async () => {
  await d("https://www.era.gov.et/image/company_logo?img_id=30703&t=1783317170768", "public/partners/era.png");
  await d("https://www.crwflags.com/fotw/images/e/et_caa.jpg", "public/partners/ecaa.jpg");
})();
