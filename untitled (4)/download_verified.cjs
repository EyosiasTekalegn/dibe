const fs = require('fs');
const https = require('https');
const http = require('http');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        res.resume();
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(fs.statSync(dest).size));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

(async () => {
  try {
    console.log('Downloading Mayor Office logo...');
    const sizeMayor = await download('https://addismayor.gov.et/uploads/Setting/mayors-office-2024-01-18-65a9005d7757f.png', 'public/partners/mayor.png');
    console.log('Mayor Office size:', sizeMayor);
    
    console.log('Downloading ERA logo...');
    const sizeEra = await download('https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/0/09/Ethiopian_Road_Transport_Authority.png', 'public/partners/era.png');
    console.log('ERA size:', sizeEra);
    
    console.log('Copying ECAA and MOWE...');
    fs.copyFileSync('public/partners/ecaa.jpg', 'public/partners/ecaa.png');
    console.log('ECAA PNG size:', fs.statSync('public/partners/ecaa.png').size);
    
    fs.copyFileSync('public/partners/mowe.jpg', 'public/partners/mowe.png');
    console.log('MOWE PNG size:', fs.statSync('public/partners/mowe.png').size);
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
