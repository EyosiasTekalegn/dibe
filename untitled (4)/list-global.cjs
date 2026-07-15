const https = require('https');
const PROJECT_ID = "tuned-space-wwjrd";
const DATABASE_ID = "ai-studio-b69d46b9-5bc0-40a8-97ee-2dc218220d61";
const URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/appConfig/global`;

https.get(URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const doc = JSON.parse(data);
      console.log(JSON.stringify(doc).substring(0, 500));
      if (doc.fields && doc.fields.partnerLogos) {
         console.log("Found partner logos in global!");
         console.log("Keys:", Object.keys(doc.fields.partnerLogos.mapValue.fields));
      }
    } catch(e) { console.error(e); }
  });
});
