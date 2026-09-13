
// ==========================================
// DISPLAY
// ==========================================

let display = document.getElementById("display");


// ==========================================
// APPEND VALUE
// ==========================================

function appendValue(value) {
    display.value += value;
}


// ==========================================
// CLEAR DISPLAY
// ==========================================

function clearDisplay() {
    display.value = "";
}


// ==========================================
// DELETE LAST CHARACTER
// ==========================================

function deleteLast() {
    display.value = display.value.slice(0, -1);
}


// ==========================================
// CALCULATE
// ==========================================

function calculate() {

    try {

        let expression = display.value;
        let result = eval(expression);

        display.value = result;

        addToHistory(expression, result);

    } catch (error) {

        display.value = "Error";

    }
}


// ==========================================
// HISTORY
// ==========================================

function addToHistory(expression, result) {

    let history =
        JSON.parse(localStorage.getItem("calculatorHistory")) || [];

    history.unshift(expression + " = " + result);

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(history)
    );

    displayHistory();
}


function displayHistory() {

    let historyList =
        document.getElementById("historyList");

    historyList.innerHTML = "";

    let history =
        JSON.parse(localStorage.getItem("calculatorHistory")) || [];

    history.forEach(function(item) {

        let li = document.createElement("li");

        li.textContent = item;

        historyList.appendChild(li);

    });
}


function loadHistory() {
    displayHistory();
}


function clearHistory() {

    localStorage.removeItem("calculatorHistory");

    displayHistory();

}


// ==========================================
// MEMORY
// ==========================================

let memory = 0;


function memoryClear() {
    memory = 0;
}


function memoryRecall() {
    display.value = memory;
}


function memoryAdd() {

    let value = Number(display.value);

    if (!isNaN(value)) {
        memory += value;
    }

}


function memorySubtract() {

    let value = Number(display.value);

    if (!isNaN(value)) {
        memory -= value;
    }

}


// ==========================================
// SCIENTIFIC FUNCTIONS
// ==========================================


// Square Root
function squareRoot() {

    let value = Number(display.value);

    if (!isNaN(value) && value >= 0) {
        display.value = Math.sqrt(value);
    }

}


// Square
function square() {

    let value = Number(display.value);

    if (!isNaN(value)) {
        display.value = value * value;
    }

}


// Power xʸ
function power() {
    display.value += "**";
}


// Sin
function sinValue() {

    let value = Number(display.value);

    if (!isNaN(value)) {

        display.value =
            Math.sin(value * Math.PI / 180);

    }

}


// Cos
function cosValue() {

    let value = Number(display.value);

    if (!isNaN(value)) {

        display.value =
            Math.cos(value * Math.PI / 180);

    }

}


// Tan
function tanValue() {

    let value = Number(display.value);

    if (!isNaN(value)) {

        display.value =
            Math.tan(value * Math.PI / 180);

    }

}


// Log
function logValue() {

    let value = Number(display.value);

    if (!isNaN(value) && value > 0) {

        display.value =
            Math.log10(value);

    }

}


// Natural Log
function lnValue() {

    let value = Number(display.value);

    if (!isNaN(value) && value > 0) {

        display.value =
            Math.log(value);

    }

}


// Reciprocal
function reciprocal() {

    let value = Number(display.value);

    if (!isNaN(value) && value !== 0) {

        display.value =
            1 / value;

    }

}


// ==========================================
// DARK / LIGHT MODE
// ==========================================

function toggleTheme() {

    document.body.classList.toggle("light-mode");

}


// ==========================================
// KEYBOARD SUPPORT
// ==========================================

document.addEventListener("keydown", function(event) {

    let key = event.key;


    if (
        key >= "0" &&
        key <= "9"
    ) {

        appendValue(key);

    }


    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%" ||
        key === "."
    ) {

        appendValue(key);

    }


    if (key === "Enter") {
        calculate();
    }


    if (key === "Backspace") {
        deleteLast();
    }


    if (key === "Escape") {
        clearDisplay();
    }


    if (key === "(") {
        appendValue("(");
    }


    if (key === ")") {
        appendValue(")");
    }

});


// ==========================================
// SOUND SYSTEM
// ==========================================

let audioContext;

let soundEnabled = true;


function playClickSound() {

    if (!soundEnabled) {
        return;
    }


    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }


    if (audioContext.state === "suspended") {
        audioContext.resume();
    }


    let oscillator =
        audioContext.createOscillator();

    let gainNode =
        audioContext.createGain();


    oscillator.type = "square";

    oscillator.frequency.value = 700;


    gainNode.gain.setValueAtTime(
        0.1,
        audioContext.currentTime
    );


    gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.1
    );


    oscillator.connect(gainNode);

    gainNode.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime + 0.1
    );

}


// ==========================================
// SOUND ON / OFF
// ==========================================

function toggleSound() {

    soundEnabled = !soundEnabled;


    let soundButton =
        document.getElementById("soundToggle");


    if (soundEnabled) {

        soundButton.textContent =
            "🔊 Sound ON";

    } else {

        soundButton.textContent =
            "🔇 Sound OFF";

    }

}


// ==========================================
// PREMIUM THEMES
// ==========================================

function changeTheme() {

    let theme =
        document.getElementById("themeSelector").value;


    // Remove all old themes

    document.body.classList.remove(
        "ocean-theme",
        "purple-theme",
        "sunset-theme",
        "matrix-theme"
    );


    // Apply selected theme

    if (theme === "ocean") {

        document.body.classList.add(
            "ocean-theme"
        );

    }

    else if (theme === "purple") {

        document.body.classList.add(
            "purple-theme"
        );

    }

    else if (theme === "sunset") {

        document.body.classList.add(
            "sunset-theme"
        );

    }

    else if (theme === "matrix") {

        document.body.classList.add(
            "matrix-theme"
        );

    }


    // Save selected theme

    localStorage.setItem(
        "calculatorTheme",
        theme
    );

}


// ==========================================
// LOAD SAVED THEME
// ==========================================

function loadSavedTheme() {

    let savedTheme =
        localStorage.getItem("calculatorTheme") ||
        "default";


    let themeSelector =
        document.getElementById("themeSelector");


    themeSelector.value = savedTheme;


    changeTheme();

}


// ==========================================
// BUTTON SOUND
// ==========================================

document
    .querySelectorAll(".calculator button")
    .forEach(function(button) {

        if (button.id !== "soundToggle") {

            button.addEventListener(
                "click",
                playClickSound
            );

        }

    });


// ==========================================
// PAGE LOAD
// ==========================================

window.addEventListener("load", function() {

    loadHistory();

    loadSavedTheme();

});