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
let firstNumExitst = false;
let secondNumber = 0; //secont number to be used
let result = 0; //store the result
let resultExist = false; //to check for result 
let usedOperator = ''; //user selected operator

//calculations
let add = (num1, num2) => num1 + num2;
let subtract = (num1, num2) => num1 - num2;
let multiply = (num1, num2) => num1 * num2;
let divide = (num1, num2) => num1 / num2;

numberBTN.forEach(button => {
    button.addEventListener('click', () => {
        updateDisplayValue(button.innerHTML);
    })
});

operatorBTN.forEach(button => {
    button.addEventListener('click', () => {
        usedOperator = button.innerHTML; 
        resultExist == true ? firstNumber = result : firstNumber = currentNumber;
        updateDisplayValue(` ${button.innerHTML} `);
        firstNumExitst = true;

    
    console.log('first +'+firstNumber)

    })
});

//update user display value with button press
function updateDisplayValue(buttonPressed) {

    if (resultExist == true) {
        currentNumber = result;
        resultExist = false;
    } else {
        currentNumber = numberDisplay.textContent;
    }

    console.log('current '+currentNumber)
    
    currentNumber = numberDisplay.textContent = currentNumber + buttonPressed;
    
    if (firstNumExitst == true) calculate();
}

function calculate() {
    
    getSecondNumber()
    operatorSelection();
    resultExist = true;
    console.log('first '+firstNumber)
}

function getSecondNumber() {
    let splited = currentNumber.toString().split(' ');
    console.log(splited)
    secondNumber = splited.pop();
    
    console.log('second '+secondNumber)
    if (secondNumber === '') {
        
        return console.log('no second')
    }
}

function displayResult(solution) {
    resultDisplay.textContent = solution;
    result = solution;
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
    firstNumExitst = false;
};
