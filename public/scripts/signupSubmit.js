import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';

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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 회원가입 처리
document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('joinForm');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const name = document.getElementById('name').value;
    const email = document.getElementById('id').value;
    const password = document.getElementById('password').value;

    try {
      // Firebase에 사용자 등록
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('회원가입 성공:', user);

      // 회원가입 후 사용자 정보 처리 (예: DB에 사용자 이름 저장)
      // 여기서 Firestore 또는 다른 DB에 사용자 정보를 추가할 수 있습니다.

      // 회원가입 성공 후 리디렉션
      window.location.href = '../pages/home.html';
    } catch (error) {
      console.error('회원가입 실패:', error.code, error.message);
      document.querySelector('.message').textContent = '회원가입에 실패했습니다. 다시 시도해 주세요.';
    }
  });
});
