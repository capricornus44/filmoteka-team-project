import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
import smile from '../images/sorry.png';

import searchCard from '../templates/searchCard.hbs';
import ApiService, { GENRES } from './servise/api';

import refs from './references';
import {
  fetchFilmography,
  clearFilmography,
  printFilmography,
  onSearch,
} from './gallery';

loadStartPage({ headerInfo, logo });

function loadStartPage({ headerInfo, logo }) {
  const headerLayout = headerInfo(logo);
  refs.headerContainer.insertAdjacentHTML('beforeend', headerLayout);
}

// открытие библиотеки и houme
const headerLogo = document.querySelector('#header-logo');
const homeBtn = document.querySelector('#home');
const myLibraryBtn = document.querySelector('#my-library');
const myLibraryNav = document.querySelector('#lbr-buttons');
const searchForm = document.querySelector('.header-search-form');
const searchBlock = document.querySelector('#header-search-form');
const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');
const searchBtn = document.querySelector('#search');

searchForm.addEventListener('submit', onSearch);
headerLogo.addEventListener('click', openHome);
homeBtn.addEventListener('click', openHome);
myLibraryBtn.addEventListener('click', openLibraryWatched);
watchedBtn.addEventListener('click', openWatchedFilms);
queueBtn.addEventListener('click', openQueueFilms);
searchBtn.addEventListener('click', openSearchForm);

function openHome() {
  changeHeaderHome();
  clearFilmography();
  fetchFilmography();
}

function openLibraryWatched() {
  changeHeaderLibrary();
  openWatchedFilms();
}

function openWatchedFilms() {
  shouWatchedHeader();
  clearFilmography();
  const data = JSON.parse(localStorage.getItem('watchedList'));
  if (!data.length) {
    createMarkupLibrary();
    return;
  }

  printFilmography(data);
}

function openQueueFilms() {
  shouQueueHeader();
  clearFilmography();
  const data = JSON.parse(localStorage.getItem('queueList'));
  if (!data.length) {
    createMarkupLibrary();
    return;
  }
  printFilmography(data);
}

function changeHeaderHome() {
  refs.headerBlock.classList.remove('header-lbr');
  refs.headerBlock.classList.add('header-start');
  homeBtn.classList.add('lbr-button-active');
  myLibraryBtn.classList.remove('lbr-button-active');
  myLibraryNav.classList.add('is-hidden');
  myLibraryNav.classList.remove('header-lbr-buttons');
  searchBlock.classList.remove('is-hidden');
}
function changeHeaderLibrary() {
  refs.headerBlock.classList.remove('header-start');
  refs.headerBlock.classList.add('header-lbr');
  homeBtn.classList.remove('lbr-button-active');
  myLibraryBtn.classList.add('lbr-button-active');
  myLibraryNav.classList.remove('is-hidden');
  myLibraryNav.classList.add('header-lbr-buttons');
  searchBlock.classList.add('is-hidden');
}

function shouWatchedHeader() {
  watchedBtn.classList.add('btn-is-active');
  queueBtn.classList.remove('btn-is-active');
}

function shouQueueHeader() {
  watchedBtn.classList.remove('btn-is-active');
  queueBtn.classList.add('btn-is-active');
}

function createMarkupLibrary() {
  const markup = `<div class="library">
      <h3 class="sorry_text">Sorry, you haven't added anything here yet.</h3>
      <img class="sorry_img" src="./${smile}" alt="smile">
      </div>`;
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  // document.querySelector('#pagination').innerHTML = '';
}

// логика на поиска

function openSearchForm(event) {
  event.preventDefault();
  const searchCardLayout = searchCard(GENRES);
  refs.headerContainer.insertAdjacentHTML('beforeend', searchCardLayout);

  const searchFormBtn = document.querySelector('#search-form-btn');
  searchFormBtn.addEventListener('click', searchFilm);
}

function searchFilm(ev) {
  ev.preventDefault();
}

// function loadStartPage({ headerInfo, logo }) {
//   const headerLayout = headerInfo(logo);
//   refs.headerContainer.insertAdjacentHTML('beforeend', headerLayout);
// }

// if (event.target === event.currentTarget) {
//   return;
// }

// const movieId = event.target.closest('li').dataset.id;

// const dataLocalWatched = JSON.parse(localStorage.getItem('watchedList'));

// let data = event.target.parentNode.parentNode;

// let objCurrentFilm = {
//   id: movieId,
//   original_title: data.dataset.title,
//   poster_path: data.dataset.poster,
//   genres: data.dataset.genres,
//   release_date: data.dataset.date,
//   vote_average: data.dataset.rating,
// };

// localStorage.setItem('currentFilm', JSON.stringify(objCurrentFilm));

// apiService.fetchMovieById(movieId).then(movie => {
//   basicLightbox
//     .create(modalCardTpl(movie), {
//       onClose: () => document.body.removeAttribute('style'),
//     })
//     .show();

//   btnToWatched = document.querySelector('#watched_modal');
//   btnToQueue = document.querySelector('#queue_modal');

//   btnToWatched.addEventListener('click', addToWatched);
//   btnToQueue.addEventListener('click', addToQueue);

//   // dataLocalWatched.forEach(movie => {
//   //   if (movie.id === movieId) {
//   //     btnToWatched.textContent = 'Remove';
//   //     console.log(btnToWatched.textContent);
//   //   } else {
//   //     btnToWatched.textContent = 'Add to Watched';
//   //     console.log(btnToWatched.textContent);
//   //   }
//   // });
// });
// document.body.setAttribute('style', 'overflow:hidden');

// function addToWatched() {
//   btnToWatched.textContent = 'Remove';
//   let arrFilmsToWatch = JSON.parse(localStorage.getItem('watchedList')) || [];
//   const obj = JSON.parse(localStorage.getItem('currentFilm'));
//   if (arrFilmsToWatch.find(e => e.id === obj.id)) {
//     arrFilmsToWatch = arrFilmsToWatch.filter(movie => movie.id !== obj.id);
//     btnToWatched.textContent = 'add to Watched';
//   } else {
//     arrFilmsToWatch.push(obj);
//   }
//   localStorage.setItem('watchedList', JSON.stringify(arrFilmsToWatch));
// }

// function addToQueue() {
//   btnToQueue.textContent = 'delete';
//   let arrFilmsToQueue = JSON.parse(localStorage.getItem('queueList')) || [];
//   const obj = JSON.parse(localStorage.getItem('currentFilm'));
//   if (arrFilmsToQueue.find(e => e.id === obj.id)) {
//     arrFilmsToQueue = arrFilmsToQueue.filter(movie => movie.id !== obj.id);
//     btnToQueue.textContent = 'add to queue';
//   } else {
//     arrFilmsToQueue.push(obj);
//   }
//   localStorage.setItem('queueList', JSON.stringify(arrFilmsToQueue));
// }
