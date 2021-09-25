const numberBTN = document.querySelectorAll('[data-number]');
const operatorBTN = document.querySelectorAll('[data-operator]');
const pointBTN = document.querySelector('[data-point]');
const equalsBTN = document.querySelector('[data-equals]');
const backBTN = document.querySelector('[data-back]');
const clearBTN = document.querySelector('[data-clear]');
const display = document.getElementById('user-value');
const resultDisplay = document.getElementById('result');

window.onload = () => document.body.classList.remove("preload");
window.addEventListener('keyup', keyPress);
clearBTN.onclick = () => clearScreen();
pointBTN.onclick = () => addPoint();
backBTN.onclick = () => backspace();

let firstNumber = '';
let firstNumExitst = false;
let secondNumber = ''; 
let result = ''; 
let resultExist = false; 
let usedOperator = '';

function keyPress(e) {
    if (e.key >= 0 && e.key <= 9) numberUpdate(e.key);
    if (e.key === '.') addPoint();
    if (e.key === 'Backspace') backspace();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '+' || e.key === '-' || e.key === '%' || e.key === '^') operatorUpdate(e.key);
    if (e.key === '*') operatorUpdate('×');
    if (e.key === '/') operatorUpdate('÷');
}

numberBTN.forEach(button => {
    button.addEventListener('click', () => {numberUpdate(button.textContent)});
})

operatorBTN.forEach(button => {
    button.addEventListener('click', () => {operatorUpdate(button.textContent)});
})

function numberUpdate(number) {
    display.textContent + number;
    updateDisplay(number);
    if (firstNumExitst == true) calculate();
}

function addPoint() {
    display.textContent === '' ? numberUpdate('0') : false
    if (!firstNumExitst && display.textContent.includes('.')) return;
    if (firstNumExitst) {
        getSecondNumber();
        if (secondNumber === '') numberUpdate('0');
        if (secondNumber.includes('.')) return;
    }
    numberUpdate('.')
}

function operatorUpdate(operator) {
    if (display.textContent.slice(-1) === ' '){
        display.textContent = display.textContent.slice(0,-3)
    }
    usedOperator = operator;
    resultExist == true ? firstNumber = result : firstNumber = display.textContent;
    firstNumExitst = true;
    let type = 'symbol';
    updateDisplay(` ${operator} `,type);
}

function backspace() {
    let sliced = display.textContent.slice(-1);
    if (sliced === ' ') {
        display.textContent = display.textContent.slice(0, -3);
        firstNumExitst = false;
        resultDisplay.textContent = '';
        resultExist = false;
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
    if (firstNumExitst) calculate();
}

function calculate() {
    getSecondNumber()
    operatorSelection();
    resultExist = true
}

function getSecondNumber() {
    let splited = display.textContent.toString().split(' ');
    secondNumber = splited.pop();
}

function displayResult(solution) {
    solution = Math.round(solution * 1000) / 1000;
    resultDisplay.textContent = solution.toLocaleString();
    result = solution;
}

function clearScreen() {
    firstNumber = '';
    firstNumExitst = false
    secondNumber = '';
    usedOperator = '';
    result = '';
    resultExist = false;
    display.textContent = '';
    resultDisplay.textContent = '';
}

function operatorSelection() {
let a = Number(firstNumber),b = Number(secondNumber);
    switch (usedOperator) {
        case '+':
            return displayResult(a + b);
        case '-':
            return displayResult(a - b);
        case '×':
            return displayResult(a * b);
        case '÷':
            return displayResult(b === 0 ? false : a / b);
        case '%':
            return displayResult((a / 100) * b);
        case '^':
            return displayResult(Math.pow(a, b));
    }
};

function updateDisplay(buttonPressed,type) {
    let lastValue = display.textContent;
    if (resultExist == true && type === 'symbol') lastValue = result;
    display.textContent = lastValue + buttonPressed
}