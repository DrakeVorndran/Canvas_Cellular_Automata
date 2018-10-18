var boardO = boardO || {};

const resetButton = document.getElementById("restart-button");
const randomizeBoardButton = document.getElementById("randomize-board");
const pauseButton = document.getElementById("pause-button");
const delayLabel = document.getElementById("delay-label");
const delayRange = document.getElementById("delay-range");
const stepButton = document.getElementById("step-button");
delayRange.onchange = (e) => {
    delayLabel.innerHTML = String(delayRange.value)+" miliseconds";
}

resetButton.onclick = (e) => {
    reset(globalRules);
}

randomizeBoardButton.onclick = (e) => {
    boardO.randomize()
}

pauseButton.onclick = (e) => {
    console.log("hi")
}

stepButton.onclick = (e) => {
    boardO.step();
}