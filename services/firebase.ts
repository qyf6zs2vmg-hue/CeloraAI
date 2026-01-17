
// Fix: Use modular imports to resolve missing property errors on the default firebase import
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAlBehjAAXNqrEWufBEHARQXqbRYh5hyKI",
  authDomain: "ai-assistant-6939a.firebaseapp.com",
  projectId: "ai-assistant-6939a",
  storageBucket: "ai-assistant-6939a.firebasestorage.app",
  messagingSenderId: "515419380278",
  appId: "1:515419380278:web:308f67852fe824ec25d697"
};

// Fix: Use getApps and initializeApp from the modular SDK to handle initialization safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Fix: Use getter functions from respective modular packages to export service instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
