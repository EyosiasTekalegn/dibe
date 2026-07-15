const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    
    // Set a real browser User-Agent to prevent 429 blocks from Wikimedia/Wikipedia
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9'
    };

    https.get(url, { headers }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const redirectUrl = response.headers.location;
        console.log(`Redirecting to: ${redirectUrl}`);
        download(redirectUrl, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (Status Code: ${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Successfully downloaded ${dest}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const partners = [
  { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Emblem_of_Ethiopia.svg/500px-Emblem_of_Ethiopia.svg.png', dest: 'public/partners/pmo.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Addis_Ababa_City_Administration_Logo.png', dest: 'public/partners/mayor.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ethiopian_Road_Transport_Authority.png', dest: 'public/partners/era.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Ethiopian_Civil_Aviation_Authority_logo.png', dest: 'public/partners/ecaa.png' },
  // EEC / EEG (using existing working eeg.png or eec.png on disk, but let's download EEU logo if needed. We already have a valid eeg.png and eec.png on disk!)
  { url: 'https://web.archive.org/web/20231204001928im_/https://www.thereporterethiopia.com/wp-content/uploads/2022/08/ECWC-Logo.png', dest: 'public/partners/ecwc.png' },
  { url: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Ministry_of_Water_and_Energy_%28Ethiopia%29.jpg', dest: 'public/partners/mowe.png' },
  { url: 'https://web.archive.org/web/20161026090525im_/http://www.thereporterethiopia.com/wp-content/uploads/2016/10/habesha-cement.jpg', dest: 'public/partners/habesha-cement.png' }
];

async function run() {
  console.log('Downloading partner logos with Chrome headers...');
  for (const partner of partners) {
    try {
      await download(partner.url, partner.dest);
    } catch (err) {
      console.error(`Error downloading ${partner.dest}:`, err.message);
    }
  }
}

run();
