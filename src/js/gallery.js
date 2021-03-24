import cardMurkup from '../templates/filmGallery.hbs';
import ApiService, { genres } from './servise/api';
import refs from './references';

const apiService = new ApiService();

export default async function startPage() {
  await apiService.fetchGenre();

  fetchFilmography();
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

  printFilmography(movies);
}

async function fetchFilmography() {
  const movies = await apiService.fetch();
  printFilmography(movies);
}

function clearFilmography() {
  refs.gallery.innerHTML = '';
}

export function printFilmography(movies) {
  console.log(movies);
  refs.gallery.innerHTML = cardMurkup(movies);
}
