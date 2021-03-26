import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import footerModal from '../templates/footerModal.hbs'
import icons from '../images/social.svg'

const refs = {
    openModalBtn: document.querySelector('#footer-btn'),
    modal: document.querySelector('.footer-modal'),
    body: document.querySelector('body')
  };

refs.openModalBtn.addEventListener('click', openStudent);

function openStudent(event) {
  event.preventDefault();
  if (event.target !== event.target.dataset.students)
  basicLightbox.create(footerModal(icons), {
    onClose: () => document.body.removeAttribute('style')
  })
    .show()
  document.body.setAttribute('style', 'overflow:hidden');
}
    


  


  