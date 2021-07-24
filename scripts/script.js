const elements = {
    sectionsWrapper: document.getElementById("section-wrapper"),
    sections: document.querySelectorAll(".section"),
    scrollerWrapper: document.getElementById("slider_section-2"),
    scrollerItems: document.querySelectorAll('.slider-item'),
    window: window,
    progressBar: document.getElementById("slider__progress")
}

const getCoords = (elem) => {
    // let box = elem.getBoundingClientRect();
    // return {
    //     top: box.top, // + pageYOffset,
    //     left: box.left, // + pageXOffset
    // };
    //let box = elem.getBoundingClientRect();
    return {
        top: elem.offsetTop, // + pageYOffset,
        left: elem.offsetLeft, // + pageXOffset
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
        UpdatePositions();
        // console.log("ABOBASSACCACA")
        // console.log(sectionsTop)
        // console.log(scrollerItemsLeft)
    }, 0, false))
});

console.log(elements)
console.log(sectionsTop)
console.log(scrollerItemsLeft)

let currentPosition = 0;

let positions = []

const UpdatePositions = () => {
    positions = [{
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
}

UpdatePositions()
const nextNotHozSection = 5;
const lastNotHozSection = 0;
let last100HozSection = nextNotHozSection - 1;
let visited = false;
const WrapperFunction = (obj, direction) => {




    if (direction === 'up' && currentPosition < positions.length - 1) {
        currentPosition++;
    } else if (direction === 'down' && currentPosition > 0) {
        currentPosition--;
    } else if (direction === 'top') {
        currentPosition = 0;
    }

    // console.log("newCurPos", currentPosition)

    if (positions[currentPosition].horizontal) {
        if (perc >= 100 && direction == "up" && visited) {
            visited = false;
            last100HozSection = currentPosition - 1;
            positions[currentPosition].objWrapper.scrollTo({
                top: positions[nextNotHozSection].pos,
                behavior: 'smooth'
            })
            // console.log("1111", currentPosition)
            currentPosition = nextNotHozSection
        } else if (perc >= 100 && direction == "down" && !visited) {
            visited = true
            positions[currentPosition].obj.scrollTo({
                top: positions[last100HozSection].pos,
                behavior: 'smooth'
            })
            positions[currentPosition].objWrapper.scrollTo({
                top: positions[currentPosition].posWrapper,
                behavior: 'smooth'
            })
            // currentPosition = lastNotHozSection
            // console.log("2222", currentPosition, last100HozSection)
            currentPosition = last100HozSection
        } else {
            visited = true
            positions[currentPosition].objWrapper.scrollTo({
                top: positions[currentPosition].posWrapper,
                behavior: 'smooth'
            })
            positions[currentPosition].obj.scrollTo({
                left: positions[currentPosition].pos,
                behavior: 'smooth'
            })
        }
    } else {
        visited = false
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


let right
let scrollWidth
let currScrollPos
let perc = 0
let changeProgressBar = (ev) => {
    //ev.preventDefault()
    right = elements.scrollerWrapper.getBoundingClientRect().right

    scrollWidth = elements.scrollerWrapper.scrollWidth
    currScrollPos = elements.scrollerWrapper.scrollLeft

    if (right == scrollWidth) {
        perc = 100
    } else {
        perc = currScrollPos / ((scrollWidth - right) * 1.05) * 100 + 5
    }
    // console.log(right, scrollWidth, currScrollPos)

    elements.progressBar.style.transform = `translate(-9rem, 0) translate(${perc}%, 0)`
}
changeProgressBar()
elements.scrollerWrapper.addEventListener("scroll", changeProgressBar)