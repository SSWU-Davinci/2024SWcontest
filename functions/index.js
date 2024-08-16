const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // CORS 설정

admin.initializeApp();

exports.checkId = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const id = req.body.id;

    if (!id) {
      return res.status(400).send({ error: 'ID is required' });
    }

    try {
      const snapshot = await admin.firestore().collection('users').where('id', '==', id).get();

      if (snapshot.empty) {
        return res.status(200).send({ exists: false });
      } else {
        return res.status(200).send({ exists: true });
      }
    } catch (error) {
      console.error('Error checking ID:', error);
      return res.status(500).send({ error: 'Internal server error' });
    }
  });
});
