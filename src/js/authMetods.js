import {
  signupWithEmailAndPassword,
  signinWithEmailAndPassword,
  signOut,
} from '../firebase/auth';

const outAuthBtn = document.querySelector('#auth-out');

outAuthBtn.addEventListener('click', outAuthent);

async function outAuthent(ev) {
  ev.preventDefault();
  const user = await signOut();
}
