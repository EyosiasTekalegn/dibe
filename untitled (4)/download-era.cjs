const https = require('https');
const fs = require('fs');
https.get("https://www.era.gov.et/image/company_logo?img_id=30703&t=1783317170768", {
  rejectUnauthorized: false
}, res => {
  res.pipe(fs.createWriteStream('public/partners/era.png'));
});
