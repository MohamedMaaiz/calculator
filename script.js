//selectors
const numberBTN = document.querySelectorAll('[data-Number]');
const operatorBTN = document.querySelectorAll('[data-operator]');
const equalsBTN = document.querySelector('[data-equals]');
const clearBTN = document.querySelector('[data-clear]');
const numberDisplay = document.getElementById('user-value');
const resultDisplay = document.getElementById('result');

equalsBTN.onclick = () => calculate();
clearBTN.onclick = () => clearScreen();

//current values
let currentNumber = 0; //the number on the screen
let firstNumber = 0; //first number to be used
let secondNumber = 0; //secont number to be used
let result = 0; //store the result
let resultExist = false; //to check for result 
let usedOperator = ''; //user selected operator

numberBTN.forEach(button => {
    button.addEventListener('click', () => {
        updateUserValue(button.innerHTML);
    })
});

operatorBTN.forEach(button => {
    button.addEventListener('click', () => {
        usedOperator = button.innerHTML;
        if (resultExist == true) {
            firstNumber = result;
        } else {
            firstNumber = currentNumber;
        }
        let symbolWithSpaces = ` ${button.innerHTML} `
        updateUserValue(symbolWithSpaces);
    })
});

function calculate() {
    let splited = currentNumber.toString().split(' ');
    secondNumber = splited.pop();
    operatorSelection();
}

function operatorSelection() {
    
    switch (usedOperator) {
        case '+':
            displayResult(add(parseInt(firstNumber), parseInt(secondNumber)));
            break;
        case '-':
            displayResult(subtract(parseInt(firstNumber), parseInt(secondNumber)));
            break;
        case 'x':
            displayResult(multiply(parseInt(firstNumber), parseInt(secondNumber)));
            break;
        case '÷':
            displayResult(divide(parseInt(firstNumber), parseInt(secondNumber)));
            break;
        default:
            break;
    }
};

function displayResult(solution) {
    resultDisplay.textContent = solution;
    result = solution;
    resultExist = true;
}

//calculations
let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

//update user display value with button press
function updateUserValue(newValue) {
    // if (resultExist == true) {
    //     let currentValue = result;
    //     currentNumber =
    //     console.log(result)
    //     return;
    // }
    let currentValue = numberDisplay.textContent;
    currentNumber = numberDisplay.textContent = currentValue + newValue;
}

function clearScreen() {
    currentNumber = 0;
    firstNumber = 0;
    secondNumber = 0;
    usedOperator = '';
    result = 0;
    resultExist = false;
    numberDisplay.textContent = '';
    resultDisplay.textContent = '';
}
