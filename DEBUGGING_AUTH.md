# 🐛 Debugging "Authentication Not Available" Error

## Error Message
```
Authentication not available
```
or
```
Firebase initialization failed. Please check your internet connection and refresh the page.
```

---

## 🔍 Quick Diagnosis

### **Step 1: Open Browser Console**
1. Press `F12` or `Right Click → Inspect`
2. Go to **Console** tab
3. Look for Firebase errors (red text)

### **Step 2: Check for These Messages**

#### ✅ **Success Message:**
```
✅ Firebase initialized successfully
```
If you see this, Firebase is working correctly.

#### ❌ **Error Messages:**

**A. Missing Configuration:**
```
❌ Firebase configuration is missing!
Config:
  apiKey: ✗ Missing
  authDomain: ✗ Missing
  projectId: ✗ Missing
```
**Solution:** Check `.env.local` file exists and has correct values.

**B. Invalid API Key:**
```
FirebaseError: Firebase: Error (auth/invalid-api-key)
```
**Solution:** Check `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local`

**C. Network Error:**
```
Failed to fetch
NetworkError
```
**Solution:** Check internet connection, firewall, or VPN

---

## 🔧 Solutions

### **Solution 1: Verify .env.local File**

**Location:** `d:\Project\PKMGlyra-Website\.env.local`

**Check file exists:**
```powershell
cd d:\Project\PKMGlyra-Website
ls .env.local
```

**Check content:**
```bash
# Should have these variables:
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pkmglyra-database.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pkmglyra-database
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pkmglyra-database.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=907671614019
NEXT_PUBLIC_FIREBASE_APP_ID=1:907671614019:web:...
NEXT_PUBLIC_API_URL=https://nafalrust-pkmglyra-backend.hf.space
```

**If missing or incorrect:**
1. Copy from `.env.production.example`
2. Or get values from Firebase Console

---

### **Solution 2: Restart Dev Server**

**Important:** Next.js only reads `.env.local` at startup!

```powershell
# Stop server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

**Wait for:**
```
✓ Ready in 1939ms
```

**Then refresh browser** (Ctrl+F5)

---

### **Solution 3: Clear Browser Cache**

Sometimes old cached files cause issues:

**Chrome/Edge:**
1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh page (Ctrl+F5)

**Or use Incognito Mode:**
- `Ctrl + Shift + N`
- Navigate to `http://localhost:3000`

---

### **Solution 4: Check Firebase Project Settings**

**Go to Firebase Console:**
https://console.firebase.google.com/

**Verify:**
1. Project name: **pkmglyra-database**
2. **Authentication** → **Sign-in method**
   - ✅ Email/Password enabled
   - ✅ Google enabled
3. **Project Settings** → **General**
   - Copy config values
   - Compare with `.env.local`

---

### **Solution 5: Check Network/Firewall**

Firebase needs internet access to these domains:
- `firebaseapp.com`
- `googleapis.com`
- `firebase.googleapis.com`

**Test connection:**
```powershell
# Test if you can reach Firebase
curl https://firebase.googleapis.com
```

**If blocked:**
- Disable VPN temporarily
- Check firewall settings
- Try different network

---

## 🧪 Test Firebase Initialization

### **Manual Test in Browser Console:**

1. Open `http://localhost:3000`
2. Press `F12` → Console tab
3. Type this:

```javascript
// Check if Firebase loaded
console.log('Firebase Config:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
});
```

**Expected:**
```javascript
{
  apiKey: "AIzaSy...",  // Should see actual key
  authDomain: "pkmglyra-database.firebaseapp.com"
}
```

**If you see `undefined`:**
- `.env.local` not loaded
- Restart dev server
- Check file location

---

## 📋 Common Issues & Fixes

### **Issue 1: "auth is not defined"**
**Cause:** Firebase not initialized
**Fix:** Check console for initialization errors

### **Issue 2: Environment variables showing as undefined**
**Cause:** Server not restarted after editing `.env.local`
**Fix:** Restart `npm run dev`

### **Issue 3: Works in dev, fails in production**
**Cause:** Environment variables not set in Vercel
**Fix:** Add variables in Vercel Dashboard → Settings → Environment Variables

### **Issue 4: CORS error**
**Cause:** Backend blocking requests
**Fix:** Check backend logs, verify CORS enabled

### **Issue 5: Google login popup blocked**
**Cause:** Browser blocking popups
**Fix:** Allow popups for `localhost:3000`

---

## 🎯 Step-by-Step Troubleshooting

### **Start Here:**

1. ✅ **Check .env.local exists and has values**
   ```powershell
   cat .env.local
   ```

2. ✅ **Restart dev server**
   ```powershell
   npm run dev
   ```

3. ✅ **Open browser console (F12)**
   - Look for "✅ Firebase initialized successfully"
   - Or red errors

4. ✅ **Try signup again**
   - Fill email: `test@example.com`
   - Password: `test123456`
   - Click Sign Up

5. ✅ **Check console for new errors**
   - Firebase errors (red)
   - Network errors
   - Backend API errors

---

## 📞 Still Not Working?

### **Collect This Info:**

1. **Browser Console Output**
   - All red errors
   - All yellow warnings
   - Screenshot if possible

2. **Terminal Output**
   - Dev server logs
   - Any error messages

3. **Environment Check**
   ```powershell
   # Run this and share output:
   cd d:\Project\PKMGlyra-Website
   echo "=== Env File Exists? ==="
   ls .env.local
   echo ""
   echo "=== First 3 lines of .env.local ==="
   Get-Content .env.local | Select-Object -First 3
   ```

4. **Network Tab**
   - Browser DevTools → Network
   - Filter: Fetch/XHR
   - Look for failed requests

---

## ✅ Success Indicators

You'll know it's working when you see:

### **Browser Console:**
```
✅ Firebase initialized successfully
```

### **Signup Form:**
- No error message shows
- Redirects to `/identity` page
- Can fill profile form

### **Firebase Console:**
- New user appears in Authentication
- User data in Firestore `users` collection

---

## 🔄 Fresh Start (Last Resort)

If nothing works, try complete reset:

```powershell
# 1. Stop dev server (Ctrl+C)

# 2. Clear Next.js cache
cd d:\Project\PKMGlyra-Website
Remove-Item -Recurse -Force .next

# 3. Clear node modules (optional, takes time)
Remove-Item -Recurse -Force node_modules
npm install

# 4. Verify .env.local
cat .env.local

# 5. Restart dev server
npm run dev

# 6. Clear browser cache (Ctrl+Shift+Delete)

# 7. Open in incognito (Ctrl+Shift+N)
# Navigate to http://localhost:3000/signup
```

---

**Last Updated:** October 20, 2025  
**Status:** Active Debugging Guide
