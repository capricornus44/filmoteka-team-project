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

  apiService
    .fetchMovieById(movieId)
    .then(movie => basicLightbox.create(modalCardTpl(movie)).show());
}
