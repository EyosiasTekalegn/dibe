const https = require('https');

const fetchImg = (urlStr) => new Promise((resolve) => {
  https.get(urlStr, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    resolve(`${res.statusCode} ${res.headers['content-type']}`);
  }).on('error', (e) => resolve(e.message));
});

(async () => {
  console.log('ERA:', await fetchImg("https://mui.gov.et/wp-content/uploads/2023/12/Ethiopian-Roads-Administration-150x150.png"));
  console.log('ECAA:', await fetchImg("https://www.crwflags.com/fotw/images/e/et_caa.gif"));
  console.log('EEC:', await fetchImg("https://eec.com.et/wp-content/uploads/2023/04/eec-logo-1.png"));
  console.log('ECWC:', await fetchImg("https://www.thereporterethiopia.com/wp-content/uploads/2022/08/ECWC-Logo.png"));
})();
