const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar__toggle');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    navbar.classList.add('navbar--visible');
  } else {
    navbar.classList.remove('navbar--visible');
  }
});

navbarToggle.addEventListener('click', () => {
  // adiciona ou remove a classe 'navbar--open' ao botão de menu
  navbarToggle.classList.toggle('navbar__toggle--open');
});

