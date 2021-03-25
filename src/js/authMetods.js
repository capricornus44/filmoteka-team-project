import headerInfo from '../templates/homeHeader.hbs';
import {
  signupWithEmailAndPassword,
  signinWithEmailAndPassword,
  signOut,
} from '../firebase/auth';

// const authForm = document.querySelector('#auth-form');
const authBtn = document.querySelector('#auth-send');
const getAuthBtn = document.querySelector('#auth-get');
const outAuthBtn = document.querySelector('#auth-out');

authBtn.addEventListener('click', sendAuthent);
getAuthBtn.addEventListener('click', getAuthent);
outAuthBtn.addEventListener('click', outAuthent);

async function sendAuthent(ev) {
  ev.preventDefault();
  const emailData = ev.target.parentNode.name.value;
  const passwordData = ev.target.parentNode.password.value;
  const user = await signupWithEmailAndPassword(emailData, passwordData);
}

async function getAuthent(ev) {
  ev.preventDefault();
  const emailData = ev.target.parentNode.name.value;
  const passwordData = ev.target.parentNode.password.value;
  const user = await signinWithEmailAndPassword(emailData, passwordData);
}

async function outAuthent(ev) {
  ev.preventDefault();
  const user = await signOut();
}
