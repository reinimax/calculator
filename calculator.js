/*
How does a calculator work?
- numbers are typed in
- then an operator is hit
- then other numbers are entered and so on, until
- = is hit, then the result is computed

~ When an operator is hit the first time, the number is stored in a variable and the inputfield cleared.
~ When an operator is hit the second and following times, the result of the previous variable and the current number is resolved and stored again.
...
so, when I hit an operator:
IF tempStore is empty and operatorStore is empty: (first time hitting operator)
- Store inputField.value in tempStore.
- Store operator in operatorStore.
- clear InputField
ELSE: (second or other time hitting operator)
- tempStore = tempStore operatorStore inputField.value (probably needs to be conditional - function call depending on which value in operatorStore?)
- Store new operator in operatorStore
- clear InputField
*/

const inputField = document.querySelector("#inputField");
inputField.value = "0";

let tempStore = "";
let operator = "";
let operatorActive = true;

const numberButtons = document.querySelectorAll(".numberBtn");
numberButtons.forEach(b => b.addEventListener("click", function (e) {
    if (operatorActive) {
        inputField.value = ""; // reset Inputfield
        operatorActive = false; //reset, so that more numbers can be entered
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
    tempStore = operate(parseFloat(tempStore), parseFloat(inputField.value), operator);
    inputField.value = tempStore; //update inputField
    operator = ""; //reset operator
    operatorActive = true;
});

const acButton = document.querySelector("#AC");
acButton.addEventListener("click", function() {
    inputField.value = "0";
    tempStore = "";
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

function add(a,b) {
    return a + b; 
} 

function subtract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}
