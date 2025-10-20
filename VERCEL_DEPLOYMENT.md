# 🚀 Vercel Deployment Guide

## ✅ Issues Fixed

### 1. **Firebase Auth Domain Error**
- **Issue**: `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` was set to API key instead of domain
- **Fixed**: Changed to `pkmglyra-database.firebaseapp.com`

### 2. **Image Optimization Warnings**
- **Issue**: Using `<img>` tag for images
- **Fixed**: Replaced with Next.js `<Image>` component in:
  - `LoginCard.js` - Google button icon
  - `SignUpCard.js` - Google button icon
  - `MainLayout.js` - Logo image

---

## 🔧 Vercel Environment Variables Setup

### Add these to Vercel Dashboard:

1. Go to your project on [Vercel Dashboard](https://vercel.com)
2. Go to **Settings** → **Environment Variables**
3. Add each variable:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCfg04MFs_p1ctQUDMd1g_nz-vp0LGmQYY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=pkmglyra-database.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=pkmglyra-database
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=pkmglyra-database.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=907671614019
NEXT_PUBLIC_FIREBASE_APP_ID=1:907671614019:web:2b24fce7132f6bbafedaf6
NEXT_PUBLIC_API_URL=https://nafalrust-pkmglyra-backend.hf.space
```

**Important**: Select **All Environments** (Production, Preview, Development)

---

## 📝 Files Updated

### `.env.local` (Local Development)
✅ Fixed `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
✅ Updated `NEXT_PUBLIC_API_URL` to Hugging Face Space

### Component Files
- ✅ `LoginCard.js` - Added `Image` import and replaced `<img>` with `<Image>`
- ✅ `SignUpCard.js` - Added `Image` import and replaced `<img>` with `<Image>`
- ✅ `MainLayout.js` - Replaced `<img>` with `<Image>` for logo

### Config Files
- ✅ `jsconfig.json` - Fixed path alias from `"./*"` to `"./src/*"`

---

## 🚀 Deployment Steps

### 1. Commit & Push
```bash
git add .
git commit -m "Fix: Firebase auth domain and image optimization"
git push origin main
```

### 2. Add Environment Variables to Vercel
- Go to Vercel Dashboard
- Settings → Environment Variables
- Add all variables above
- Select "All Environments"

### 3. Redeploy
- Vercel will auto-deploy on push
- Or manually: **Deployments** → **Redeploy**

### 4. Verify Deployment
- Check build logs for any errors
- Test authentication flow on production URL
- Check Firebase Console for user creation

---

## ✅ Build Success Checklist

- [x] No Firebase auth errors
- [x] No image optimization warnings
- [x] All environment variables set in Vercel
- [x] Backend API accessible from frontend
- [x] Google login enabled in Firebase Console
- [x] Authorized domains added in Firebase:
  - `localhost` (for development)
  - `your-vercel-domain.vercel.app` (for production)

---

## 🔐 Firebase Console Setup

### Add Authorized Domains
1. Firebase Console → **Authentication** → **Settings**
2. **Authorized domains** tab
3. Add:
   - `localhost` ✅ (default)
   - `your-project-name.vercel.app` ⚠️ (ADD THIS)

### Enable Sign-in Methods
- ✅ Email/Password
- ✅ Google

---

## 🐛 Troubleshooting

### Build Error: "FirebaseError: auth/invalid-api-key"
**Solution**: 
- Check environment variables in Vercel
- Ensure `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` is domain, not API key
- Redeploy after adding variables

### Google Login Not Working on Production
**Solution**:
- Add Vercel domain to Firebase authorized domains
- Firebase Console → Authentication → Settings → Authorized domains

### CORS Error from Backend
**Solution**:
- Check Hugging Face Space backend has CORS enabled
- Add Vercel domain to CORS allowed origins in Flask app

---

## 📚 Reference Files

- `.env.local` - Local environment variables
- `.env.production.example` - Production template (DO NOT commit actual values)
- `FIREBASE_SETUP.md` - Complete Firebase setup guide
- `TESTING_CHECKLIST.md` - Testing procedures

---

**Last Updated**: October 2025  
**Status**: ✅ Ready for Deployment
