import footerTpl from '../templates/footer.hbs';
import refs from './references';
import like from '../images/sprite.svg';

export default function footerMkp() {
  refs.footer.insertAdjacentHTML('beforeend', footerTpl(like));
}
