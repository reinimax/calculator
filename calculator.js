const inputField = document.querySelector("#inputField");
inputField.value = "0";
let tempStore = "0";
let operator = "";
let operatorActive = true;

const numberButtons = document.querySelectorAll(".numberBtn");
numberButtons.forEach(b => b.addEventListener("click", function (e) {
    if (operatorActive) {
        inputField.value = ""; 
        operatorActive = false; // this means more numbers can be entered until "=" or an operator is clicked
    }
    if (inputField.value.length <= 12) inputField.value += e.target.textContent;
    enableButtons();
}));

const operatorButtons = document.querySelectorAll(".operatorBtn");
operatorButtons.forEach(b => b.addEventListener("click", function (e) {
    if (operator === "") {
        tempStore = inputField.value;
        operator = e.target.textContent;
    } else if (checkDisabled()) { //if an operator-Button has been previously clicked, don't calculate, but update the operator
        operator = e.target.textContent;
    } else { 
        tempStore = (operate(parseFloat(tempStore), parseFloat(inputField.value), operator)).toString();
        inputField.value = tempStore.substr(0,13); //update inputField
        inputField.value = correctFloatError(inputField.value);
        operator = e.target.textContent; //store new operator
    }
    operatorActive = true;
    enableButtons();
    e.target.disabled = true; //disable button
    cButton.disabled = true;
    invertButton.disabled = true;
}));

const euqalButton = document.querySelector("#equals");
euqalButton.addEventListener("click", function(e) {
    if (operator !== "") {
        tempStore = (operate(parseFloat(tempStore), parseFloat(inputField.value), operator)).toString();
        inputField.value = tempStore.substr(0,13);
        console.log(correctFloatError(inputField.value));
        inputField.value = correctFloatError(inputField.value);
        operator = ""; //reset operator
        
    }
    operatorActive = true;
    enableButtons();
});

const acButton = document.querySelector("#AC");
acButton.addEventListener("click", function() {
    inputField.value = "0";
    tempStore = "0";
    operator = "";
    operatorActive = true;
    enableButtons();
});

const cButton = document.querySelector("#C");
cButton.addEventListener("click", function() {
    inputField.value = inputField.value.substring(0,inputField.value.length-1);
});

const invertButton = document.querySelector("#invert");
invertButton.addEventListener("click", function() {
    if (inputField.value[0] === "-") {
        inputField.value = inputField.value.substring(1,inputField.value.length);
    } else {
        inputField.value = `-${inputField.value}`;
    }
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", function() {
    if (operatorActive) {
        inputField.value = "0";
        operatorActive = false;
    }
    if (inputField.value.indexOf(".") === -1 && inputField.value.length <= 11) inputField.value += "."; //only add "." if there is not already a dot in the inputField and enough space for at least 1 additional number.
});

function enableButtons() {
    operatorButtons.forEach(b => b.disabled = false);
    cButton.disabled = false;
    invertButton.disabled = false;
}

function checkDisabled() {
    for (let i = 0; i < operatorButtons.length; i++) {
        if (operatorButtons[i].disabled === true) return true;
    }
    return false;
}

function correctFloatError(numAsString) {   //remove 0's until a number or decimal point is reached   
    if (!numAsString.includes(".")) return numAsString;
    for (let i = numAsString.length-1; i > 0; i--) {
        if (numAsString.charAt(i) !== "0") return numAsString;
        numAsString = numAsString.substr(0,i);
        console.log(numAsString);
    }
    return numAsString;
}

function operate(a,b,operator) {
    switch (operator) {
        case "+": return add(a,b); //note for myself: when nesting callback functions, each one needs to return something!  
        case "-": return subtract(a,b);   
        case "x": return multiply(a,b);  
        case "/": return divide(a,b);
    }
}

const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => (b === 0) ? "Don't try ..." : a / b;
