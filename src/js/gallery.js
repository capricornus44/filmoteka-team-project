import cardMurkup from '../templates/filmGallery.hbs';

import ApiService, { genres } from './servise/api';
import refs from './references';
// import { genres } from './servise/api';

// refs.form.addEventListener('submit', onSearch);
// refs.homeFilmography.addEventListener('click', onCardClick);

const apiService = new ApiService();

// function renderMarkup() {
//   refs.gallery.insertAdjacentHTML('beforeend', cardMurkup());
// }

// renderMarkup(data);

export default async function startPage() {
  // await fetch genres()
  fetchFilmography();

  //   return apiService
  //     .fetch()
  //     .then(movies => {
  //       printFilmography(movies);
  //     })
  //     .catch(console.log);
}

// ============================= Filmography rendering by request =============================
function onSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearFilmography();

  if (apiService.query === '' || apiService.query.trim().length === 0) {
    refs.errorRequest.innerHTML =
      'Search result not successful. Enter the correct movie name and repeat';

    return;
  }

  apiService.resetPage();

  fetchFilmography();
}

async function fetchFilmography() {
  const movies = await apiService.fetch();
  printFilmography(movies);
}

function clearFilmography() {
  refs.gallery.innerHTML = '';
}

function printFilmography(movies) {
  refs.gallery.insertAdjacentHTML('beforeend', cardMurkup(movies));
}
