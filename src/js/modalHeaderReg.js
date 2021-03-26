import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import authModal from '../templates/modalHeadReg.hbs';

const openModBtnHeader = document.querySelector('#buttonModHeader');

openModBtnHeader.addEventListener('click', onBtn);

function onBtn(event) {
  event.preventDefault();
  basicLightbox
    .create(authModal(), {
      onClose: () => document.body.removeAttribute('style'),
    })
    .show();
  document.body.setAttribute('style', 'overflow:hidden');
}
