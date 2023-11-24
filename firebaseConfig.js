// Import the necessary Firebase and AsyncStorage modules
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence } from 'firebase/auth';

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
const auth = getAuth(app);

// Set custom persistence to AsyncStorage
const authPersistence = getReactNativePersistence(AsyncStorage);
setPersistence(auth, authPersistence);

// Export auth and createUserWithEmailAndPassword
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
