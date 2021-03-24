const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const toggle = document.addEventListener('change', changeTheam);

function changeTheam(e) {
  if (e.target.checked) {
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
  refs.toggle.checked = true;
  refs.body.classList.add(Theme.DARK);
} else {
  refs.body.classList.add(Theme.LIGHT);
}
