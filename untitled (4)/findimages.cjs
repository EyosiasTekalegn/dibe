const https = require('https');
const http = require('http');

const fetchHTML = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' } }, (res) => {
      if ([301, 302, 308].includes(res.statusCode)) {
        return fetchHTML(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject).setTimeout(5000, () => reject(new Error('timeout')));
  });
};

(async () => {
    const urls = [
      'https://www.ethiojobs.net/companies/habesha-cement-sc',
      'https://www.ethiojobs.net/companies/ethiopian-construction-works-corporation'
    ];
    for (const url of urls) {
        try {
            console.log("Fetching images for:", url);
            const html = await fetchHTML(url);
            const imgMatch = html.match(/<img[^>]+src="([^"]+)"[^>]*>/g);
            if (imgMatch) {
              imgMatch.forEach(m => {
                const src = m.match(/src="([^"]+)"/);
                if (src && !src[1].startsWith('data:')) {
                  console.log("  -", src[1]);
                }
              });
            } else {
              console.log("  No images found.");
            }
        } catch (e) {
            console.log("Error fetching:", url, e.message);
        }
    }
})();
