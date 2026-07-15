const https = require('https');
const PROJECT_ID = "tuned-space-wwjrd";
const DATABASE_ID = "ai-studio-b69d46b9-5bc0-40a8-97ee-2dc218220d61";
const URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/${DATABASE_ID}/documents/appConfig/partnerLogos`;

https.get(URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const doc = JSON.parse(data);
      if (doc.fields && doc.fields.logos && doc.fields.logos.mapValue && doc.fields.logos.mapValue.fields) {
        console.log("Keys in DB:", Object.keys(doc.fields.logos.mapValue.fields));
      } else {
        console.log("No logos found");
      }
    } catch(e) { console.error(e); }
  });
});
