const https = require('https');
const http = require('http');

const checkUrl = (urlStr) => {
  return new Promise((resolve) => {
    const client = urlStr.startsWith('https') ? https : http;
    const req = client.request(urlStr, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' } }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        const redirectUrl = res.headers.location;
        res.resume();
        resolve(checkUrl(redirectUrl));
        return;
      }
      resolve(`${res.statusCode} ${res.headers['content-type']}`);
      res.resume();
    });
    req.on('error', (err) => resolve(err.message));
    req.end();
  });
};

(async () => {
  const url = 'https://web.archive.org/web/20231204001928im_/https://www.thereporterethiopia.com/wp-content/uploads/2022/08/ECWC-Logo.png';
  console.log('Wayback ECWC:', await checkUrl(url));
})();
