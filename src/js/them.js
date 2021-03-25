const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const refs = {
  toggle: document.querySelector('.toggle'),
};

refs.toggle.addEventListener('click', changeTheme);

export default function changeTheme() {
  if (this.classList.toggle('active') === true) {
    replaceTheme(Theme.LIGHT, Theme.DARK);
  } else {
    replaceTheme(Theme.DARK, Theme.LIGHT);
  }
}

function replaceTheme(oldTheme, newTheme) {
  document.body.classList.add(newTheme);
  document.body.classList.remove(oldTheme);
  localStorage.setItem('theme', newTheme);
}

const localStorageThem = localStorage.getItem('theme', Theme.LIGHT);
if (localStorageThem === Theme.DARK) {
  refs.toggle.classList.toggle('active');
  document.body.classList.add(Theme.DARK);
} else {
  document.body.classList.add(Theme.LIGHT);
}
