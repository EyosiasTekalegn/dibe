const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  projectId: "tuned-space-wwjrd",
  appId: "1:910808320491:web:57a486ab483735ee88b1ae",
  apiKey: "AIzaSyDGTmoljeRmxYCexTNYTmGj9CLI3fdSpEA",
  authDomain: "tuned-space-wwjrd.firebaseapp.com",
  storageBucket: "tuned-space-wwjrd.firebasestorage.app",
  messagingSenderId: "910808320491",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-b69d46b9-5bc0-40a8-97ee-2dc218220d61");

async function check() {
  try {
    const configRef = doc(db, 'appConfig', 'global');
    const snap = await getDoc(configRef);
    if (snap.exists()) {
      console.log("Config exists!");
      const data = snap.data();
      console.log("Keys in config:", Object.keys(data));
      if (data.mainLogo) console.log("Has mainLogo");
      if (data.partnerLogos) console.log("Has partnerLogos:", Object.keys(data.partnerLogos));
      if (data.projectImages) console.log("Has projectImages:", Object.keys(data.projectImages));
    } else {
      console.log("Config document does not exist yet.");
    }
  } catch (e) {
    console.error("Error fetching config:", e);
  }
}

check();
