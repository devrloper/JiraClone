// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 👈 Authentication import

const firebaseConfig = {
  apiKey: "AIzaSyCjRnnCV3LWtaIoDyWA2Rfq_Pm7x2veWiM",
  authDomain: "jira-24adc.firebaseapp.com",
  projectId: "jira-24adc",
  storageBucket: "jira-24adc.appspot.com", 
  messagingSenderId: "476270227068",
  appId: "1:476270227068:web:fd6aef9672fc73720d63f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 👈 export auth instance
