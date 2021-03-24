import modalCardTpl from '../templates/modalCard.hbs';

import ApiService from './servise/api';
import refs from './references';

import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

const apiService = new ApiService();

refs.gallery.addEventListener('click', onOpenModal);

function onOpenModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  let movieId = '';
  if (event.target.nodeName === 'LI') {
    movieId = event.target.dataset.id;
  } else {
    movieId = event.target.closest('li').dataset.id;
  }

  let data = event.target.parentNode.parentNode;
  console.log(data);

  let objCurrentFilm = {
    id: movieId,
    title: data.dataset.title,
    poster: data.dataset.poster,
    genres: data.dataset.genres,
    date: data.dataset.date,
    rating: data.dataset.rating,
  };

  console.log(objCurrentFilm);

  localStorage.setItem('currentFilm', JSON.stringify(objCurrentFilm));

  apiService.fetchMovieById(movieId).then(movie => {
    basicLightbox
      .create(modalCardTpl(movie), {
        onClose: () => document.body.removeAttribute('style'),
      })
      .show();

    const btnToWatched = document.querySelector('#watched_modal');
    const btnToQueue = document.querySelector('#queue_modal');
    btnToWatched.addEventListener('click', addToWatched);
    btnToQueue.addEventListener('click', addToQueue);
  });
  document.body.setAttribute('style', 'overflow:hidden');

  let arrFilmsToWatch = JSON.parse(localStorage.getItem('watchedList')) || [];

  function addToWatched() {
    const obj = JSON.parse(localStorage.getItem('currentFilm'));
    if (arrFilmsToWatch.find(e => e.title === obj.title)) return;

    arrFilmsToWatch.push(obj);
    localStorage.setItem('watchedList', JSON.stringify(arrFilmsToWatch));
  }

  let arrFilmsToQueue = JSON.parse(localStorage.getItem('queueList')) || [];

  function addToQueue() {
    const obj = JSON.parse(localStorage.getItem('currentFilm'));
    if (arrFilmsToQueue.find(e => e.title === obj.title)) return;

    arrFilmsToQueue.push(obj);
    localStorage.setItem('queueList', JSON.stringify(arrFilmsToQueue));
  }
}
