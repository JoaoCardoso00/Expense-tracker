// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, initializeAuth, getReactNativePersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBe1gLZASK6rcxaGCMunSafsdWMAUPU4JQ",
	authDomain: "controle-gastos-a1844.firebaseapp.com",
	projectId: "controle-gastos-a1844",
	storageBucket: "controle-gastos-a1844.appspot.com",
	messagingSenderId: "89374774905",
	appId: "1:89374774905:web:4684b8a7f73fda8d20e6a8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

// Auth providers
export const googleProvider = new GoogleAuthProvider();
