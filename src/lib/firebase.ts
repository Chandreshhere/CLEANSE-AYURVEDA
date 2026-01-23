import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC4EtelHWjC_Uk0dBOXuuAhlwryxM6-TSU",
  authDomain: "cleanse-ayurveda.firebaseapp.com",
  projectId: "cleanse-ayurveda",
  storageBucket: "cleanse-ayurveda.firebasestorage.app",
  messagingSenderId: "668838258038",
  appId: "1:668838258038:web:16ef26058175f4cba28657"
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
export type { ConfirmationResult };
