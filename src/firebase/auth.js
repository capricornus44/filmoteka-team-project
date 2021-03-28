import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import { welcomeUser } from '../js/header';

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

//Текущий юзер
export const currentlyUser = {
  id: '',
  name: 'незнакомец',
  watchedListBase: [],
  queueListBaze: [],
};

// регистрация юзера
export const signupWithEmailAndPassword = async (email, password, name) => {
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return user;
  } catch (error) {
    console.log('это эрор', error);
  }

  currentlyUser.id = await firebase.auth().currentUser.uid;
  console.log('Создан юзер с ID ', currentlyUserID);

  localStorage.setItem('currentlyUser', currentlyUser.id);
  await firebase.database().ref(`/users/${currentlyUser.id}/info`).set({
    name,
  });
};

// вход юзера
export const signinWithEmailAndPassword = async (email, password) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    currentlyUser.id = await firebase.auth().currentUser.uid;

    console.log('В систему зашел юзер с ID ', currentlyUser.id);

    localStorage.setItem('currentlyUser', currentlyUser.id);

    try {
      currentlyUser.watchedListBase = await getWatched();
    } catch (err) {
      currentlyUser.watchedListBase = [];
    }
    try {
      currentlyUser.queueListBaze = await getQueue();
    } catch (err) {
      currentlyUser.queueListBaze = [];
    }
    currentlyUser.name = await getName();

    welcomeUser(currentlyUser.name);

    return user;
  } catch (error) {
    console.log('это эррор юзера нет', error);
  }
};

// выход юзера
export const signOut = async () => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  await firebase.auth().signOut();

  console.log('вышел юзер с ID ', currentlyUser.id);
  localStorage.setItem('currentlyUser', '');
  currentlyUser.id = '';
  return;
};

// получение имени юзера
export const getName = async () => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  const name = await (
    await firebase
      .database()
      .ref(`/users/${currentlyUser.id}/info`)
      .once('value')
  ).val();

  return name;
};

// добавление фильма в базу данных
export const setNewFilmIntoBaze = async (data, address) => {
  currentlyUser.id = await firebase.auth().currentUser.uid;

  //добавление фильма
  await firebase
    .database()
    .ref(`/users/${currentlyUser.id}/${address}`)
    .push({ data });

  console.log('дошел без ошибок');
};

// получение списка фильмов из базы
export const getWatched = async () => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  let filmList = [];
  const watched = await (
    await firebase
      .database()
      .ref(`/users/${currentlyUser.id}/watchedList`)
      .once('value')
  ).val();

  const i = Object.values(watched).forEach(q => {
    filmList.push(...Object.values(q));
  });

  return filmList;
};

export const getQueue = async () => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  let filmList = [];
  const queue = await (
    await firebase
      .database()
      .ref(`/users/${currentlyUser.id}/queueList`)
      .once('value')
  ).val();

  Object.values(queue).forEach(q => {
    filmList.push(...Object.values(q));
  });

  return filmList;
};

// поиск фильма в базе
export const searchIdInBazeWatchedList = async (searchId, address) => {
  currentlyUser.id = await firebase.auth().currentUser.uid;

  const watched = await (
    await firebase
      .database()
      .ref(`/users/${currentlyUser.id}/watchedList`)
      .once('value')
  ).val();

  const index = Object.values(watched).findIndex(
    item => item.data.id === searchId,
  );

  const indexInBaze = Object.keys(watched)[index];
  console.log(indexInBaze);
  return indexInBaze;
};

export const searchIdInBazeQueueList = async (searchId, address) => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  const watched = await (
    await firebase
      .database()
      .ref(`/users/${currentlyUser.id}/queueList`)
      .once('value')
  ).val();

  const index = Object.values(watched).findIndex(
    item => item.data.id === searchId,
  );

  const indexInBaze = Object.keys(watched)[index];
  console.log(indexInBaze);
  return indexInBaze;
};

// удаление фильма из базы данных
export const remuveWatched = async (searchId, address) => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  let deletedIndex = '';

  deletedIndex = await searchIdInBazeWatchedList(searchId, address);

  await firebase
    .database()
    .ref(`/users/${currentlyUser.id}/${address}`)
    .child(deletedIndex)
    .remove();
  console.log(deletedIndex, 'удален');
};

export const remuveQueue = async (searchId, address) => {
  currentlyUser.id = await firebase.auth().currentUser.uid;
  let deletedIndex = '';

  deletedIndex = await searchIdInBazeQueueList(searchId, address);

  await firebase
    .database()
    .ref(`/users/${currentlyUser.id}/${address}`)
    .child(deletedIndex)
    .remove();
  console.log(deletedIndex, 'удален');
};
