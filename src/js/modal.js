import modalCardTpl from '../templates/modalCard.hbs';

import { apiService } from './servise/api';
import refs from './references';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import onPlayTrailerModal from './trailer';

import {
  searchIdInBaze,
  setNewFilmIntoBaze,
  remuveWatched,
  currentlyUser,
} from '../firebase/auth';

let btnToWatched = null;
let btnToQueue = null;

// const apiService = new ApiService();

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (
    event.target === event.currentTarget ||
    event.target.className === 'watch-trailer-btn'
  ) {
    return;
  }

  const movieId = event.target.closest('li').dataset.id;

  const dataLocalWatched = JSON.parse(localStorage.getItem('watchedList'));

  const dataLocalQueue = JSON.parse(localStorage.getItem('queueList'));

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
    btnToQueue.addEventListener('click', addToQueue);

    if (currentlyUser.id) {
      const moviesWatched = currentlyUser.watchedListBaze;
      console.log('moviesWatched', moviesWatched);

      moviesWatched.forEach(movie => {
        if (movie.id === movieId) {
          btnToWatched.textContent = 'Remove from Watched';
          // btnToWatched.classList.add('btn-is-active');
          return false;
        }
      });

      const moviesQueue = currentlyUser.queueListBaze;
      console.log('moviesQueue', moviesQueue);

      moviesQueue.forEach(movie => {
        if (movie.id === movieId) {
          btnToWatched.textContent = 'Remove from Watched';
          // btnToWatched.classList.add('btn-is-active');
          return false;
        }
      });
    } else {
      dataLocalWatched.forEach(movie => {
        if (movie.id === movieId) {
          btnToWatched.textContent = 'Remove from Watched';
          btnToWatched.classList.add('btn-is-active');
          return false;
        }
      });

      dataLocalQueue.forEach(movie => {
        if (movie.id === movieId) {
          btnToQueue.textContent = 'remove from queue';
          btnToQueue.classList.add('btn-is-active');
          return false;
        }
      });
    }
  });

  document.body.setAttribute('style', 'overflow:hidden');

  async function changeWatchedTotal() {
    const obj = JSON.parse(localStorage.getItem('currentFilm'));
    let arrFilmsToWatch = JSON.parse(localStorage.getItem('watchedList')) || [];

    const searchId = obj.id;
    if (currentlyUser.id) {
      console.log('юзер есть ');

      if (await searchIdInBaze(searchId, 'watchedList')) {
        console.log('фильм есть в базе');
        btnToWatched.textContent = 'add to Watched';
        remuveWatched(searchId, 'watchedList');
        if (arrFilmsToWatch.find(e => e.id === obj.id))
          remuveFromWatched(arrFilmsToWatch, obj);
      } else {
        console.log('фильма в базе нет');
        btnToWatched.textContent = 'Remove from Watched';
        await setNewFilmIntoBaze(obj, 'watchedList');
        if (!arrFilmsToWatch.find(e => e.id === obj.id))
          addToWatched(arrFilmsToWatch, obj);
      }

      // const qqq = await searchIdInBaze(searchId);
      // console.log(qqq);
    } else {
      console.log('нет');
      changeWatchedLocal(arrFilmsToWatch, obj);
    }
  }

  function changeWatchedLocal(arrFilmsToWatch, obj) {
    btnToWatched.classList.remove('btn-is-active');

    console.log(arrFilmsToWatch);
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
  }

  function remuveFromWatched(arrFilmsToWatch, obj) {
    arrFilmsToWatch = arrFilmsToWatch.filter(movie => movie.id !== obj.id);
    btnToWatched.textContent = 'add to Watched';
    localStorage.setItem('watchedList', JSON.stringify(arrFilmsToWatch));
  }

  function addToQueue() {
    btnToQueue.textContent = 'remove from queue';
    btnToQueue.classList.toggle('btn-is-active');
    let arrFilmsToQueue = JSON.parse(localStorage.getItem('queueList')) || [];
    const obj = JSON.parse(localStorage.getItem('currentFilm'));
    if (arrFilmsToQueue.find(e => e.id === obj.id)) {
      arrFilmsToQueue = arrFilmsToQueue.filter(movie => movie.id !== obj.id);
      btnToQueue.textContent = 'add to queue';
    } else {
      arrFilmsToQueue.push(obj);
    }
    localStorage.setItem('queueList', JSON.stringify(arrFilmsToQueue));
  }

  // function addToWatched() {
  //   btnToWatched.textContent = 'Remove from Watched';
  //   btnToWatched.classList.toggle('btn-is-active');
}
