import { onCall, HttpsError } from 'firebase-functions/v2/https'
import { initializeApp } from 'firebase-admin/app'

initializeApp()

// Phase 1 connectivity check only. No privileged data operation is exposed yet.
export const healthCheck = onCall(() => {
  if (!process.env.GCLOUD_PROJECT) {
    throw new HttpsError('failed-precondition', 'Firebase project context is unavailable.')
  }
  return {
    ok: true,
    service: 'taleemi-duniya-pro-functions',
    timestamp: new Date().toISOString(),
  }
})
