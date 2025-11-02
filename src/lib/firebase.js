// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// --- Konfigurasi Firebase dari Environment Variable ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // wajib ada untuk Realtime DB
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// --- Lazy Initialization ---
let app;
let auth;
let storage;
let database;

export const initializeFirebase = () => {
  if (typeof window === "undefined") {
    console.warn("⚠️ Firebase initialization skipped on server-side.");
    return null;
  }

  // Validasi konfigurasi
  const missingKeys = Object.entries(firebaseConfig)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingKeys.length > 0) {
    console.error("❌ Missing Firebase config keys:", missingKeys);
    return null;
  }

  if (!app) {
    try {
      app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
      auth = getAuth(app);
      storage = getStorage(app);
      database = getDatabase(app);
      console.log("✅ Firebase initialized successfully");
    } catch (error) {
      console.error("❌ Firebase initialization error:", error);
    }
  }

  return { app, auth, storage, database };
};

// --- Auto-initialize ketika dijalankan di client ---
if (typeof window !== "undefined") {
  initializeFirebase();
}

// --- Ekspor agar bisa digunakan di komponen lain ---
export { app, auth, storage, database };
