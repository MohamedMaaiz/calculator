//selectors
const numberBTN = document.querySelectorAll('[data-number]');
const operatorBTN = document.querySelectorAll('[data-operator]');
const pointBTN = document.querySelector('[data-point]');
const equalsBTN = document.querySelector('[data-equals]');
const backBTN = document.querySelector('[data-back]');
const clearBTN = document.querySelector('[data-clear]');
const numberDisplay = document.getElementById('user-value');
const resultDisplay = document.getElementById('result');

window.addEventListener('keyup', keyPress);
equalsBTN.onclick = () => calculate();
clearBTN.onclick = () => clearScreen();
pointBTN.onclick = () => addPoint();
backBTN.onclick = () => backspace();

//current values
let currentNumber = ''; //the number on the screen
let firstNumber = ''; //first number to be used
let firstNumExitst = false;
let secondNumber = ''; //secont number to be used
let result = ''; //store the result
let resultExist = false; //to check for result 
let usedOperator = ''; //user selected operator

function keyPress(e) {
    if (e.key >= 0 && e.key <= 9) numberUpdate(e.key);
    if (e.key === '.') addPoint();
    if (e.key === 'Backspace') backBTN();
    if (e.key === 'Escape') clearScreen();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
}

numberBTN.forEach(button => {
    button.addEventListener('click', () => {numberUpdate(button.textContent)});
})

operatorBTN.forEach(button => {
    button.addEventListener('click', () => {operatorUpdate(button.textContent)});
})

function numberUpdate(number) {
    currentNumber += number;
    updateDisplayValue(number);
    if (firstNumExitst == true) calculate();
}

function addPoint() {
    currentNumber === '' ? numberUpdate('0.') : false
    if (!firstNumExitst && currentNumber.includes('.')) return;
    if (firstNumExitst) {
        getSecondNumber();
        if (secondNumber === '') numberUpdate('0.');
        if (secondNumber.includes('.')) return;
    }
}

function operatorUpdate(operator) {
    if (numberDisplay.textContent.slice(-1) === ' '){
        currentNumber = numberDisplay.textContent = numberDisplay.textContent.slice(0,-3)
    }
    usedOperator = operator;
    resultExist == true ? firstNumber = result : firstNumber = currentNumber;
    firstNumExitst = true;
    let type = 'symbol';
    updateDisplayValue(` ${operator} `,type);
}

function backspace() {
    let sliced = numberDisplay.textContent.slice(-1);
    if (sliced === ' ') {
        currentNumber = numberDisplay.textContent = numberDisplay.textContent.slice(0, -3);
        firstNumExitst = false;
        resultDisplay.textContent = '';
        resultExist = false;
    } else {
        currentNumber = numberDisplay.textContent = numberDisplay.textContent.slice(0, -1);
    }
    if (firstNumExitst) calculate();
}

function calculate() {
    getSecondNumber()
    operatorSelection();
    resultExist = true
}

function getSecondNumber() {
    let splited = currentNumber.toString().split(' ');
    secondNumber = splited.pop();
}

function displayResult(solution) {
    solution = Math.round(solution * 1000) / 1000;
    resultDisplay.textContent = solution;
    result = solution;
}

function clearScreen() {
    currentNumber = '';
    firstNumber = '';
    firstNumExitst = false
    secondNumber = '';
    usedOperator = '';
    result = '';
    resultExist = false;
    numberDisplay.textContent = '';
    resultDisplay.textContent = '';
}

//update user display value with button press
function updateDisplayValue(buttonPressed,type) {
    let lastValue = numberDisplay.textContent;
    if (resultExist == true && type === 'symbol') lastValue = result;
    currentNumber = lastValue + buttonPressed
    numberDisplay.textContent = currentNumber
}

function operatorSelection() {
let a = Number(firstNumber),b = Number(secondNumber);
    switch (usedOperator) {
        case '+':
            return displayResult(add(a, b));
        case '-':
            return displayResult(subtract(a, b));
        case 'x':
            return displayResult(multiply(a, b));
        case '÷':
            return displayResult(divide(a, b));
        default:
            break;
    }
};

//calculations
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => b === 0 ? false : a / b;