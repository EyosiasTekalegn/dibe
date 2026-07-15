const https = require('https');
const fs = require('fs');
https.get("https://web.archive.org/web/20231204001928im_/https://www.thereporterethiopia.com/wp-content/uploads/2022/08/ECWC-Logo.png", res => {
  res.pipe(fs.createWriteStream('public/partners/ecwc.png'));
});
