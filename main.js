const numberBtn = document.querySelectorAll('.numberBtn');
const currentOperation = document.querySelector('.currentOperation');
const lastOperation = document.querySelector('.lastOperation');
const clearBtn = document.querySelector('.clear');
const removeBtn = document.querySelector('.remove');
const operationBtn = document.querySelectorAll('.operationBtn');
const calc = document.querySelector('.calc');
const coma = document.querySelector('.coma');

coma.addEventListener('click', addComa);

function addComa() {
    if(wasNumber) {
        currentOperation.textContent = `${parseFloat(currentOperation.textContent, 10)}.`;
        console.log('coma');
    }
}

function reduceTextSize() {
    if(currentOperation.textContent.length > 15) {
        currentOperation.style.fontSize = '1.5vw';
    }
}

let operator = '';
let firstNumber = null;
let secondNumber = null;
let wasNumber = false;
let calculate = false;
let shouldReset = false;

clearBtn.addEventListener('click', clear);

function clear() {
    currentOperation.textContent = '';
    lastOperation.textContent = '';
}


numberBtn.forEach((button) =>
    button.addEventListener('click', () => {
        reduceTextSize();
        wasNumber = true;
        shouldReset = false;
        currentOperation.textContent += button.value;
    })
);

operationBtn.forEach((button) => 
    button.addEventListener('click', () => {
        if(!wasNumber) {
            currentOperation.textContent = '';
        }
        else {        
            reset();
            calculate = true;
            currentOperation.textContent += button.value;
            lastOperation.textContent += currentOperation.textContent;
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
            divide(firstNumber, secondNumber);
        break;

    }
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

function percent() {

}

function reset() {
    if(shouldReset) {
        lastOperation.textContent = currentOperation.textContent;
        currentOperation.textContent = '';
    }
}