import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import footerModal from '../templates/footerModal.hbs'

const refs = {
    openModalBtn: document.querySelector('#footer-btn'),
    modal: document.querySelector('.footer-modal'),
  };

refs.openModalBtn.addEventListener('click', openStudent);

function openStudent(event) {
  event.preventDefault();
  if (event.target.textContent === event.target.dataset.students)
    return;
  basicLightbox.create(footerModal()).show()
}

  


  