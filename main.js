const numberBtn = document.querySelectorAll('.numberBtn');
const currentOperation = document.querySelector('.currentOperation');
const lastOperation = document.querySelector('.lastOperation');
const clearBtn = document.querySelector('.clear');
const removeBtn = document.querySelector('.remove');
const operationBtn = document.querySelectorAll('.operationBtn');
const calc = document.querySelector('.calc');

let operator = '';
let wasNumber = false;
let firstNumber = null;
let secondNumber = null;
let calculate = false;

clearBtn.addEventListener('click', clear);

function clear() {
    currentOperation.textContent = '';
    lastOperation.textContent = '';
}


numberBtn.forEach((button) =>
    button.addEventListener('click', () => {
        wasNumber = true;
        currentOperation.textContent += button.value;
    })
);

operationBtn.forEach((button) => 
    button.addEventListener('click', () => {
        if(!wasNumber) {
            currentOperation.textContent = '';
        }
        else {
            currentOperation.textContent += button.value;
            lastOperation.textContent += currentOperation.textContent;
            currentOperation.textContent = '';
            operator = button.value;
        }
    })
);

removeBtn.addEventListener('click', () => {
    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
    if(currentOperation.textContent.length === 0) {
        wasNumber = false;
    }
});

calc.addEventListener('click', () => {
    lastOperation.textContent += currentOperation.textContent + calc.value;
    operate(operator, lastOperation, currentOperation);
});

function operate(operator, lastOperation, currentOperation) {

    firstNumber = parseInt(lastOperation.textContent, 10);
    secondNumber = parseInt(currentOperation.textContent, 10);
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
    return a + b;
}

function subtract(a, b) {
    currentOperation.textContent = a - b;
    return a - b;
}

function multiply(a, b) {
    currentOperation.textContent = a * b;
    return a * b;
}

function divide(a, b) {
    currentOperation.textContent = a / b;
    return a / b;
}

function percent() {

}