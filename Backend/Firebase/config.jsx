import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, inMemoryPersistence, setPersistence, getReactNativePersistence } from 'firebase/auth'; // Updated imports
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAowCog2lUdvUdbcVv24PaJUTdwHMvQJhw",
  authDomain: "jdtpoly-feb88.firebaseapp.com",
  databaseURL: "https://jdtpoly-feb88-default-rtdb.firebaseio.com",
  projectId: "jdtpoly-feb88",
  storageBucket: "jdtpoly-feb88.firebasestorage.app",
  messagingSenderId: "653087325199",
  appId: "1:653087325199:web:e2c87639cf06973abbf77a",
  measurementId: "G-BSF371JB28"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage) // Use AsyncStorage for auth persistence
});

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
