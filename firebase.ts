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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.projectId && firebaseConfig.apiKey;

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let analytics: Analytics | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
} else {
  console.warn('Firebase is not configured. Please add environment variables.');
}

// Auth functions with fallbacks
export const signInWithGoogle = () => {
  if (!auth || !googleProvider) {
    return Promise.reject(new Error('Firebase not configured'));
  }
  return signInWithPopup(auth, googleProvider);
};

export const signInWithEmail = (email: string, password: string) => {
  if (!auth) {
    return Promise.reject(new Error('Firebase not configured'));
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUpWithEmail = (email: string, password: string) => {
  if (!auth) {
    return Promise.reject(new Error('Firebase not configured'));
  }
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logOut = () => {
  if (!auth) {
    return Promise.reject(new Error('Firebase not configured'));
  }
  return signOut(auth);
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  if (!auth) {
    // Call with null immediately if not configured
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
};

export { auth, analytics, isFirebaseConfigured };
export type { User };
