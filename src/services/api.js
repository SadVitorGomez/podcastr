var admin = require('firebase-admin');
const serviceAccount = require('../../main.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  admin.app(); // if already initialized, use that one
}
const db = admin.firestore();

export default db;
