const scrollUp = document.querySelector('#scroll-up');

window.addEventListener('scroll', trackScroll);
scrollUp.addEventListener('click', backToTop);

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  // console.log(scrolled);
  // console.log(coords);

  if (scrolled > coords) {
    scrollUp.classList.add('scroll-up-show');
  }
  if (scrolled < coords) {
    scrollUp.classList.remove('scroll-up-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}

// function backToTop() {
//   if (window.pageYOffset > 0) {
//     window.scrollBy(0, -80);
//     setTimeout(backToTop, 20);
//   }
// }
