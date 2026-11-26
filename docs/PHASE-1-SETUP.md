# Phase 1 setup checklist

## Local development
- [ ] Install Node.js 20.19+ and npm.
- [ ] Install frontend dependencies (`cd frontend && npm install`).
- [ ] Create Firebase project and register a Web App.
- [ ] Fill `frontend/.env.local` using `frontend/.env.example`.
- [ ] Run `npm run dev` and confirm the app opens.
- [ ] Run `npm run build` and confirm `frontend/dist` is created.

## Firebase
- [ ] Enable Email/Password Authentication.
- [ ] Create Firestore database in the selected region.
- [ ] Enable Storage.
- [ ] Install Firebase CLI and run `firebase login`.
- [ ] Copy `.firebaserc.example` to `.firebaserc`; set the actual project ID.
- [ ] Run `firebase emulators:start`.
- [ ] Keep default-deny rules until tested tenant rules are ready.

## GitHub and Vercel
- [ ] Create a new GitHub repository named `taleemi-duniya-pro`.
- [ ] Push this starter project to the repository.
- [ ] Import the repository into Vercel.
- [ ] Set Vercel Root Directory to `frontend`.
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add all required `VITE_FIREBASE_*` environment variables in Vercel.
- [ ] Deploy and verify the production URL.

## Exit criteria
- [ ] Frontend runs locally.
- [ ] Production build succeeds.
- [ ] Vercel deployment succeeds.
- [ ] Firebase config loads without exposing server secrets.
- [ ] Firestore and Storage deny unauthorised client access by default.
