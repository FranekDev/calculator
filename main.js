const numberBtn = document.querySelectorAll('.numberBtn');
const currentOperation = document.querySelector('.currentOperation');
const lastOperation = document.querySelector('.lastOperation');
const clearBtn = document.querySelector('.clear');
const removeBtn = document.querySelector('.remove');
const operationBtn = document.querySelectorAll('.operationBtn');
const calc = document.querySelector('.calc');
const coma = document.querySelector('.coma');

let operator = '';
let firstNumber = null;
let secondNumber = null;
let wasNumber = false;
let calculate = false;
let shouldReset = false;

coma.addEventListener('click', addComa);

clearBtn.addEventListener('click', clear);

numberBtn.forEach((button) =>
    button.addEventListener('click', () => {
        currentOperation.style.fontSize = '27px';
        reduceTextSize();
        wasNumber = true;
        shouldReset = false;
        currentOperation.textContent += button.value;
    })
);

operationBtn.forEach((button) => 
    button.addEventListener('click', () => {

        if(calculate) {
            lastOperation.textContent += currentOperation.textContent + button.value;
            console.log('up');
            calculate = false;
        }

        if(!wasNumber) {
            lastOperation.textContent = currentOperation.textContent;
            currentOperation.textContent = '';
        }
        else {        
            reset();
            lastOperation.textContent = currentOperation.textContent + button.value;
            operate(operator, lastOperation, currentOperation)
            currentOperation.textContent = '';
            operator = button.value;
        }

    })
);

removeBtn.addEventListener('click', () => {
    currentOperation.textContent = currentOperation.textContent.slice(0, -1);
    if(currentOperation.textContent.length === 0) {
        wasNumber = false;
    }
});

calc.addEventListener('click', () => {
    lastOperation.textContent += currentOperation.textContent + calc.value;
    operate(operator, lastOperation, currentOperation);
    shouldReset = true;
});

function operate(operator, lastOperation, currentOperation) {

    firstNumber = parseFloat(lastOperation.textContent, 10);
    secondNumber = parseFloat(currentOperation.textContent, 10);
    console.log(`${operator}, ${firstNumber}, ${secondNumber}`);
        
    switch(operator) {

        case '+':
            add(firstNumber, secondNumber);
        break;

        case '-':
            subtract(firstNumber, secondNumber);
        break;

        case '*':
            multiply(firstNumber, secondNumber);
        break;

        case '/':
            if(secondNumber === 0) {
                currentOperation.style.fontSize = '1.8vw';
                currentOperation.textContent = 'Can\'t divide by 0!';
                return;
            }
            divide(firstNumber, secondNumber);
        break;

        case '^':
            powerOf(firstNumber, secondNumber);
        break;

    }

    wasNumber = false;
    calculate = true;
}

function add(a, b) {
    currentOperation.textContent = a + b;
    firstNumber = currentOperation.textContent;
    return +firstNumber;
}

function subtract(a, b) {
    currentOperation.textContent = a - b;
    firstNumber = currentOperation.textContent;
    return +firstNumber;
}

function multiply(a, b) {
    currentOperation.textContent = a * b;
    firstNumber = currentOperation.textContent;
    return +firstNumber;
}

function divide(a, b) {
    currentOperation.textContent = a / b;
    firstNumber = currentOperation.textContent;
    return +firstNumber;
}

function powerOf(a, b) {
    let power = 1;
    for(let i = 0; i < b; i++) {
        power *= a;
    }
    currentOperation.textContent = power;
    firstNumber = currentOperation.textContent;
    return +firstNumber;
}

function reset() {
    if(shouldReset) {
        lastOperation.textContent = currentOperation.textContent;
        currentOperation.textContent = '';
    }
}

function addComa() {
    if(wasNumber) {
        currentOperation.textContent = `${parseFloat(currentOperation.textContent, 10)}.`;
    }
}

function reduceTextSize() {
    if(currentOperation.textContent.length > 15) {
        currentOperation.style.fontSize = '1.5vw';
    }
}

function clear() {
    currentOperation.textContent = '';
    lastOperation.textContent = '';
    wasNumber = false;
}