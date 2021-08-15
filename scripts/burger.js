const burgerElements = {
    button: document.querySelector('.header__burger'),
    burger: document.querySelector('.header__burger_icon'),
    nav: document.querySelector('header.header .nav')
}

burgerElements.button.addEventListener('click', function () {
    burgerElements.burger.classList.toggle('open')
    document.body.classList.toggle('lock')
    burgerElements.nav.classList.toggle('active')
})