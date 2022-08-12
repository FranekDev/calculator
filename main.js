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

coma.addEventListener('click', addComa);

clearBtn.addEventListener('click', clear);

numberBtn.forEach((button) =>
    button.addEventListener('click', () => {
        currentOperation.style.fontSize = '27px';
        reduceTextSize();
        wasNumber = true;
        currentOperation.textContent += button.value;
    })
);

operationBtn.forEach((button) => 
    button.addEventListener('click', () => {

        if(calculate) {
            wasNumber = true;
        }

        calculate = false;

        if(!wasNumber) {
            lastOperation.textContent = currentOperation.textContent;
            currentOperation.textContent = '';
        }
        else{        
            nextOperation();
            lastOperation.textContent = currentOperation.textContent + button.value;
            operator = button.value;
            currentOperation.textContent = '';
        }

    })
);

function nextOperation() {
    if(calculate){
        lastOperation.textContent += currentOperation.textContent;
    }
}

removeBtn.addEventListener('click', () => {
    currentOperation.textContent = currentOperation.textContent.slice(0, -1);
    if(currentOperation.textContent.length === 0) {
        wasNumber = false;
    }
});

calc.addEventListener('click', () => {
    lastOperation.textContent += currentOperation.textContent + calc.value;
    operate(operator, lastOperation, currentOperation);
    calculate = true;
});

function operate(operator, lastOperation, currentOperation) {
    calculate = true;
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
}

function add(a, b) {
    currentOperation.textContent = a + b;
    firstNumber = parseFloat(currentOperation.textContent, 10);
    return firstNumber;
}

function subtract(a, b) {
    currentOperation.textContent = a - b;
    firstNumber = parseFloat(currentOperation.textContent, 10);
    return firstNumber;
}

function multiply(a, b) {
    currentOperation.textContent = a * b;
    firstNumber = parseFloat(currentOperation.textContent, 10);
    return firstNumber;
}

function divide(a, b) {
    currentOperation.textContent = a / b;
    firstNumber = parseFloat(currentOperation.textContent, 10);
    return firstNumber;
}

function powerOf(a, b) {
    let power = 1;

    for(let i = 0; i < b; i++) {
        power *= a;
    }
    
    currentOperation.textContent = power;
    firstNumber = parseFloat(currentOperation.textContent, 10);
    return firstNumber;
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