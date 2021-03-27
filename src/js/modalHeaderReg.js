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
  const basicLightboxInstance = basicLightbox.create(authModal(), {
    onClose: () => document.body.removeAttribute('style'),
  });

  basicLightboxInstance.show();
  document.body.setAttribute('style', 'overflow:hidden');

  document.querySelector('.sign-in').addEventListener('click', getAuthent);

  async function getAuthent(ev) {
    ev.preventDefault();

    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const user = await signinWithEmailAndPassword(emailData, passwordData);
    ev.target.parentNode.email.value = '';
    ev.target.parentNode.password.value = '';
    basicLightboxInstance.close();
  }

  document.querySelector('#auth-send').addEventListener('click', openName);

  function openName(ev) {
    ev.preventDefault();
    document.querySelector('#name-imput').classList.remove('is-hidden');
    document.querySelector('.sign-in').classList.toggle('sign-reg');
    document.querySelector('.sign-reg').classList.toggle('sign-in');
    document
      .querySelector('.sign-reg')
      .addEventListener('click', sendRegistrationForm);
  }

  async function sendRegistrationForm(ev) {
    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const nameData = ev.target.parentNode.name.value;
    console.log('Это регистрация');

    const user = await signupWithEmailAndPassword(
      emailData,
      passwordData,
      nameData,
    );
    ev.target.parentNode.email.value = '';
    ev.target.parentNode.password.value = '';
    ev.target.parentNode.name.value = '';
  }

  document.querySelector('#auth-out').addEventListener('click', outAuthent);

  async function outAuthent(ev) {
    ev.preventDefault();
    const user = await signOut();
  }
}
