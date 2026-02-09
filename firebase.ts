// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
  Auth
} from "firebase/auth";

// Firebase configuration with fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBWg0CfRIX9qkICZGWYbCHgXzmkpbv8w-A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "brewinx-61d03.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "brewinx-61d03",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "brewinx-61d03.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1059335085964",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1059335085964:web:a471a4c327b7fc1fe680a9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-RY2G5SNWRG"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
let analytics: Analytics | null = null;

// Only initialize analytics in browser environment
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (e) {
    console.warn('Analytics initialization failed:', e);
  }
}

const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export { auth, analytics };
export type { User };
