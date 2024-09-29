// backend/src/utils/firebase.ts
import admin from 'firebase-admin';

// Parses the Firebase service account JSON from the environment variable
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT || '{}'
);

// Initializes the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Gets a reference to the Firestore database
const db = admin.firestore();

export { db };

// Setup Instructions:

// Create a Firebase Project:

// Go to Firebase Console and create a new project.
// Create a Firestore Database:

// Navigate to Firestore Database and create a database in test mode for development.
// Generate Service Account Key:

// Go to Project Settings > Service Accounts > Generate New Private Key.
// Download the JSON file and securely store its contents.
// Set Environment Variable:

// When deploying, set the FIREBASE_SERVICE_ACCOUNT environment variable with the content of the service account JSON.