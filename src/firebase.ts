import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDSGQGCug81o2WInNtXY64CzE6NeD_hc_Q",
  authDomain: "edipack-app.firebaseapp.com",
  projectId: "edipack-app",
  storageBucket: "edipack-app.appspot.com",
  messagingSenderId: "434856867075",
  appId: "1:434856867075:web:4868650440fd19b680e536",
  measurementId: "G-CG000K8N6S"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);