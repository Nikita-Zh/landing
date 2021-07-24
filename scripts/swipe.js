function Enum(obj) {
    // итоговый объект
    const newObj = {};

    // проходимся по каждому свойству переданного в функцию объекта
    for (const prop in obj) {
        // проверяем наличие собственного свойства у объекта
        if (obj.hasOwnProperty(prop)) {

            // помещаем в новый объект специальный примитивный тип JavaScript Symbol
            newObj[prop] = Symbol(obj[prop]);
        }
    }

    // делаем объект неизменяемым (свойства объекта нельзя будет изменить динамически)
    return Object.freeze(newObj);
}



function Swipe(obj, func, needDistance) {

    const directions = Enum({
        Up: "up",
        Down: "down",
        Right: "right",
        Left: "left",
        None: "none"
    })

    let direction = directions.None;
    //let swipeDistace = 0;

    //Чувствительность — количество пикселей, после которого жест будет считаться свайпом
    const sensitivity = 20;

    var touchStart = null; //Точка начала касания
    var touchPosition = null; //Текущая позиция

    //Перехватываем события
    obj.addEventListener("touchstart", function (e) {
        TouchStart(e);
    }, {
        passive: true
    }); //Начало касания
    obj.addEventListener("touchmove", function (e) {
        TouchMove(e);
    }, {
        passive: true
    }); //Движение пальцем по экрану
    //Пользователь отпустил экран
    obj.addEventListener("touchend", function (e) {
        TouchEnd(e);
    }, {
        passive: true
    });
    //Отмена касания
    obj.addEventListener("touchcancel", function (e) {
        TouchEnd(e);
    }, {
        passive: true
    });

    function TouchStart(e) {
        //Получаем текущую позицию касания
        touchStart = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };
        touchPosition = {
            x: touchStart.x,
            y: touchStart.y
        };

    }

    function TouchMove(e) {
        //Получаем новую позицию
        //e.preventDefault();

        touchPosition = {
            x: e.changedTouches[0].clientX,
            y: e.changedTouches[0].clientY
        };

    }

    function TouchEnd(e) {
        //e.preventDefault()

        let direction = CheckAction()
        //console.log(e.target)

        if (needDistance) {
            func(obj, direction, distance)
        } else {
            func(obj, direction)
        }


        //Очищаем позиции
        touchStart = null;
        touchPosition = null;

        e.stopPropagation();

    }

    function CheckAction() {

        var d = //Получаем расстояния от начальной до конечной точек по обеим осям
            {
                x: touchStart.x - touchPosition.x,
                y: touchStart.y - touchPosition.y
            };

        if (Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
        {
            //distance = d.x
            if (Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
            {
                if (d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
                {
                    // direction = "left"
                    direction = directions.Left.description
                } else //Иначе он двигал им слева направо
                {
                    // direction = "right"
                    direction = directions.Right.description
                }
            }
        } else if (Math.abs(d.y) > sensitivity) { //Аналогичные проверки для вертикальной оси
            //distance = d.y
            if (d.y > 0) //Свайп вверх
            {
                // direction = "up"
                direction = directions.Up.description
            } else //Свайп вниз
            {
                // direction = "down"
                direction = directions.Down.description
            }
        } else {
            direction = directions.None.description
        }

        return direction
    }
}