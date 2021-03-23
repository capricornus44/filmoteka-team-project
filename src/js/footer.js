import footerTpl from '../templates/footer.hbs';
import refs from './references';

// const footer = document.querySelector('footer .container');

export default function footerMkp() {
  refs.footer.insertAdjacentHTML('beforeend', footerTpl());
}
// footerMkp();
