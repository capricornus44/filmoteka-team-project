import * as basicLightbox from 'basiclightbox';
import 'basicLightbox/dist/basicLightbox.min.css';
import authModal from '../templates/modalHeadReg.hbs';
// import { getAuthent } from '../js/authMetods';

import {
  signupWithEmailAndPassword,
  signinWithEmailAndPassword,
  signOut,
} from '../firebase/auth';

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

  document.querySelector('#auth-get').addEventListener('click', getAuthent);

  async function getAuthent(ev) {
    ev.preventDefault();

    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const user = await signinWithEmailAndPassword(emailData, passwordData);
  }
  const qqq = document.querySelector('#auth-send');
  console.log(qqq);
  document.querySelector('#auth-send').addEventListener('click', openName);

  function openName(ev) {
    ev.preventDefault();
    document.querySelector('#name-imput').classList.remove('is-hidden');
  }

  async function sendAuthent(ev) {
    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const nameData = ev.target.parentNode.name.value;

    const user = await signupWithEmailAndPassword(
      emailData,
      passwordData,
      nameData,
    );
  }
}
