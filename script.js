const CORRECT_PASSWORD = 1234;
let balance = 10000;
let currentMode = "PIN";

const screenTitle = document.getElementById("screen-title");
const screenMsg = document.getElementById("screen-msg");
const pinDisplay = document.getElementById("pin-display");
const amountInput = document.getElementById("amount-input");
const operationsMenu = document.getElementById("operations-menu");
const keypad = document.getElementById("hardware-keypad");

function appendDigit(digit) {
    if (currentMode === "PIN") {
        if (pinDisplay.value.length < 4) {
            pinDisplay.value += digit;
        }
    } else if (currentMode === "WITHDRAW" || currentMode === "DEPOSIT") {
        amountInput.value += digit;
    }
}

function clearDisplay() {
    if (currentMode === "PIN") {
        pinDisplay.value = "";
    } else {
        amountInput.value = "";
    }
}

function submitEntry() {
    if (currentMode === "PIN") {
        let enteredPin = parseInt(pinDisplay.value);
        if (enteredPin === CORRECT_PASSWORD) {
            showMenu();
        } else {
            screenMsg.innerText = "ACCESS DENIED. Incorrect security PIN. Please try again.";
            screenMsg.style.color = "#e74c3c";
            pinDisplay.value = "";
        }
    } else if (currentMode === "WITHDRAW") {
        let amount = parseFloat(amountInput.value);
        if (amount > balance) {
            screenMsg.innerText = "TRANSACTION DECLINED. Insufficient funds available.";
            screenMsg.style.color = "#e74c3c";
        } else if (amount <= 0 || isNaN(amount)) {
            screenMsg.innerText = "ERROR. Please enter a valid transaction amount.";
            screenMsg.style.color = "#e74c3c";
        } else {
            balance -= amount;
            screenMsg.style.color = "#2ecc71";
            screenMsg.innerText = `TRANSACTION SUCCESSFUL. New Account Balance: $${balance.toFixed(2)}`;
            setTimeout(showMenu, 3000);
        }
    } else if (currentMode === "DEPOSIT") {
        let amount = parseFloat(amountInput.value);
        if (amount > 0) {
            balance += amount;
            screenMsg.style.color = "#2ecc71";
            screenMsg.innerText = `DEPOSIT SUCCESSFUL. Your new Balance is: $${balance.toFixed(2)}`;
            setTimeout(showMenu, 3000);
        } else {
            screenMsg.innerText = "ERROR. Please enter a valid deposit amount.";
            screenMsg.style.color = "#e74c3c";
        }
    }
}

function showMenu() {
    currentMode = "MENU";
    screenTitle.innerText = "MAIN OPERATIONS DASHBOARD";
    screenTitle.style.color = "var(--primary)";
    screenMsg.innerText = "Select an operation from the options below:";
    screenMsg.style.color = "var(--primary-light)";
    
    pinDisplay.classList.add("hidden");
    amountInput.classList.add("hidden");
    operationsMenu.classList.remove("hidden");
    keypad.classList.add("hidden");
}

function checkBalance() {
    screenMsg.style.color = "var(--primary-light)";
    screenMsg.innerText = `Your total available balance is: $${balance.toFixed(2)}`;
}

function showWithdraw() {
    currentMode = "WITHDRAW";
    screenTitle.innerText = "CASH WITHDRAWAL FACILITY";
    screenMsg.innerText = "Type the amount you wish to withdraw, then press ENTER:";
    screenMsg.style.color = "var(--primary-light)";
    amountInput.value = "";
    amountInput.classList.remove("hidden");
    operationsMenu.classList.add("hidden");
    keypad.classList.remove("hidden");
}

function showDeposit() {
    currentMode = "DEPOSIT";
    screenTitle.innerText = "CASH DEPOSIT FACILITY";
    screenMsg.innerText = "Type the amount you want to deposit, then press ENTER:";
    screenMsg.style.color = "var(--primary-light)";
    amountInput.value = "";
    amountInput.classList.remove("hidden");
    operationsMenu.classList.add("hidden");
    keypad.classList.remove("hidden");
}

function exitATM() {
    currentMode = "PIN";
    pinDisplay.value = "";
    amountInput.value = "";
    
    screenTitle.innerText = "SESSION TERMINATED";
    screenMsg.innerText = "Thank you for choosing Quantum Capital. Have a secure day.";
    screenMsg.style.color = "var(--primary-light)";
    operationsMenu.classList.add("hidden");
    
    setTimeout(() => {
        screenTitle.innerText = "ACCESS SECURED GATEWAY";
        screenMsg.innerText = "Please use the keypad to enter your 4-digit security PIN.";
        pinDisplay.classList.remove("hidden");
        keypad.classList.remove("hidden");
    }, 2500);
}