import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBsgb2jMkgc32CtcYWAjYcYW_WmPc0eXBs',
  authDomain: 'filmoteka-project-b4dd3.firebaseapp.com',
  projectId: 'filmoteka-project-b4dd3',
  storageBucket: 'filmoteka-project-b4dd3.appspot.com',
  messagingSenderId: '337286130164',
  appId: '1:337286130164:web:d579628c42e3fe5f9531a1',
  measurementId: 'G-SEGN7D813G',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signupWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    const userNow = await firebase.auth().currentUser;
    console.log('Создан юзер с ID ', userNow.uid);
    return user;
  } catch (error) {
    console.log('это эрор', error);
  }
};

export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const userNow = await firebase.auth().currentUser;
    console.log('В систему зашел юзер с ID ', userNow.uid);
    return user;
  } catch (error) {
    console.log('это эррор юзера нет', error);
  }
};

export const signOut = async () => {
  const userNow = await firebase.auth().currentUser;
  await firebase.auth().signOut();
  const userNow1 = await firebase.auth().currentUser;

  console.log('вышел юзер с ID ', userNow.uid, 'Текущий юзер ', userNow1);
};
