import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB5XR-93mzsQAUUqGRv1fOM3kXF0CANVMs",
  authDomain: "number-authentication-358f7.firebaseapp.com",
  projectId: "number-authentication-358f7",
  storageBucket: "number-authentication-358f7.firebasestorage.app",
  messagingSenderId: "870580107030",
  appId: "1:870580107030:web:6ce9acbabac886d6aa8237",
  measurementId: "G-XLL9TQZCNG"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  export { auth, RecaptchaVerifier, signInWithPhoneNumber };