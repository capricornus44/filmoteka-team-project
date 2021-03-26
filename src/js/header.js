import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
import pagination from './pagination';
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

import { getWatched } from '../firebase/auth';

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
  pagination.reset();
}

function openLibraryWatched() {
  changeHeaderLibrary();
  openWatchedFilms();
}

async function openWatchedFilms() {
  const filmList = await getWatched(); //получение данных из базы
  shouWatchedHeader();
  clearFilmography();
  const data = JSON.parse(localStorage.getItem('watchedList'));
  printFilmography(filmList);
  if (!data.length) {
    createMarkupLibrary();
    return;
  }
  pagination.reset(data.length);
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
  pagination.reset(data.length);
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
