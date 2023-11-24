import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjHNVMDkS85hT8q7TxUewYwjSrdQYXurI",
  authDomain: "expensetracker-54a2d.firebaseapp.com",
  projectId: "expensetracker-54a2d",
  storageBucket: "expensetracker-54a2d.appspot.com",
  messagingSenderId: "499814271861",
  appId: "1:499814271861:web:5e9d5762961c9d1577613c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Export auth and the auth methods
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
