# Architecture overview

## Tenant boundary
The canonical school data path is:
`schools/{schoolId}/{collection}/{documentId}`

Membership is planned at:
`schools/{schoolId}/members/{uid}`

A user may belong to more than one school. The active school context in the UI is
a convenience only; Security Rules and trusted Functions must independently
validate membership and role for every request.

## Platform collections (planned)
- `users/{uid}`
- `schools/{schoolId}`
- `plans/{planId}`
- `subscriptions/{subscriptionId}`
- `platformPayments/{paymentId}`

## School collections (planned)
- `members`, `branches`, `academicYears`, `classes`, `sections`
- `students`, `guardians`, `staff`, `subjects`
- `attendance`, `timetable`, `feeStructures`, `invoices`, `payments`
- `expenses`, `exams`, `marks`, `reportCards`, `homework`
- `announcements`, `notifications`, `libraryBooks`, `libraryTransactions`
- `transportRoutes`, `assets`, `auditLogs`, `settings`

## Offline strategy (later phase)
Firestore web persistence can cache documents locally, but it is not a complete
offline workflow by itself. Phase 7 will add an explicit, idempotent outbox for
business operations, conflict handling, retry policy, and pending/confirmed UI
states. Never show an offline fee collection as a server-confirmed payment.
