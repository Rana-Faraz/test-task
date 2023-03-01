// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZyAIIykSrWLlxf29NLNrcOzVXq_m0c6k",
  authDomain: "test-task-67938.firebaseapp.com",
  projectId: "test-task-67938",
  storageBucket: "test-task-67938.appspot.com",
  messagingSenderId: "135716584669",
  appId: "1:135716584669:web:c7e8aaf842e65a2f696f34",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
