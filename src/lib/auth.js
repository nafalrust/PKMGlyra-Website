// Authentication service
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, initializeFirebase } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7860';

// Helper to check if we're on client-side
const isClient = typeof window !== 'undefined';

// Helper to ensure Firebase is initialized
const ensureAuth = () => {
  if (!isClient) return false;
  initializeFirebase();
  return !!auth;
};

/**
 * Sign up with email and password
 */
export const signUpWithEmail = async (email, password, fullName = '', nickname = '') => {
  if (!ensureAuth()) {
    return { success: false, message: 'Authentication not available' };
  }
  
  try {
    // Create user in Firebase Auth (client-side)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Also register in backend
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        fullName,
        nickname,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      // If backend fails but Firebase succeeded, we should handle cleanup
      console.error('Backend signup failed:', data.message);
    }

    return {
      success: true,
      user: user,
      message: 'Account created successfully',
    };
  } catch (error) {
    console.error('Signup error:', error);
    
    let errorMessage = 'An error occurred during signup';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Login with email and password
 */
export const loginWithEmail = async (email, password) => {
  if (!ensureAuth()) {
    return { success: false, message: 'Authentication not available' };
  }
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Notify backend about login (optional)
    try {
      await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          uid: user.uid,
        }),
      });
    } catch (err) {
      console.error('Backend login notification failed:', err);
    }

    return {
      success: true,
      user: user,
      message: 'Login successful',
    };
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'An error occurred during login';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later';
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Login with Google
 */
export const loginWithGoogle = async () => {
  if (!ensureAuth()) {
    return { success: false, message: 'Authentication not available' };
  }
  
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Notify backend
    try {
      await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          uid: user.uid,
        }),
      });
    } catch (err) {
      console.error('Backend login notification failed:', err);
    }

    return {
      success: true,
      user: user,
      message: 'Login with Google successful',
    };
  } catch (error) {
    console.error('Google login error:', error);
    
    let errorMessage = 'An error occurred during Google login';
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Login cancelled';
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

/**
 * Logout
 */
export const logout = async () => {
  if (!ensureAuth()) {
    return { success: false, message: 'Authentication not available' };
  }
  
  try {
    await signOut(auth);
    return {
      success: true,
      message: 'Logout successful',
    };
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      message: 'An error occurred during logout',
    };
  }
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  if (!ensureAuth()) return null;
  return auth.currentUser;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
  if (!ensureAuth()) return () => {};
  return onAuthStateChanged(auth, callback);
};

/**
 * Update user profile in backend
 */
export const updateUserProfile = async (uid, profileData) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        ...profileData,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: 'An error occurred while updating profile',
    };
  }
};
