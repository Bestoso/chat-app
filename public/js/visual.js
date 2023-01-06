const menuToggler = document.querySelector('.toggler__container');
const navMenu = document.querySelector('.menu');

menuToggler.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});