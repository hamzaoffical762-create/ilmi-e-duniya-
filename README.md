# Taleemi Duniya Pro

A multi-school SaaS school-management platform. Phase 1 foundation:
- React + Vite + TypeScript frontend
- Firebase Authentication / Firestore / Storage / Cloud Functions
- Vercel frontend deployment
- Firebase Emulator Suite configuration
- English-only UI foundation

## Prerequisites
- Node.js 20.19+ (or a compatible newer LTS)
- npm
- Firebase CLI (`npm install -g firebase-tools`)
- A Firebase project
- Git and a GitHub account

## Repository layout
```text
taleemi-duniya-pro/
├── frontend/                 # React application deployed to Vercel
├── functions/                # Trusted server-side Firebase Functions
├── docs/                     # Architecture and setup notes
├── firestore.rules
├── firestore.indexes.json
├── storage.rules
├── firebase.json
├── .firebaserc.example
└── .env.example
```

## 1. Install dependencies
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Set the Firebase web-app values in `frontend/.env.local`. Do not commit `.env.local`.

## 2. Configure Firebase
1. Create a Firebase project in the Firebase console.
2. Register a Web App and copy its configuration into `frontend/.env.local`.
3. Enable Authentication providers you intend to support (Email/Password is the initial choice).
4. Create a Cloud Firestore database.
5. Enable Firebase Storage.
6. Install and sign in to Firebase CLI:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
7. Copy `.firebaserc.example` to `.firebaserc` and replace the project ID.
8. From the repository root:
   ```bash
   npm install --prefix functions
   firebase emulators:start
   ```

The current Firestore and Storage rules intentionally deny client access until the
membership model and per-module validation are implemented and tested. Do not
loosen them to `allow read, write: if true`.

## 3. Deploy Firebase resources
After reviewing rules and configuring the project:
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
firebase deploy --only functions
```

## 4. Deploy frontend to Vercel
- Import this GitHub repository into Vercel.
- Set Root Directory to `frontend`.
- Build command: `npm run build`
- Output directory: `dist`
- Add the same `VITE_FIREBASE_*` variables used locally.
- Deploy.

The included `frontend/vercel.json` provides SPA route fallback.

## Security notes
- Firebase web config is public project metadata, not a server secret. Protect data
  with Security Rules, App Check, Auth, and server-side authorization.
- Never put Firebase Admin credentials, payment secrets, or private API keys in
  frontend environment variables.
- Custom claims must only be assigned by trusted Admin SDK code.
- Cloud Functions using Admin SDK must independently validate the caller, tenant,
  role, subscription state, and requested fields because Admin SDK bypasses rules.
- Keep financial writes server-side and append-only; use reversal/adjustment records.
- Before production, add automated rules tests using `@firebase/rules-unit-testing`.

## Current implementation status
This is a Phase 1 starter foundation, not a production-ready school system yet.
Authentication screens, tenant onboarding, billing, role permissions, and offline
write-queue behavior are planned for later phases.
"# taleemi-duniya-pro" 
