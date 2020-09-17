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
    } else {
        tempStore = (operate(parseFloat(tempStore), parseFloat(inputField.value), operator)).toString();
        inputField.value = tempStore.substr(0,13); //update inputField
        operator = e.target.textContent; //store new operator
    }
    operatorActive = true;
    enableButtons();
    e.target.disabled = true; //disable button
}));

const euqalButton = document.querySelector("#equals");
euqalButton.addEventListener("click", function(e) {
    if (operator !== "") {
        tempStore = (operate(parseFloat(tempStore), parseFloat(inputField.value), operator)).toString();
        inputField.value = tempStore.substr(0,13);
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
    tempStore = inputField.value;
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", function() {
    if (operatorActive) {
        inputField.value = "0";
        operatorActive = false;
    }
    if (inputField.value.indexOf(".") === -1 && inputField.value.length <= 11) inputField.value += "."; //only add "." if there is not already a dot in the inputField.
});

function enableButtons() {
    operatorButtons.forEach(b => b.disabled = false);
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
