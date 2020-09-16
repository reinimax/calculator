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
    inputField.value += e.target.textContent;
}));

const operatorButtons = document.querySelectorAll(".operatorBtn");
operatorButtons.forEach(b => b.addEventListener("click", function (e) {
    if (operator === "") {
        tempStore = inputField.value;
        operator = e.target.textContent;
    } else {
        tempStore = operate(parseFloat(tempStore), parseFloat(inputField.value), operator);
        inputField.value = tempStore; //update inputField
        operator = e.target.textContent; //store new operator
    }
    operatorActive = true;
}));

const euqalButton = document.querySelector("#equals");
euqalButton.addEventListener("click", function() {
    if (operator !== "") {
        tempStore = operate(parseFloat(tempStore), parseFloat(inputField.value), operator);
        inputField.value = tempStore; //update inputField
        operator = ""; //reset operator
        
    }
    operatorActive = true;
});

const acButton = document.querySelector("#AC");
acButton.addEventListener("click", function() {
    inputField.value = "0";
    tempStore = "0";
    operator = "";
    operatorActive = true;
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
    if (inputField.value.indexOf(".") === -1) inputField.value += "."; //only add "." if there is not already a dot in the inputField.
});

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
const divide = (a,b) => (b === 0) ? "Don't even try ..." : a / b;
