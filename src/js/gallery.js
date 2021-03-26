import cardMurkup from '../templates/filmGallery.hbs';
import ApiService, { genres } from './servise/api';
import refs from './references';

const apiService = new ApiService();

export default async function startPage() {
  await apiService.fetchGenre();
  fetchFilmography();
}

// ============================= Filmography rendering by request =============================
export function onSearch(event) {
  event.preventDefault();
  // console.log(event.currentTarget);
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearFilmography();

  apiService.resetPage();

  if (apiService.query === '' || apiService.query.trim().length === 0) {
    // refs.errorRequest.innerHTML =
    //   'Search result not successful. Enter the correct movie name and repeat';
    // return;
  }

  fetchFilmography();

  printFilmography(movies);
}

export async function fetchFilmography() {
  const movies = await apiService.fetch(apiService.query);
  printFilmography(movies.results);
}

export function clearFilmography() {
  refs.gallery.innerHTML = '';
}

export function printFilmography(movies) {
  refs.gallery.innerHTML = cardMurkup(movies);
}
