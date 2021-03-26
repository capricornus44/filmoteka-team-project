import ApiService from './servise/api';
import refs from './references';
import { API_KEY } from './servise/api';
import { BASE_URL } from './servise/api';
import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';

const apiService = new ApiService();

function fetchTrailerFilm(movieId) {
  return fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
    .then(response => response.json())
    .then(videos => {
      const trailerKey = videos.results[0].key;
      const trailer = basicLightbox
        .create(
          `
  <iframe width="1000" height="600" src='https://www.youtube.com/embed/${trailerKey}'frameborder="0" allowfullscreen class="trailer"></iframe>
`,
        )
        .show();
    })
    .catch(error => {
      const trailerNotFound = basicLightbox
        .create(
          `
  <img width="1000" height="600" src="https://hsto.org/webt/un/y2/nu/uny2nux8h1_fmgig2g-odesccse.jpeg" alt="trailer not found" class="trailer">
`,
        )
        .show();
    });
}

refs.gallery.addEventListener('click', onPlayTrailer);

function onPlayTrailer(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }

  const movieId = event.target.closest('li').dataset.id;

  if (event.target.className === 'watch-trailer-btn') {
    fetchTrailerFilm(movieId);
  }
  return;
}
