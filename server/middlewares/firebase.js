const admin = require('firebase-admin');

const serviceAccount = require('../../serviceAccountKey.json');

const firebaseSDK = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vroom-server.firebaseio.com/'
});

module.exports = {
  firebaseSDK
};
