// логика на Header

import headerInfo from '../templates/homeHeader.hbs';
import logo from '../images/sprite.svg';
console.log(headerInfo());

function loadStartPage({ headerInfo, logo }) {
  const headerLayout = headerInfo(logo);
  const container = document.querySelector('header .container');
  container.insertAdjacentHTML('beforeend', headerLayout);
  console.log(container);
}

loadStartPage({ headerInfo, logo });
