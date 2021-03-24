// логика на Header

import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
import { printFilmography, clearFilmography } from './gallery.js';

import refs from './references';

loadStartPage({ headerInfo, logo });

function loadStartPage({ headerInfo, logo }) {
  const headerLayout = headerInfo(logo);
  refs.headerContainer.insertAdjacentHTML('beforeend', headerLayout);
}

// открытие библиотеки и houme
const homeBtn = document.querySelector('#home');
const myLibraryBtn = document.querySelector('#my-library');
const myLibraryNav = document.querySelector('#lbr-buttons');
const searchForm = document.querySelector('#header-search-form');
const watchedBtn = document.querySelector('#watched');
const queueBtn = document.querySelector('#queue');
// console.log(searchForm);

homeBtn.addEventListener('click', openHome);
myLibraryBtn.addEventListener('click', openLibrary);
watchedBtn.addEventListener('click', openWatchedFilms);
queueBtn.addEventListener('click', openQueueFilms);

function openHome() {
  changeHeaderHome();
}

function openLibrary() {
  changeHeaderLibrary();
  shouWatchedHeader();
  clearFilmography();

  const data = JSON.parse(localStorage.getItem('watchedList'));
  printFilmography(data);
}

function openWatchedFilms() {
  shouWatchedHeader();
  console.log(1);
}
function openQueueFilms() {
  shouQueueHeader();

  console.log(1);
}

function changeHeaderHome() {
  refs.headerBlock.classList.remove('header-lbr');
  refs.headerBlock.classList.add('header-start');
  myLibraryNav.classList.add('is-hidden');
  myLibraryNav.classList.remove('header-lbr-buttons');
  searchForm.classList.remove('is-hidden');
}
function changeHeaderLibrary() {
  refs.headerBlock.classList.remove('header-start');
  refs.headerBlock.classList.add('header-lbr');
  myLibraryNav.classList.remove('is-hidden');
  myLibraryNav.classList.add('header-lbr-buttons');
  searchForm.classList.add('is-hidden');
}

function shouWatchedHeader() {
  watchedBtn.classList.add('btn-is-active');
  queueBtn.classList.remove('btn-is-active');
}

function shouQueueHeader() {
  watchedBtn.classList.remove('btn-is-active');
  queueBtn.classList.add('btn-is-active');
}
