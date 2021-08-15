const NavBarElements = {
    sectionTrigger: document.getElementById("section-2"),
    navbar: document.querySelector(".navbar"),
    navbarItems: document.querySelectorAll(".navbar .navbar__item"),
    navbarBackground: document.querySelector(".navbar .navbar__background")
}

let once = true;
let currentNavItemIndex;
let currentNavItem;
if (localStorage.currentNavItemIndex == null) {
    currentNavItemIndex = NavBarElements.navbarItems.length - 1
} else {
    currentNavItemIndex = localStorage.currentNavItemIndex
}
window.addEventListener('scroll', function () {
    const posTop = NavBarElements.sectionTrigger.getBoundingClientRect().top;
    NavBarElements.navbar.classList.toggle('hidden', posTop <= 800);
    if (once) {
        // first initialize //
        //let initializedItem = NavBarElements.navbarItems[NavBarElements.navbarItems.length - 1]
        let initializedItem = NavBarElements.navbarItems[NavBarElements.navbarItems.length - 1]
        initializedItem.classList.add("is-active")
        currentNavItem = initializedItem;
        NavBarElements.navbarBackground.style.width = initializedItem.offsetWidth + "px"
        NavBarElements.navbarBackground.style.left = initializedItem.offsetLeft + "px"
        //------------------//
        once = false
    }
});

window.addEventListener("resize", debounce(function () {
    // let initializedItem = NavBarElements.navbarItems[currentNavItemIndex]
    // initializedItem.classList.add("is-active")
    NavBarElements.navbarBackground.style.width = currentNavItem.offsetWidth + "px"
    NavBarElements.navbarBackground.style.left = currentNavItem.offsetLeft + "px"
    console.log("ASDAKLSMDKMAS")
}, 190, false))


let setActive = (ev) => {
    ev.preventDefault();
    let el = ev.target

    if (el.classList.contains("is-active")) {
        return false
    }
    for (let i = 0; i < NavBarElements.navbarItems.length; i++) {
        NavBarElements.navbarItems[i].classList.remove('is-active');
    }

    el.classList.add("is-active")
    NavBarElements.navbarBackground.style.width = el.offsetWidth + "px"

    let posY = el.offsetLeft; // левый отступ эл-та от родителя

    currentNavItem = el;
    // console.log(NavBarElements.navbarItems.findIndex(el))

    NavBarElements.navbarBackground.style.left = posY + "px"
}

NavBarElements.navbarItems.forEach((el) => {
    el.addEventListener('click', setActive)
})