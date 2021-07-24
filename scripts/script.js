const elements = {
    sectionsWrapper: document.getElementById("section-wrapper"),
    sections: document.querySelectorAll(".section"),
    scrollerWrapper: document.getElementById("slider_section-2"),
    scrollerItems: document.querySelectorAll('.slider-item'),
    window: window
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

let sectionsTop = getTopOfElements(elements.sections)

let scrollerItemsLeft = getLeftOfElements(elements.scrollerItems)

document.addEventListener("DOMContentLoaded", function (event) {
    window.addEventListener('resize', debounce(() => {
        sectionsTop = getTopOfElements(elements.sections)
        scrollerItemsLeft = getLeftOfElements(elements.scrollerItems)
    }, 0, false))
});

console.log(elements)
console.log(sectionsTop)
console.log(scrollerItemsLeft)

let currentPosition = 0;

let positions = [{
        obj: elements.window,
        pos: sectionsTop[0],
        horizontal: false
    },
    {
        objWrapper: elements.window,
        posWrapper: sectionsTop[1],
        obj: elements.scrollerWrapper,
        pos: scrollerItemsLeft[0],
        horizontal: true
    },
    {
        objWrapper: elements.window,
        posWrapper: sectionsTop[1],
        obj: elements.scrollerWrapper,
        pos: scrollerItemsLeft[1],
        horizontal: true
    }, {
        objWrapper: elements.window,
        posWrapper: sectionsTop[1],
        obj: elements.scrollerWrapper,
        pos: scrollerItemsLeft[2],
        horizontal: true
    },
    {
        objWrapper: elements.window,
        posWrapper: sectionsTop[1],
        obj: elements.scrollerWrapper,
        pos: scrollerItemsLeft[3],
        horizontal: true
    },
    {
        obj: elements.window,
        pos: sectionsTop[2],
        horizontal: false
    }, {
        obj: elements.window,
        pos: sectionsTop[3],
        horizontal: false
    },
    {
        obj: elements.window,
        pos: sectionsTop[4],
        horizontal: false
    },
    {
        obj: elements.window,
        pos: sectionsTop[5],
        horizontal: false
    },
    {
        obj: elements.window,
        pos: sectionsTop[6],
        horizontal: false
    },
]


const WrapperFunction = (obj, direction) => {


    if (direction === 'up' && currentPosition < positions.length - 1) {
        currentPosition++;
    } else if (direction === 'down' && currentPosition > 0) {
        currentPosition--;
    } else if (direction === 'top') {
        currentPosition = 0;
    }

    if (positions[currentPosition].horizontal) {

        positions[currentPosition].objWrapper.scrollTo({
            top: positions[currentPosition].posWrapper,
            behavior: 'smooth'
        })
        positions[currentPosition].obj.scrollTo({
            left: positions[currentPosition].pos,
            behavior: 'smooth'
        })
    } else {
        positions[currentPosition].obj.scrollTo({
            top: positions[currentPosition].pos,
            behavior: 'smooth'
        })
    }

}





let flagScrollStart = false;
// let flagStopScrollVertical = false;

Scroll(window, WrapperFunction)
Swipe(elements.sectionsWrapper, WrapperFunction, false)


// window.addEventListener('scroll', debounce((e) => {
//     console.log('scroll window end, dfFSOPFSDFKODFSKSFKPOFSOKPFSDKOPFKSDOFKSDOOFKPSSDK')
//     flagScrollStart = false
// }, 800, false))

// elements.scrollerWrapper.addEventListener('scroll', debounce((e) => {
//     console.log('scroll SCROLLER end, 22771190139123-090913910230')
//     flagScrollStart = false
// }, 800, false))