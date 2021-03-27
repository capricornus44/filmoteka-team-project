import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
import pagination from './pagination';
import smile from '../images/sorry.png';
import searchCard from '../templates/searchCard.hbs';
import { apiService, GENRES } from './servise/api';

import refs from './references';
import {
  fetchFilmography,
  clearFilmography,
  printFilmography,
  onSearch,
} from './gallery';

import { currentlyUser } from '../firebase/auth';

import { getWatched } from '../firebase/auth';

loadStartPage({ headerInfo, logo });

function loadStartPage({ headerInfo, logo }) {
  const headerLayout = headerInfo(logo);
  refs.headerContainer.insertAdjacentHTML('beforeend', headerLayout);
}

// открытие библиотеки и houme
// ++++
const headerLogo = document.querySelector('#header-logo');
const homeBtn = document.querySelector('#home');
const myLibraryBtn = document.querySelector('#my-library');
const myLibraryNav = document.querySelector('#lbr-buttons');
const watchedBtn = document.querySelector('#watched');

// ----

const searchForm = document.querySelector('.header-search-form');
const searchBlock = document.querySelector('#header-search-form');
const queueBtn = document.querySelector('#queue');
export const errorRequest = document.querySelector('#requst-error');
const input = document.querySelector('.header-search-form-input');
// const searchBtn = document.querySelector('#search');

// ++++
headerLogo.addEventListener('click', openHome);
homeBtn.addEventListener('click', openHome);
myLibraryBtn.addEventListener('click', openLibraryWatched);
watchedBtn.addEventListener('click', openWatchedFilms);
searchForm.addEventListener('submit', onSearch);
input.addEventListener('input', onInput);

// ----

queueBtn.addEventListener('click', openQueueFilms);
// searchBtn.addEventListener('click', openSearchForm);

function openHome() {
  changeHeaderHome();
  clearFilmography();
  apiService.query = '';
  apiService.pageNum = 1;
  searchForm.elements.query.value = '';
  fetchFilmography();
  pagination.reset();
}

function openLibraryWatched() {
  changeHeaderLibrary();
  openWatchedFilms();
}

async function openWatchedFilms() {
  clearFilmography();
  shouWatchedHeader();
  let filmList = [];
  if (currentlyUser.id) {
    filmList = await getWatched(); //получение данных из базы
  } else {
    filmList = JSON.parse(localStorage.getItem('watchedList'));
  }

  printFilmography(filmList);

  if (!filmList.length) {
    createMarkupLibrary();
    return;
  }
  pagination.reset(filmList.length);
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

function searchFilm(ev) {}

function onInput(event) {
  if (event.target) {
    errorRequest.classList.add('is-hidden');
  }
}
