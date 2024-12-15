import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Updated imports
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_t8V9VnGEOzPZMO-bhNU7Ql-144d04gc",
  authDomain: "beta-jdt-poly-connect.firebaseapp.com",
  projectId: "beta-jdt-poly-connect",
  storageBucket: "beta-jdt-poly-connect.firebasestorage.app",
  messagingSenderId: "598002344540",
  appId: "1:598002344540:web:1c43cdd017ad98cd7b7c99",
  measurementId: "G-H4BNDHV5BF"
};

// Initialize Firebase only if it's not already initialized
let app;
if (firebase.apps.length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // Use the default app if it's already initialized
}

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
