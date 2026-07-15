const https = require('https');
const fs = require('fs');

https.get("https://upload.wikimedia.org/wikipedia/en/0/09/Ethiopian_Road_Transport_Authority.png", res => {
  res.pipe(fs.createWriteStream('public/partners/era.png'));
});

https.get("https://upload.wikimedia.org/wikipedia/en/e/e0/Ethiopian_Civil_Aviation_Authority_logo.png", res => {
  res.pipe(fs.createWriteStream('public/partners/ecaa.png'));
});
