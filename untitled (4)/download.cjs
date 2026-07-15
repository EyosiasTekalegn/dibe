const fs = require('fs');
const https = require('https');
const http = require('http');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 308) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  try {
    fs.mkdirSync('public/partners', { recursive: true });
    
    const results = await Promise.allSettled([
      download('https://addismayor.gov.et/wp-content/uploads/2021/08/cropped-logo.png', 'public/partners/mayor.png'),
      download('https://eec.com.et/wp-content/uploads/2023/04/eec-logo-1.png', 'public/partners/eec.png'),
      download('https://mowe.gov.et/frontHome/images/logo2.png', 'public/partners/mowe.png'),
      download('https://www.crwflags.com/fotw/images/e/et_caa.gif', 'public/partners/ecaa.gif'),
      download('https://www.thereporterethiopia.com/wp-content/uploads/2022/08/ECWC-Logo.png', 'public/partners/ecwc.png'),
      download('https://mui.gov.et/wp-content/uploads/2023/12/Ethiopian-Roads-Administration-150x150.png', 'public/partners/era.png'),
      download('https://ethiojobs.net/images/company_logo/Habesha%20Cement%20Share%20Company.png', 'public/partners/habesha-cement.png')
    ]);
    
    console.log(results.map(r => r.status));
  } catch(e) {
    console.error(e);
  }
})();
