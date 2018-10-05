const canvas = document.getElementById('canvas');
const height = 400;
const width = 400;
const size = 100;
const px_height =  height/size;
const px_width = width/size;
const grid_height = height/px_height;
const grid_width = width/px_width;
let time = 0;
let ctx = canvas.getContext("2d");
let grid = new Array(grid_height);
let states = 3;
let colors = ["white","black"];
let wraping = true;
let running = true;
let rules = {
    0:[{change_to: 1, conditions: {1:[3]}}], //changeto is what it could change to, and can have multiple change rules, conditions is how it changes to that
    1:[{change_to: 0, conditions: {1:[1,4,5,6,7,8], 0:[8], 2:[8]}}]
}
//grid.fill(new Array(grid_width))
for(var i = 0; i<grid.length; i++){
    grid[i] = new Array(grid_width);
    grid[i].fill(0);
    //    console.log(i);
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
            let rule = rules[grid[y][x]][0];
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
    for(var i in changes){
        //        console.log(i);
        grid[changes[i][1]][changes[i][0]] = changes[i][2];
    }
}



checker = function(x,y){
    let neighbors = {};
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
                if(grid[checkposY[i]][checkposX[j]] in neighbors){
                    neighbors[grid[checkposY[i]][checkposX[j]]]++;
                }
                else{
                    neighbors[grid[checkposY[i]][checkposX[j]]] = 1;
                }
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
            ctx.fillRect(x*px_width,y*px_height,4,4);
            //            ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
        }
    }
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
//grid[20][20] = 2;
//console.log(grid);
make_glider();
//grid[5][5] = 1;
run();