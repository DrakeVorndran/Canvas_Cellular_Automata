const canvas = document.getElementById('canvas');
const height = canvas.height;
console.log(height);
const width = canvas.width;
console.log(width);
const size = 100;
const px_height =  height/size;
const px_width = parseInt(width/size*(height/width));
//console.log(px_width)
const grid_height = height/px_height;
const grid_width = parseInt(width/px_width);
//console.log(grid_width);
let time;
let ctx;
let grid;
let states;
let colors;
let wraping;
let running;
let rules;
reset = function(){
    time = 0;
    ctx = canvas.getContext("2d");
    grid = new Array(grid_height);
    states = 2;
    colors = ["white","black","blue"];
    wraping = true;
    running = true;
    rules = {
        0:[{change_to: 1, conditions: {1:[3]}}], //changeto is what it could change to, and can have multiple change rules, conditions is how it changes to that
        1:[{change_to: 0, conditions: {1:[0,1,4,5,6,7,8]}}]
    }

    //grid.fill(new Array(grid_width))
    for(var i = 0; i<grid.length; i++){
        grid[i] = new Array(grid_width);
        grid[i].fill(0);
        //    console.log(i);
    }
}
//console.log(grid);

//ctx.fillRect(25, 25, 100, 100);
//ctx.clearRect(45, 45, 60, 60);
//ctx.strokeRect(50, 50, 50, 50);
//ctx.fillStyle="blue";
//ctx.fillRect(20,20,100,100);



draw_checkerboard = function(){
    for(var y = 0; y<grid.length; y++){
        for(var x = 0; x < grid[y].length; x++){
            //            console.log(y+x)
            if((x+y)%2===0){
                grid[y][x] = 1;
            }
        }
    }
}

update = function(){
    let changes = []
    for(var y = 0; y<grid.length; y++){
        for(var x = 0; x < grid[y].length; x++){
            let neighbors = checker(x,y);
            //            if(grid[y][x]===1){
            //                console.log(neighbors);
            //            }
            for(var i = 0; i<rules[grid[y][x]].length; i++){
                let rule = rules[grid[y][x]][i];
                for(var check in neighbors){
                    if(check in rule.conditions){
                        condition = rule.conditions[check];
                        if(condition.includes(neighbors[check])){
                            changes.push([x,y,rule.change_to]);
                        }
                    }

                }
            }
        }

    }
    for(var i in changes){
        //        console.log(i);
        grid[changes[i][1]][changes[i][0]] = changes[i][2];
    }
}



checker = function(x,y){
    let neighbors = {};

    for( var i = 0; i<states; i++) {
        neighbors[i] = 0;
    }
    let checkposX = [x];
    let checkposY = [y];
    let allchecked = [];

    if(wraping){ //finding all the neighbors
        checkposX.push((x+1)%grid_width); 
        checkposY.push((y+1)%grid_height);
        if(x===0){
            checkposX.push(grid_width-1);
        }
        else{
            checkposX.push(x-1);
        }
        if(y===0){
            checkposY.push(grid_height-1);
        }
        else{
            checkposY.push(y-1);

        }
    }
    else{
        if(x!=0){
            checkposX.push(x-1);
        }
        if(y!=0){
            checkposY.push(y-1);
        }
        if(x!=grid_width-1){
            checkposX.push(x+1)
        }
        if(y!=grid_height-1){
            checkposY.push(y+1)
        }
    }

    for(var i = 0; i < checkposY.length; i++){ //loop through both lists checking all the neighbors the cell has
        //        console.log(checkposX,checkposY)
        for(var j = 0; j < checkposX.length; j++){
            if((j!=0 || i!=0)){
                neighbors[grid[checkposY[i]][checkposX[j]]]++;
            }
        }

    }
    //    if(grid[y][x]==1){
    //        console.log(x,y,neighbors,allchecked);
    //    }

    return neighbors;
}


draw = function(){
    for(var y = 0; y<grid.length; y++){
        for(var x = 0; x < grid[y].length; x++){
            ctx.fillStyle = colors[grid[y][x]];
            ctx.fillRect(x*px_width,y*px_height,px_height,px_width);
            //            ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
        }
    }
}

randomize = function(){
    for(var y in grid){
        for(var x in grid[y]){
//            console.log(parseInt(Math.random()*states));
            grid[y][x] = parseInt(Math.random()*states);
        }
    }
}


pause = function(){
    running = false
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","play();");
    button.innerHTML="Play";
}

play = function(){
    running = true;
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","pause();");
    button.innerHTML="Pause";

    run();
}

run = function(){
    update();
    //    grid[5][9] = 1;
    //    grid[6][9] = 1;
    //    grid[7][9] = 1;
    draw();
    //    console.log(grid[6][6])
    //    console.log(grid[0]);
    //    running = true;
    if(running){
        window.setTimeout(run,time);
    }
}

//draw_checkerboard()
make_glider = function(){
    grid[6][6] = 1;
    grid[7][6] = 1;
    grid[8][6] = 1;
    grid[8][7] = 1;
    grid[7][8] = 1;
}
//grid[20][20] = 3;
//console.log(grid);
//make_glider();
//grid[5][5] = 1;
reset()
run();