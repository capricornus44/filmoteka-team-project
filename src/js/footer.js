import footerTpl from '../templates/footer.hbs';

const footer = document.querySelector('footer .container');

function footerMkp() {
    footer.insertAdjacentHTML('beforeend', footerTpl());
}    
footerMkp();
