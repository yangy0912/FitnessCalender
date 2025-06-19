import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';

const serviceAccount = require('../firebasePrivateKey.json');

initializeApp({
    credential: cert(serviceAccount)
});

export const db = getFirestore()