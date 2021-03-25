import headerInfo from '../templates/homeHeader.hbs';

// const authForm = document.querySelector('#auth-form');
const authBtn = document.querySelector('#auth-send');

authBtn.addEventListener('click', sendAuthent);

function sendAuthent(ev) {
  ev.preventDefault();
  const emailData = ev.target.parentNode.name.value;
  const passwordData = ev.target.parentNode.password.value;
  console.log('email', emailData);
  console.log('passwod', passwordData);
}
