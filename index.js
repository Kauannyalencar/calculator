const result = document.querySelector(".result")
const botoes = document.querySelectorAll("button")

let currentNumber = "";
let firstOperation = null;
let operator = null;
let restart = false;

function updateResult(origenClear = false) {
    result.innerText = origenClear ? 0 : currentNumber.replace(".", ",");
    console.log(currentNumber);
}

function addDigit(digit) {
    if (digit === "," && (currentNumber.includes(",") || !currentNumber))
        return;
    if (restart) {
        currentNumber = digit;
        restart = false;
    } else {
        currentNumber += digit
    }

    updateResult()
}

function setOperator(newOperation) {
    if (currentNumber) {
        console.log(currentNumber);
        calculate();
        firstOperation = parseFloat(currentNumber.replace(",", "."));
        console.log(firstOperation);
        currentNumber = ""
    }

    operator = newOperation;
}


function calculate() {
    if (operator === null || firstOperation === null) return;
    let secondOperator = parseFloat(currentNumber.replace(",", "."));
    let resultValue;

    switch (operator) {
        case "+":
            resultValue = firstOperation + secondOperator
            break;
        case "-":
            resultValue = firstOperation - secondOperator;
            break
        case "*":
            resultValue = firstOperation * secondOperator;
            break
        case "/":
            resultValue = firstOperation / secondOperator;
            break
        default:
            break;
    }

    if (resultValue.toString().split(".")[1]?.length > 5) {
        currentNumber = parseFloat(resultValue.toFixed(5)).toString();
    }else{
        currentNumber = resultValue.toString();
    }

    operator = null;
    firstOperation = null;
    restart = true;
    updateResult()
}

function clearCalculator() {
    currentNumber = '';
    firstOperation = null;
    operator = null;
    updateResult(true)
}

botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
        const buttonText = btn.innerText;
        if (/^[0-9,]+$/.test(buttonText)) {
            addDigit(buttonText)
        } else if (["+", "-", "*", "/"].includes(buttonText)) {
            setOperator(buttonText)
        }else if (buttonText === '=') {
            calculate()
        }else if (buttonText === "Clear") {
            clearCalculator()
        }
    })
})