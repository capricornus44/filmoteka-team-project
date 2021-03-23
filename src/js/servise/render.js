import ApiService from './api';
import refs from './references';

const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.homeFilmography.addEventListener('click', onCardClick);

// ============================= Home page with trending movies =============================
startPage();

async function startPage() {
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
  refs.homeFilmography.innerHTML = '';
}

function printFilmography() {
  refs.homeFilmography.insertAdjacentHTML('beforeend', cardTpl(movies));
}

// ============================ Movie rendering by clicking on a card ===========================
function onCardClick(event) {
  event.preventDefault();

  if (event.target !== 'IMG') {
    return;
  }
}
