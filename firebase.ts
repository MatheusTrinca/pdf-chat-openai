import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyANw4ZqZqs4P9mtkcdbOaxbxnbAITQ2qW8',
  authDomain: 'pdf-chat-openai.firebaseapp.com',
  projectId: 'pdf-chat-openai',
  storageBucket: 'pdf-chat-openai.appspot.com',
  messagingSenderId: '650607771630',
  appId: '1:650607771630:web:cfca373afd657e89fdd8ff',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
