// логика на Header

import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
import refs from './references';

// загрузка страницы

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

homeBtn.addEventListener('click', openHome);
myLibraryBtn.addEventListener('click', openLibrary);
watchedBtn.addEventListener('click', openWatchedFilms);
queueBtn.addEventListener('click', openQueueFilms);

function openHome() {
  changeHeaderHome();
}

function openLibrary() {
  changeHeaderLibrary();
}

function openWatchedFilms() {
  console.log(1);
}
function openQueueFilms() {
  console.log(1);
}

function changeHeaderHome() {
  refs.headerBlock.classList.remove('header-lbr');
  refs.headerBlock.classList.add('header-start');
  myLibraryNav.classList.add('is-hidden');
  searchForm.classList.remove('is-hidden');
}
function changeHeaderLibrary() {
  refs.headerBlock.classList.remove('header-start');
  refs.headerBlock.classList.add('header-lbr');
  myLibraryNav.classList.remove('is-hidden');
  searchForm.classList.add('is-hidden');
}
