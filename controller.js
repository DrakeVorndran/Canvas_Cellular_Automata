var boardO = boardO || {};

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
    document.getElementById("x").innerHTML = mousePos.x;
    document.getElementById("y").innerHTML = mousePos.y;
    if(boardO.editible){
        ctx.fillStyle = "grey";
        ctx.fillRect(parseInt(mousePos.x/boardO.px_width)*boardO.px_width,parseInt(mousePos.y/boardO.px_height)*boardO.px_height,boardO.px_width,boardO.px_height);
    }

});


run = function(){
    draw();
    //    boardO.displayMouse();
    if(boardO.running){
        boardO.step();
    }
    window.setTimeout(run, boardO.time);

}

draw = function(){
    //    console.log("im working")
    //    console.log("I drew")
    for(var y = 0; y<boardO.grid.length; y++){
        for(var x = 0; x < boardO.grid[y].length; x++){
            ctx.fillStyle = boardO.colors[boardO.grid[y][x]];
            ctx.fillRect(x*boardO.px_width,y*boardO.px_height,boardO.px_height,boardO.px_width);
            //            ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
        }
    }
}

boardO.init(canvas.height,canvas.width);
boardO.randomize();

boardO.reset();
run();