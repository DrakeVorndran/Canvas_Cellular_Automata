var boardO = boardO || {};

const resetButton = document.getElementById("restart-button");
const randomizeBoardButton = document.getElementById("randomize-board");
const pauseButton = document.getElementById("pause-button");
const delayLabel = document.getElementById("delay-label");
const delayRange = document.getElementById("delay-range");
const stepButton = document.getElementById("step-button");
const randomizeRulesButton = document.getElementById("randomize-rules");
const rulePreset = document.getElementById("rule-preset");

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

randomizeRulesButton.onclick = (e) => {
    randomizeRules();
}

rulePreset.onchange = (e) => {
    if(rulePreset.selectedIndex!=0){
        const presets = {
            "Game of Life":{
                0:[{changeTo:0, conditions:{}},{changeTo: 1, conditions: {1:[3]}}],
                1:[{changeTo: 0, conditions: {1:[0,1,4,5,6,7,8]}},{changeTo:1,conditions:{}}],
                length: 2,
                colors:["white","black","blue","Red"]
            },
            "High Life":{
                0:[{changeTo:0, conditions:{}},{changeTo: 1, conditions: {1:[3,6]}}],
                1:[{changeTo: 0, conditions: {1:[0,1,4,5,6,7,8]}},{changeTo:1,conditions:{}}],
                length: 2,
                colors:["white","black","blue","Red"]
            },

        };


        globalRules = (presets[rulePreset.options[rulePreset.selectedIndex].value]);
        if(globalRules.length === boardO.rules.length){
            boardO.rules = globalRules;
        }
        else{
            boardO.reset(globalRules);
        }

        updateHTML();
    }

}