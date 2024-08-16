// Import Firebase Auth
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'; // Firebase App import

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwswtPvBIt5V6fAy4FcHzOiS2ZaK2dxCg",
    authDomain: "swcontest-e2cf1.firebaseapp.com",
    projectId: "swcontest-e2cf1",
    storageBucket: "swcontest-e2cf1.appspot.com",
    messagingSenderId: "709771669514",
    appId: "1:709771669514:web:e758e2882414c626a6eff3",
    measurementId: "G-7H81QEC5S6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const container = document.querySelector('.container');

    onAuthStateChanged(auth, (user) => {
        console.log(user);
        if (user) {
            // 로그인 상태일 때
            loginForm.style.display = 'none'; // 로그인 폼 숨기기
            container.addEventListener('click', () => {
                window.location.href = '../pages/inventory.html';
            });
        } else {
            // 로그아웃 상태일 때
            loginForm.style.display = 'block'; // 로그인 폼 보이기
            container.removeEventListener('click', () => {
                window.location.href = '../pages/inventory.html';
            });
        }
    });
});
