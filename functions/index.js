const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();

// CORS 설정
app.use(cors({ origin: true }));

// 라우터 설정
const userRoutes = require('./routes/user');
app.use('/api/user', userRoutes);

// Firebase Function으로 export
exports.api = functions.https.onRequest(app);
