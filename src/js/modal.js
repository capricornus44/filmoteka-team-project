import modalCardTpl from '../templates/modalCard.hbs';

import { apiService } from './servise/api';
import refs from './references';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import onPlayTrailerModal from './trailer';
import { printFilmography } from './gallery';
import { createMarkupLibrary } from './header';

import {
  setNewFilmIntoBaze,
  remuveWatched,
  remuveQueue,
  currentlyUser,
} from '../firebase/auth';

let btnToWatched = null;
let btnToQueue = null;

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (
    event.target === event.currentTarget ||
    event.target.className === 'watch-trailer-btn'
  )
    return;

  const movieId = event.target.closest('li').dataset.id;

  let dataLocalWatched = [];

  let dataLocalQueue = [];

  let data = event.target.parentNode.parentNode;

  let objCurrentFilm = {
    id: movieId,
    original_title: data.dataset.title,
    poster_path: data.dataset.poster,
    genres: data.dataset.genres,
    release_date: data.dataset.date,
    vote_average: data.dataset.rating,
  };

  localStorage.setItem('currentFilm', JSON.stringify(objCurrentFilm));

  apiService.fetchMovieById(movieId).then(movie => {
    basicLightbox
      .create(modalCardTpl(movie), {
        onClose: () => document.body.removeAttribute('style'),
      })
      .show();

    const modalBtnTrailer = document.querySelector('.watch-trailer-btn-modal');
    modalBtnTrailer.addEventListener('click', onPlayTrailerModal);

    btnToWatched = document.querySelector('#watched_modal');
    btnToQueue = document.querySelector('#queue_modal');

    btnToWatched.addEventListener('click', changeWatchedTotal);
    btnToQueue.addEventListener('click', changeQueueTotal);

    // обновление классов при открытии
    if (currentlyUser.id) {
      console.log('идем в модалку зарегистрированного юзера');

      openModalRegisterUser();
    } else {
      console.log('идем в модалку просто юзера');
      openModalWithoutUser();
    }

    async function changeWatchedTotal() {
      const obj = JSON.parse(localStorage.getItem('currentFilm'));

      let arrFilmsToWatch =
        JSON.parse(localStorage.getItem('watchedList')) || [];

      btnToWatched.classList.toggle('btn-is-active');

      const searchId = obj.id;

      if (currentlyUser.id) {
        if (currentlyUser.watchedListBase.find(e => e.id === obj.id)) {
          remuveFromWatchedInBaze(searchId);

          if (arrFilmsToWatch.find(e => e.id === obj.id))
            remuveFromWatched(arrFilmsToWatch, obj);
        } else {
          addToWatchedInBase(obj);
          if (!arrFilmsToWatch.find(e => e.id === obj.id))
            addToWatched(arrFilmsToWatch, obj);
        }
      } else {
        changeWatchedLocal(arrFilmsToWatch, obj);
      }
    }

    async function changeQueueTotal() {
      const obj = JSON.parse(localStorage.getItem('currentFilm'));

      let arrFilmsToQueue = JSON.parse(localStorage.getItem('queueList')) || [];

      btnToQueue.classList.toggle('btn-is-active');

      const searchId = obj.id;

      if (currentlyUser.id) {
        if (currentlyUser.queueListBaze.find(e => e.id === obj.id)) {
          remuveFromQueueInBaze(searchId);

          if (arrFilmsToQueue.find(e => e.id === obj.id))
            remuveFromQueue(arrFilmsToQueue, obj);
        } else {
          addToQueueInBase(obj);
          if (!arrFilmsToQueue.find(e => e.id === obj.id))
            addToQueue(arrFilmsToQueue, obj);
        }
      } else {
        changeQueueLocal(arrFilmsToQueue, obj);
      }
    }

    // закрытие fetchMovieById
  });

  // вспомогательные фунции

  function openModalRegisterUser() {
    if (currentlyUser.watchedListBase.find(e => e.id === movieId)) {
      btnToWatched.textContent = 'Remove from Watched';
      btnToWatched.classList.add('btn-is-active');
    }

    if (currentlyUser.queueListBaze.find(e => e.id === movieId)) {
      btnToQueue.textContent = 'Remove from Watched';
      btnToQueue.classList.add('btn-is-active');
    }
  }

  function openModalWithoutUser() {
    dataLocalWatched = JSON.parse(localStorage.getItem('watchedList'));

    dataLocalQueue = JSON.parse(localStorage.getItem('queueList'));

    if (dataLocalWatched) {
      dataLocalWatched.forEach(movie => {
        if (movie.id === movieId) {
          btnToWatched.textContent = 'Remove from Watched';
          btnToWatched.classList.add('btn-is-active');
          return false;
        }
      });
    }
    if (dataLocalQueue) {
      dataLocalQueue.forEach(movie => {
        if (movie.id === movieId) {
          btnToQueue.textContent = 'Remove from Queue';
          btnToQueue.classList.add('btn-is-active');
          return false;
        }
      });
    }
  }

  //вспомогательная логика на Watched

  function addToWatchedInBase(obj) {
    btnToWatched.textContent = 'Remove from Watched';
    currentlyUser.watchedListBase.push(obj);
    setNewFilmIntoBaze(obj, 'watchedList');
  }

  async function remuveFromWatchedInBaze(searchId) {
    btnToWatched.textContent = 'Add to Watched';
    await remuveWatched(searchId, 'watchedList');
    currentlyUser.watchedListBase = currentlyUser.watchedListBase.filter(
      movie => movie.id !== searchId,
    );
  }

  function changeWatchedLocal(arrFilmsToWatch, obj) {
    if (!arrFilmsToWatch) arrFilmsToWatch = []; //for what???????

    if (arrFilmsToWatch.find(e => e.id === obj.id)) {
      remuveFromWatched(arrFilmsToWatch, obj);
    } else {
      addToWatched(arrFilmsToWatch, obj);
    }
  }

  function addToWatched(arrFilmsToWatch, obj) {
    arrFilmsToWatch.push(obj);
    btnToWatched.textContent = 'Remove from Watched';
    localStorage.setItem('watchedList', JSON.stringify(arrFilmsToWatch));
    // printFilmography(arrFilmsToWatch);
  }

  function remuveFromWatched(arrFilmsToWatch, obj) {
    arrFilmsToWatch = arrFilmsToWatch.filter(movie => movie.id !== obj.id);
    btnToWatched.textContent = 'Add to Watched';
    localStorage.setItem('watchedList', JSON.stringify(arrFilmsToWatch));
    // printFilmography(arrFilmsToWatch);
    // if (arrFilmsToWatch.length === 0) {
    //   createMarkupLibrary();
    // }
  }

  //вспомогательные функции на queue

  function addToQueueInBase(obj) {
    btnToQueue.textContent = 'Remove from Queue';
    currentlyUser.queueListBaze.push(obj);
    setNewFilmIntoBaze(obj, 'queueList');
  }

  async function remuveFromQueueInBaze(searchId) {
    btnToQueue.textContent = 'Add to Queue';
    await remuveQueue(searchId, 'queueList');
    currentlyUser.queueListBaze = currentlyUser.queueListBaze.filter(
      movie => movie.id !== searchId,
    );
  }

  function changeQueueLocal(arrFilmsToQueue, obj) {
    if (!arrFilmsToQueue) arrFilmsToQueue = [];
    if (arrFilmsToQueue.find(e => e.id === obj.id)) {
      remuveFromQueue(arrFilmsToQueue, obj);
    } else {
      addToQueue(arrFilmsToQueue, obj);
    }
  }

  function addToQueue(arrFilmsToQueue, obj) {
    arrFilmsToQueue.push(obj);
    btnToQueue.textContent = 'Remove from Queue';
    localStorage.setItem('queueList', JSON.stringify(arrFilmsToQueue));
  }

  function remuveFromQueue(arrFilmsToQueue, obj) {
    arrFilmsToQueue = arrFilmsToQueue.filter(movie => movie.id !== obj.id);
    btnToQueue.textContent = 'add to queue';
    localStorage.setItem('queueList', JSON.stringify(arrFilmsToQueue));
  }

  // закрытие глобальной функции
}
