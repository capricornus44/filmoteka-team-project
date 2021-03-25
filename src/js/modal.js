import modalCardTpl from '../templates/modalCard.hbs';

import ApiService from './servise/api';
import refs from './references';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

let btnToWatched = null;
let btnToQueue = null;

const apiService = new ApiService();

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
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

    btnToWatched = document.querySelector('#watched_modal');
    btnToQueue = document.querySelector('#queue_modal');

    btnToWatched.addEventListener('click', addToWatched);
    btnToQueue.addEventListener('click', addToQueue);

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
  });
  document.body.setAttribute('style', 'overflow:hidden');

  function addToWatched() {
    btnToWatched.textContent = 'Remove from Watched';
    btnToWatched.classList.toggle('btn-is-active');
    let arrFilmsToWatch = JSON.parse(localStorage.getItem('watchedList')) || [];
    const obj = JSON.parse(localStorage.getItem('currentFilm'));
    if (arrFilmsToWatch.find(e => e.id === obj.id)) {
      arrFilmsToWatch = arrFilmsToWatch.filter(movie => movie.id !== obj.id);
      btnToWatched.textContent = 'add to Watched';
    } else {
      arrFilmsToWatch.push(obj);
    }
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
}
