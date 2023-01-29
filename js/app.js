window.addEventListener("DOMContentLoaded", () => {
    const firstButtons = document.querySelectorAll('.tab__btn__first'),
        secondButtons = document.querySelectorAll('.tab__btn__second'),
        firstInput = document.querySelector('.input__first'),
        secondInput = document.querySelector('.input__second'),
        firstCourse = document.querySelector('.section__main__course__first'),
        secondCourse = document.querySelector('.section__main__course__second');

    fetch('https://www.cbr-xml-daily.ru/latest.js', {
        method: "GET"
    })
        .then(response => response.json())
        .then(json => {
            const currency = Object.keys(json.rates)
            console.log(currency);
            getFirstCourseValue()
            getSecondCourseValue()
            firstButtons.forEach((item, i) => {
                item.addEventListener('click', () => {
                    removeActive(firstButtons)
                    item.classList.add('active')
                    getSecondInputValue()
                    getFirstCourseValue()
                    getSecondCourseValue()
                })
            })
            secondButtons.forEach((item) => {
                item.addEventListener('click', () => {
                    removeActive(secondButtons)
                    item.classList.add('active')
                    getSecondInputValue()
                    getFirstCourseValue()
                    getSecondCourseValue()
                })
            })
            firstInput.addEventListener('input', () => {
                getSecondInputValue()
            })
            function getSecondInputValue() {
                getFirstCourseValue()
                getSecondCourseValue()
                if (returnFirstButtonValue() == "RUS") {
                    secondInput.value = `${(firstInput.value * +(json.rates[returnSecondButtonValue()])).toFixed(3)}`

                }
                else {
                    if (returnSecondButtonValue() == "RUS") {
                        secondInput.value = `${(firstInput.value / +(json.rates[returnFirstButtonValue()])).toFixed(3)}`
                    }
                    else {
                        secondInput.value = `${(((firstInput.value / +(json.rates[returnFirstButtonValue()])) / (firstInput.value / +(json.rates[returnSecondButtonValue()]))) * firstInput.value).toFixed(3)}`
                    }
                }
                if (returnSecondButtonValue() == returnFirstButtonValue()) {
                    secondInput.value = firstInput.value
                }
                if (!firstInput.value) secondInput.value = "";

            }
            function removeActive(item) {
                item.forEach((item) => {
                    item.classList.remove("active")
                })
            }
            function returnFirstButtonValue() {
                for (let i = 0; i < firstButtons.length; i++) {
                    if (firstButtons[i].classList.contains('active')) {
                        return firstButtons[i].textContent;
                    }
                }
            }
            function returnSecondButtonValue() {
                for (let i = 0; i < secondButtons.length; i++) {
                    if (secondButtons[i].classList.contains('active')) {
                        return secondButtons[i].textContent;
                    }
                }
            }
            function getFirstCourseValue() {
                if (returnFirstButtonValue() == "RUS") {
                    firstCourse.textContent = `1 ${returnFirstButtonValue()} = ${(1 * +(json.rates[returnSecondButtonValue()])).toFixed(3)} ${returnSecondButtonValue()}`
                }
                else {
                    if (returnSecondButtonValue() == "RUS") {
                        firstCourse.textContent = `1 ${returnFirstButtonValue()} = ${(1 / +(json.rates[returnFirstButtonValue()])).toFixed(3)} ${returnSecondButtonValue()}`
                    }
                    else {
                        firstCourse.textContent = `1 ${returnFirstButtonValue()} =  ${(((1 / +(json.rates[returnFirstButtonValue()])) / (1 / +(json.rates[returnSecondButtonValue()]))) * 1).toFixed(3)} ${returnSecondButtonValue()}`
                    }
                }
                if (returnSecondButtonValue() == returnFirstButtonValue()) {
                    firstCourse.textContent = `1 ${returnFirstButtonValue()} = 1 ${returnSecondButtonValue()}`
                }

            }
            function getSecondCourseValue() {
                if (returnFirstButtonValue() == "RUS") {
                    secondCourse.textContent = `1 ${returnSecondButtonValue()} = ${(1 / +(json.rates[returnSecondButtonValue()])).toFixed(3)} ${returnFirstButtonValue()}`

                }
                else {
                    if (returnSecondButtonValue() == "RUS") {
                        secondCourse.textContent = `1 ${returnSecondButtonValue()} = ${json.rates[returnFirstButtonValue()].toFixed(3)} ${returnFirstButtonValue()}`
                    }
                    else {
                        secondCourse.textContent = `1 ${returnSecondButtonValue()} =  ${(((1 / +(json.rates[returnSecondButtonValue()])) / (1 / +(json.rates[returnFirstButtonValue()]))) * 1).toFixed(3)} ${returnFirstButtonValue()}`
                    }
                }
                if (returnFirstButtonValue() == returnSecondButtonValue()) {
                    secondCourse.textContent = `1 ${returnFirstButtonValue()} = 1 ${returnSecondButtonValue()}`
                }
            }
        })
})