const ScrollerElements = {
    scrollerWrapper: document.getElementById("slider_section-2"),
    scrollerItems: document.querySelectorAll('.slider-item'),
    progressBar: document.getElementById("slider__progress")
}

let currentSliderSection = 0
let scrollerItemsLeft = getLeftOfElements(ScrollerElements.scrollerItems)

ScrollerElements.scrollerWrapper.addEventListener('scroll', debounce((e) => {
    // console.log('scroll SCROLLER end, 22771190139123-090913910230')
    flagScrollStart = false
}, 800, false))


const WrapperScrollerFunction = (obj, direction) => {

    // console.log("direction: ", direction, "obj: ", obj)

    if (currentSliderSection == scrollerItemsLeft.length - 1 && direction == "up") {
        flagStopScrollVertical = false;
        WrapperFunction(window, "up")
        // console.log("ABOBA UP, FLAG IS", flagStopScrollVertical)
    } else if (currentSliderSection == 0 && direction == "down") {
        flagStopScrollVertical = false;
        WrapperFunction(window, "down")
        // console.log("ABOBA DOWN, FLAG IS", flagStopScrollVertical)

    } else {

        flagStopScrollVertical = true
        // console.log("SO, NOW FLAG IS", flagStopScrollVertical)
        if (direction === 'up' && currentSliderSection < scrollerItemsLeft.length - 1) {
            currentSliderSection++;
        } else if (direction === 'down' && currentSliderSection > 0) {
            currentSliderSection--;
        } else if (direction === 'top') {
            currentSliderSection = 0;
        }

        obj.scrollTo({
            left: scrollerItemsLeft[currentSliderSection],
            behavior: 'smooth'
        })

    }


}


Scroll(ScrollerElements.scrollerWrapper, WrapperScrollerFunction)
Swipe(ScrollerElements.scrollerWrapper, WrapperScrollerFunction)





// progressbar:
let slider = document.getElementById("slider-sec2")
//let progressBar = document.getElementById("slider__progress")


// function div(val, by) {
//     return (val - val % by) / by;
// }

let right
let scrollWidth
let currScrollPos
let perc
let changeProgressBar = (ev) => {
    //ev.preventDefault()
    right = ScrollerElements.scrollerWrapper.getBoundingClientRect().right
    scrollWidth = ScrollerElements.scrollerWrapper.scrollWidth
    currScrollPos = ScrollerElements.scrollerWrapper.scrollLeft
    // console.log(right, scrollWidth, currScrollPos, scrollWidth - right - currScrollPos, currScrollPos / (
    //     scrollWidth - right) * 100)
    perc = currScrollPos / ((scrollWidth - right) * 1.05) * 100 + 5
    // let perc = div(currScrollPos * 100, (scrollWidth - right))
    ScrollerElements.progressBar.style.transform = `translate(-9rem, 0) translate(${perc}%, 0)`
}
console.log(ScrollerElements.scrollerWrapper)
ScrollerElements.scrollerWrapper.addEventListener("scroll", changeProgressBar)
//end