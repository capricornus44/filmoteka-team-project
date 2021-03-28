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

  document.querySelector('#auch-get').addEventListener('click', goIn);
  document
    .querySelector('#auch-open')
    .addEventListener('click', changeWisibility);
  document
    .querySelector('#auch-send')
    .addEventListener('click', sendRegistrationForm);
  document.querySelector('#back').addEventListener('click', changeWisibility);

  async function goIn(ev) {
    ev.preventDefault();

    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const user = await signinWithEmailAndPassword(emailData, passwordData);
    ev.target.parentNode.email.value = '';
    ev.target.parentNode.password.value = '';

    // basicLightbox.onClose(ev => document.body.removeAttribute('style'));

    basicLightboxInstance.close();
  }

  function changeWisibility(ev) {
    ev.preventDefault();
    document.querySelector('#name-imput').classList.toggle('is-hidden');
    document.querySelector('#auch-get').classList.toggle('is-hidden');
    document.querySelector('#auch-open').classList.toggle('is-hidden');
    document.querySelector('#auch-send').classList.toggle('is-hidden');
    document.querySelector('#back').classList.toggle('is-hidden');
  }

  async function sendRegistrationForm(ev) {
    ev.preventDefault();
    const emailData = ev.target.parentNode.email.value;
    const passwordData = ev.target.parentNode.password.value;
    const nameData = ev.target.parentNode.name.value;

    console.log(ev.target.parentNode.name);
    console.log(emailData);
    console.log(passwordData);
    console.log(nameData);
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
