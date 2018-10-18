var boardO = boardO || {};

const resetButton = document.getElementById("restart-button");
const randomizeBoardButton = document.getElementById("randomize-board");
const pauseButton = document.getElementById("pause-button");
const delayLabel = document.getElementById("delay-label");
const delayRange = document.getElementById("delay-range");
const stepButton = document.getElementById("step-button");

let mouseOnRange = false;


delayRange.onmouseup = (e) => {
    mouseOnRange = false;
}

delayRange.onmousedown = (e) => {
    mouseOnRange = true;
}


resetButton.onclick = (e) => {
    reset(globalRules);
}

randomizeBoardButton.onclick = (e) => {
    boardO.randomize()
}


stepButton.onclick = (e) => {
    boardO.step();
}