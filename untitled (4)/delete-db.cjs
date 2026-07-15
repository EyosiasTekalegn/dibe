const https = require('https');
const PROJECT_ID = "tuned-space-wwjrd";
const DATABASE_ID = "ai-studio-b69d46b9-5bc0-40a8-97ee-2dc218220d61";
const URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/appConfig/partnerLogos`;

const req = https.request(URL, { method: 'DELETE' }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', res.statusCode, data));
});
req.end();
