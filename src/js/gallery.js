import cardMurkup from '../templates/filmGallery.hbs';
import { apiService, genres } from './servise/api';
import refs from './references';
import pagination from './pagination';

// const apiService = new ApiService();

export default async function startPage() {
  await apiService.fetchGenre();
  fetchFilmography();
}

// ============================= Filmography rendering by request =============================
export async function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  apiService.query = form.elements.query.value;
  // form.elements.query.value = '';

  clearFilmography();

  apiService.resetPage();

  if (apiService.query === '' || apiService.query.trim().length === 0) {
    return;
  }

  fetchFilmography();
}

export async function fetchFilmography() {
  console.log(fetchFilmography);
  const movies = await apiService.fetch(apiService.query);
  printFilmography(movies.results);
  pagination.reset(movies.total_results);
}

export function clearFilmography() {
  refs.gallery.innerHTML = '';
}

export function printFilmography(movies) {
  refs.gallery.innerHTML = cardMurkup(movies);
}
