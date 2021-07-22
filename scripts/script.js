const elements = {
    sectionsWrapper: document.getElementById("section-wrapper"),
    sections: document.querySelectorAll(".section"),
    // scrollerWrapper: document.getElementById("scroller-wrapper"),
    // scrollerItems: document.querySelectorAll('.scroller-item')
}

const getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

const getTopOfElements = (elements) => {
    let arr = []
    elements.forEach(element => {
        arr.push(getCoords(element).top)
    })
    return arr
}

const getLeftOfElements = (elements) => {
    let arr = []
    elements.forEach(element => {
        arr.push(getCoords(element).left)
    })
    return arr
}
// console.log(elements)
let currentSection = 0
let sectionsTop = getTopOfElements(elements.sections)

// let currentSliderSection = 0
// let scrollerItemsLeft = getLeftOfElements(elements.scrollerItems)


window.addEventListener('resize', debounce(() => {
    sectionsTop = getTopOfElements(elements.sections)
    scrollerItemsLeft = getLeftOfElements(elements.scrollerItems)
}, 0, false))

//console.log(currentSection)

// var pnls = document.querySelectorAll('.panel').length,
// scdir //hold = false;

// let sections = document.querySelectorAll('.panel')

// console.log(sectionsTop)

const WrapperFunction = (obj, direction) => {

    // console.log("ABPABSDPBPABSDBASBPDBDPSAPDABPASDBSABDP")
    // console.log(currentSection)
    let newCurrentSection = currentSection;

    if (currentSection == 1) {

        if (currentSliderSection == 0 && direction == "down") {
            newCurrentSection = currentSection - 1;
        } else if (currentSliderSection == scrollerItemsLeft.length - 1 && direction == "up") {
            newCurrentSection = currentSection + 1;
        }
        if (newCurrentSection != currentSection) {
            window.scrollTo({
                top: sectionsTop[newCurrentSection],
                behavior: 'smooth'
            })
            currentSection = newCurrentSection
            // console.log("+CHANGED: NEW_CURR != OLD_CURR", newCurrentSection, currentSection)
        } else {
            // console.log("NOTHING CHANGED: NEW_CURR = OLD_CURR", newCurrentSection, currentSection)
        }
    } else {
        if (direction === 'up' && currentSection < sectionsTop.length - 1) {
            currentSection++;
        } else if (direction === 'down' && currentSection > 0) {
            currentSection--;
        } else if (direction === 'top') {
            currentSection = 0;
        }
        // if (!flagStopScrollVertical) {
        window.scrollTo({
            top: sectionsTop[currentSection],
            behavior: 'smooth'
        })
    }
    // }


}

// const WrapperScrollerFunction = (obj, direction) => {
//     console.log("direction: ", direction, "obj: ", obj)

//     if (currentSliderSection == scrollerItemsLeft.length - 1 && direction == "up") {
//         flagStopScrollVertical = false;
//         WrapperFunction(window, "up")
//         console.log("ABOBA UP, FLAG IS", flagStopScrollVertical)
//     } else if (currentSliderSection == 0 && direction == "down") {
//         flagStopScrollVertical = false;
//         WrapperFunction(window, "down")
//         console.log("ABOBA DOWN, FLAG IS", flagStopScrollVertical)

//     } else {

//         flagStopScrollVertical = true
//         console.log("SO, NOW FLAG IS", flagStopScrollVertical)
//         if (direction === 'up' && currentSliderSection < scrollerItemsLeft.length - 1) {
//             currentSliderSection++;
//         } else if (direction === 'down' && currentSliderSection > 0) {
//             currentSliderSection--;
//         } else if (direction === 'top') {
//             currentSliderSection = 0;
//         }

//         obj.scrollTo({
//             left: scrollerItemsLeft[currentSliderSection],
//             behavior: 'smooth'
//         })

//     }


// }


let flagScrollStart = false;
let flagStopScrollVertical = false;

Scroll(window, WrapperFunction)
Swipe(elements.sectionsWrapper, WrapperFunction)
// Scroll(elements.scrollerWrapper, WrapperScrollerFunction)
// Swipe(elements.scrollerWrapper, WrapperScrollerFunction)


window.addEventListener('scroll', debounce((e) => {
    // console.log('scroll window end, dfFSOPFSDFKODFSKSFKPOFSOKPFSDKOPFKSDOFKSDOOFKPSSDK')
    flagScrollStart = false
}, 800, false))

// elements.scrollerWrapper.addEventListener('scroll', debounce((e) => {
//     console.log('scroll SCROLLER end, 22771190139123-090913910230')
//     flagScrollStart = false
// }, 800, false))



// function isElementInViewport(el) {

//     // Special bonus for those using jQuery
//     if (typeof jQuery === "function" && el instanceof jQuery) {
//         el = el[0];
//     }

//     var rect = el.getBoundingClientRect();

//     return (
//         rect.top >= 0 &&
//         rect.left >= 0 &&
//         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
//         rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
//     );
// }

// function onVisibilityChange(el, callback) {
//     var old_visible;
//     return function () {
//         var visible = isElementInViewport(el);
//         if (visible != old_visible) {
//             old_visible = visible;
//             if (typeof callback == 'function') {
//                 callback();
//             }
//         }
//     }
// }

// var handler = onVisibilityChange(elements.scrollerWrapper, function () {
//     console.log("SCROLLER-WRAPPER IS IN VIEWPORT")
//     //flagScrollStart = true
// });

// if (window.addEventListener) {
//     // addEventListener('DOMContentLoaded', handler, false);
//     // addEventListener('load', handler, false);
//     addEventListener('scroll', handler, false);
//     // addEventListener('resize', handler, false);
// } else if (window.attachEvent) {
//     // attachEvent('onDOMContentLoaded', handler); // Internet Explorer 9+ :(
//     // attachEvent('onload', handler);
//     attachEvent('onscroll', handler);
//     // attachEvent('onresize', handler);
// }



// end

// // section-6 slider:
// let slider2 = document.getElementById("slider2")

// let scrollNext = () => {
//     if (slider2.scrollLeft < slider2.scrollWidth - slider2.offsetWidth) {
//         slider2.scrollTo({
//             left: slider2.scrollLeft + 500,
//             behavior: "smooth"
//         })
//     }
// }

// let scrollPrev = () => {
//     if (slider2.scrollLeft > 0) {
//         slider2.scrollTo({
//             left: slider2.scrollLeft - 500,
//             behavior: "smooth"
//         })
//     }
// }

// document.getElementById("sliderButtonPrev").addEventListener("click", scrollPrev)

// document.getElementById("sliderButtonNext").addEventListener("click", scrollNext)

// //end

// // progressbar:
// let slider = document.getElementById("slider-sec2")
// let progressBar = document.getElementById("slider__progress")


// // function div(val, by) {
// //     return (val - val % by) / by;
// // }

// let right
// let scrollWidth
// let currScrollPos
// // console.log(right, scrollWidth, currScrollPos, scrollWidth - right - currScrollPos, currScrollPos / (
// //     scrollWidth - right) * 100)
// let perc
// let changeProgressBar = (ev) => {
//     //ev.preventDefault()
//     right = slider.getBoundingClientRect().right
//     scrollWidth = slider.scrollWidth
//     currScrollPos = slider.scrollLeft
//     // console.log(right, scrollWidth, currScrollPos, scrollWidth - right - currScrollPos, currScrollPos / (
//     //     scrollWidth - right) * 100)
//     perc = currScrollPos / ((scrollWidth - right) * 1.05) * 100 + 5
//     // let perc = div(currScrollPos * 100, (scrollWidth - right))
//     progressBar.style.transform = `translate(-9rem, 0) translate(${perc}%, 0)`
// }
// console.log(slider)
// slider.addEventListener("scroll", changeProgressBar)
// //end