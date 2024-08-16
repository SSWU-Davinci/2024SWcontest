import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

// Firebase 설정 객체
const firebaseConfig = {
    apiKey: "AIzaSyAwswtPvBIt5V6fAy4FcHzOiS2ZaK2dxCg",
    authDomain: "swcontest-e2cf1.firebaseapp.com",
    projectId: "swcontest-e2cf1",
    storageBucket: "swcontest-e2cf1.appspot.com",
    messagingSenderId: "709771669514",
    appId: "1:709771669514:web:e758e2882414c626a6eff3",
    measurementId: "G-7H81QEC5S6"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 이메일 로그인 함수
const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// DOM이 로드된 후 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const email = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await loginEmail(email, password);
      const user = userCredential.user;
      console.log('로그인 성공:', user);
      // 로그인 성공 후 페이지 리디렉션
      window.location.href = '../pages/inventory.html';
    } catch (error) {
      console.error('로그인 실패:', error.code, error.message);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
    }
  });
});
