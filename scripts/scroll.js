// Возвращает функцию, которая, пока она продолжает вызываться,
// не будет запускаться.
// Она будет вызвана один раз через N миллисекунд после последнего вызова.
// Если передано аргумент `immediate` (true), то она запустится сразу же при
// первом запуске функции.

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
};


// структура страницы загружена и готова к взаимодействию

const throttle = (func, ms) => { // объявляем функцию throttle

    let locked = false // переменная которая отвечает за блокировку вызова функции

    return function () { // эта функция запускается при каждом событии движения курсора

        if (locked) return // если заблокировано, то прекращаем выполнение этой функции

        const context = this // запоминаем передаваемую функцию func
        const args = arguments // запоминаем параметры передаваемой функции func

        locked = true // блокируем вызов функции

        setTimeout(() => { // устанавливаем время ожидания

            func.apply(context, args) // выполняем переданную функцию func
            locked = false // снимаем блокировку

        }, ms) // подставляем значение параметра ms

    }
}


let hold = false

function ScrollY(obj, func) {

    if (currentDirection === "up" || currentDirection === "down") {

        if (!hold && !flagScrollStart || flagScrollStart && currentDirection != lastDirection) {

            hold = true
            flagScrollStart = true
            lastDirection = currentDirection
            // console.log("SCROLLING", currentDirection)
            func(obj, currentDirection)

            setTimeout(() => {
                hold = false
            }, 0);
        }
    }
}

var lastScrollPos = 0;
var positions = {
    lastPos: 0
};

let currentDirection = "none";
let lastDirection = "none";

function Scroll(obj, func) {

    obj.addEventListener('wheel', (e) => {
        currentDirection = getWheelchanges(e, func)
        e.stopPropagation();

    }, {
        passive: true
    });

    obj.addEventListener("wheel", debounce((e) => {
        e.preventDefault();
        flagScrollStart = false
        // console.log("SO, NOW FLAG IS FUCKING:", flagScrollStart)

    }, 70, false), {
        passive: true
    })

    obj.addEventListener("wheel", throttle((e) => {
        ScrollY(obj, func)
        //console.log("ABOBABOBAE2000E")
    }, 40), {
        passive: true
    })
}

function getWheelchanges(e, func) {

    if (e.deltaX < 0 && e.deltaX < e.deltaY) {
        direction = 'left';
    } else if (e.deltaX > 0 && e.deltaX > e.deltaY) {
        direction = 'right';
    } else if (e.deltaY < 0 && e.deltaX > e.deltaY) {
        direction = 'down';
    } else if (e.deltaY > 0 && e.deltaX < e.deltaY) {
        direction = 'up';
    } else {
        direction = "none"
    }
    // console.log("wheel: ", direction)
    //e.stopPropagation();
    return direction;
}