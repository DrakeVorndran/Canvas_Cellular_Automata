var boardO = boardO || {};
var numRunning = 0;
let globalRules = {
    0:[{changeTo:0, conditions:{}},{changeTo: 1, conditions: {1:[3]}}],
    1:[{changeTo: 0, conditions: {1:[0,1,4,5,6,7,8]}},{changeTo:1,conditions:{}}],
    length: 2,
    colors:["white","black","blue","Red"]
};
rulePreset.selectedIndex = 1;
getMousePos = function(canvas, evt){
    //massive help from https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    var rect = canvas.getBoundingClientRect();
    //    console.log(rect);
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


canvas.addEventListener("mousemove",function(evt){
    var mousePos = getMousePos(canvas, evt);
    if(boardO.editible){
        ctx.fillStyle = "grey";
        ctx.fillRect(parseInt((mousePos.x-3)/boardO.pxWidth)*boardO.pxWidth,parseInt((mousePos.y-3)/boardO.pxHeight)*boardO.pxHeight,boardO.pxWidth,boardO.pxHeight);
    }

});
canvas.addEventListener("mousedown",function(evt){
    var mousePos = getMousePos(canvas, evt);
    if(boardO.editible){
        boardO.grid[parseInt((mousePos.y-3)/boardO.pxHeight)][parseInt((mousePos.x-3)/boardO.pxWidth)]++;
        boardO.grid[parseInt((mousePos.y-3)/boardO.pxHeight)][parseInt((mousePos.x-3)/boardO.pxWidth)]%=boardO.states;
    }
});


run = function(){
    draw();
    numRunning++;
    if(mouseOnRange){
        delayLabel.innerHTML = String(delayRange.value)+" miliseconds";
    }
    //    boardO.displayMouse();
    if(boardO.running){
        boardO.time = document.getElementById("delay-range").value;
        boardO.step();
    }
    if(numRunning === 1){
        numRunning--;
        window.setTimeout(run, boardO.time);
    }

}

draw = function(){
    //    console.log("im working")
    //    console.log("I drew")
    for(var y = 0; y<boardO.grid.length; y++){
        for(var x = 0; x < boardO.grid[y].length; x++){
            if(boardO.oldBoard[y][x]!=boardO.grid[y][x] || !boardO.running){
                ctx.fillStyle = boardO.colors[boardO.grid[y][x]];
                ctx.fillRect(x*boardO.pxWidth,y*boardO.pxHeight,boardO.pxHeight,boardO.pxWidth);
            }
            //            ctx.fillRect(x*pxWidth,y*pxHeight,pxWidth,pxHeight);
        }
    }
}



reset = function(r){
    boardO.reset(globalRules)
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,canvas.width, canvas.height)
}




boardO.init(canvas.height,canvas.width,100);
updateHTML()

boardO.reset(globalRules);
setListeners()
run();