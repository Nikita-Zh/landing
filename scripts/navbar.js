const NavBarElements = {
    sectionTrigger: document.getElementById("section-2"),
    navbar: document.querySelector(".navbar"),
    navbarItems: document.querySelectorAll(".navbar .navbar__item"),
    navbarBackground: document.querySelector(".navbar .navbar__background")
}

let once = true;
let currentNavItemIndex;
let currentNavItem;
let sectionTriggerPosTop;
if (localStorage.currentNavItemIndex == null) {
    currentNavItemIndex = NavBarElements.navbarItems.length - 1
} else {
    currentNavItemIndex = localStorage.currentNavItemIndex
}

let threshold = document.getElementById("section-1").getBoundingClientRect().height - 50;
window.addEventListener('scroll', function () {
    // const posTop = NavBarElements.sectionTrigger.getBoundingClientRect().top;
    sectionTriggerPosTop = NavBarElements.sectionTrigger.getBoundingClientRect().top;
    console.log(threshold)
    console.log(sectionTriggerPosTop)
    NavBarElements.navbar.classList.toggle('hidden', sectionTriggerPosTop <= threshold);
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
    threshold = document.getElementById("section-1").getBoundingClientRect().height - 50;

    sectionTriggerPosTop = NavBarElements.sectionTrigger.getBoundingClientRect().top;
    console.log('RESIZE', threshold)
    console.log('RESIZE', sectionTriggerPosTop)
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