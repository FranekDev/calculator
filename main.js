const numberBtn = document.querySelectorAll('.numberBtn');
const currentOperation = document.querySelector('.currentOperation');
const lastOperation = document.querySelector('.lastOperation');
const clearBtn = document.querySelector('.clear');
const removeBtn = document.querySelector('.remove');
const operationBtn = document.querySelectorAll('.operationBtn');
const calc = document.querySelector('.calc');

let operator = '';
let wasNumber = false;

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
            console.log(operator);
        }
    })
);

removeBtn.addEventListener('click', () => {
    currentOperation.textContent = currentOperation.textContent.toString().slice(0, -1);
});

calc.addEventListener('click', () => {
    lastOperation.textContent += currentOperation.textContent + calc.value;
    operate(operator, lastOperation, currentOperation);
});

function operate(operator, lastOperation, currentOperation) {
    lastOperation = parseInt(lastOperation, 10);
    currentOperation = parseInt(currentOperation, 10);
        
    switch(operator) {

        case '+':
            add(lastOperation, currentOperation);
        break;

        case '-':
            subtract(lastOperation, currentOperation);
        break;

        case '*':
            multiply(lastOperation, currentOperation);
        break;

        case '/':
            divide(lastOperation, currentOperation);
        break;

    }
}

function add(a, b) {
    console.log(a + b);
    currentOperation.textContent = a + b;
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percent() {

}