var boardO = boardO || {};
var numRunning = 0;
let globalRules = {
    0:[{change_to: 1, conditions: {1:[3]}}],
    1:[{change_to: 0, conditions: {1:[0,1,4,5,6,7,8]}}],
    length: 2
};
getMousePos = function(canvas, evt){
    //massive help from https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    var rect = canvas.getBoundingClientRect();
    //    console.log(rect);
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    }
}

canvas = document.getElementById("canvas");

ctx = canvas.getContext("2d");


canvas.addEventListener("mousemove",function(evt){
    var mousePos = getMousePos(canvas, evt);
    if(boardO.editible){
        ctx.fillStyle = "grey";
        ctx.fillRect(parseInt((mousePos.x-3)/boardO.px_width)*boardO.px_width,parseInt((mousePos.y-3)/boardO.px_height)*boardO.px_height,boardO.px_width,boardO.px_height);
    }

});
canvas.addEventListener("mousedown",function(evt){
    var mousePos = getMousePos(canvas, evt);
    if(boardO.editible){
        boardO.grid[parseInt((mousePos.y-3)/boardO.px_height)][parseInt((mousePos.x-3)/boardO.px_width)]++;
        boardO.grid[parseInt((mousePos.y-3)/boardO.px_height)][parseInt((mousePos.x-3)/boardO.px_width)]%=boardO.states;
    }
});


run = function(){
    draw();
    numRunning++;
    //    boardO.displayMouse();
    if(boardO.running){
        boardO.time = document.getElementById("delay-range").value;
        boardO.step();
    }
    document.getElementById("delay-label").innerHTML = document.getElementById("delay-range").value+ " miliseconds"
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
                ctx.fillRect(x*boardO.px_width,y*boardO.px_height,boardO.px_height,boardO.px_width);
            }
            //            ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
        }
    }
}




boardO.init(canvas.height,canvas.width,100);
boardO.randomize();

boardO.reset(globalRules);
run();