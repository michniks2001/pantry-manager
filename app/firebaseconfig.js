import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL1xEGpNhfAiQlLiIG4p0HL4qEur4NkBQ",
  authDomain: "pantry-app-3d5ff.firebaseapp.com",
  projectId: "pantry-app-3d5ff",
  storageBucket: "pantry-app-3d5ff.appspot.com",
  messagingSenderId: "1077383756243",
  appId: "1:1077383756243:web:145d7420fdfabca9fdd726"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)

export { app, firestore, auth };