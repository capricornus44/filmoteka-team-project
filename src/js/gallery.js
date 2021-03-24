import cardMurkup from '../templates/filmGallery.hbs';
import ApiService, { genres } from './servise/api';
import refs from './references';

const apiService = new ApiService();

export default async function startPage() {
  await apiService.fetchGenre();

  fetchFilmography();
}

const searchMove = document.querySelector('#header-search-form');

searchMove.addEventListener('submit', onSearch);

// ============================= Filmography rendering by request =============================
function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.searchQuery = form.elements.query.value;

  clearFilmography();

  apiService.resetPage();

  if (
    apiService.searchQuery === '' ||
    apiService.searchQuery.trim().length === 0
  ) {
    // refs.errorRequest.innerHTML =
    //   'Search result not successful. Enter the correct movie name and repeat';
    // return;
  }

  fetchFilmography();

  printFilmography(movies);
}

async function fetchFilmography() {
  const movies = await apiService.fetch(apiService.searchQuery);
  printFilmography(movies);
}

function clearFilmography() {
  refs.gallery.innerHTML = '';
}

export function printFilmography(movies) {
  refs.gallery.innerHTML = cardMurkup(movies);
}
