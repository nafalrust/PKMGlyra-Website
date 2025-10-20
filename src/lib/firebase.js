// Firebase configuration and initialization
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only once (client-side only)
let app;
let auth;

// Lazy initialization function
const initializeFirebase = () => {
  if (typeof window === 'undefined') {
    return; // Skip on server-side
  }

  // Validate config only on client-side
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain) {
    console.error('Firebase configuration is missing. Please check your environment variables.');
    return;
  }

  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
  }
};

// Auto-initialize on first import (client-side only)
if (typeof window !== 'undefined') {
  initializeFirebase();
}

export { app, auth, initializeFirebase };
