const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyAwswtPvBIt5V6fAy4FcHzOiS2ZaK2dxCg",
  authDomain: "swcontest-e2cf1.firebaseapp.com",
  projectId: "swcontest-e2cf1",
  storageBucket: "swcontest-e2cf1.appspot.com",
  messagingSenderId: "709771669514",
  appId: "1:709771669514:web:e758e2882414c626a6eff3",
  measurementId: "G-7H81QEC5S6",
  databaseURL: "https://swcontest-e2cf1-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

module.exports = app;