var boardO = boardO || {};


boardO.init = function(height, width){
//    this.canvas = document.getElementById('canvas');
    this.height = height;
    this.width = width;
//    console.log(width,t);
    this.size = 100;
    this.px_height =  this.height/this.size;
    this.px_width = parseInt(this.width/this.size*(this.height/this.width));
    //console.log(px_width)
    this.grid_height = this.height/this.px_height;
    this.grid_width = parseInt(this.width/this.px_width);
    //console.log(grid_width);
    this.time;
//    this.ctx;
    this.grid;
    this.states;
    this.colors;
    this.wraping;
    this.running;
    this.rules;
    this.editible = false;
}

boardO.reset = function(){
    this.time = 0;
//    this.ctx = this.canvas.getContext("2d");
    this.grid = new Array(this.grid_height);
    this.states = 2;
    this.colors = ["white","black","blue"];
    this.wraping = true;
    this.running = true;
    this.editible = false;
    
    this.rules = {
        0:[{change_to: 1, conditions: {1:[3]}}], //changeto is what it could change to, and can have multiple change rules, conditions is how it changes to that
        1:[{change_to: 0, conditions: {1:[0,1,4,5,6,7,8]}}]
    }

    //grid.fill(new Array(grid_width))
    for(var i = 0; i<this.grid.length; i++){
        this.grid[i] = new Array(this.grid_width);
        this.grid[i].fill(0);
        //    console.log(i);
    }
}
//console.log(grid);

//ctx.fillRect(25, 25, 100, 100);
//ctx.clearRect(45, 45, 60, 60);
//ctx.strokeRect(50, 50, 50, 50);
//ctx.fillStyle="blue";
//ctx.fillRect(20,20,100,100);



boardO.draw_checkerboard = function(){
    for(var y = 0; y<this.grid.length; y++){
        for(var x = 0; x < this.grid[y].length; x++){
            //            console.log(y+x)
            if((x+y)%2===0){
                this.grid[y][x] = 1;
            }
        }
    }
}

boardO.step = function(){
    let changes = []
    for(var y = 0; y<this.grid.length; y++){
        for(var x = 0; x < this.grid[y].length; x++){
            let neighbors = this.checker(x,y);
            //            if(grid[y][x]===1){
            //                console.log(neighbors);
            //            }
            for(var i = 0; i<this.rules[this.grid[y][x]].length; i++){
                let rule = this.rules[this.grid[y][x]][i];
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
        this.grid[changes[i][1]][changes[i][0]] = changes[i][2];
    }
}



boardO.checker = function(x,y){
    let neighbors = {};

    for( var i = 0; i<this.states; i++) {
        neighbors[i] = 0;
    }
    let checkposX = [x];
    let checkposY = [y];
    let allchecked = [];

    if(this.wraping){ //finding all the neighbors
        checkposX.push((x+1)%this.grid_width); 
        checkposY.push((y+1)%this.grid_height);
        if(x===0){
            checkposX.push(this.grid_width-1);
        }
        else{
            checkposX.push(x-1);
        }
        if(y===0){
            checkposY.push(this.grid_height-1);
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
        if(x!=this.grid_width-1){
            checkposX.push(x+1)
        }
        if(y!=this.grid_height-1){
            checkposY.push(y+1)
        }
    }

    for(var i = 0; i < checkposY.length; i++){ //loop through both lists checking all the neighbors the cell has
        //        console.log(checkposX,checkposY)
        for(var j = 0; j < checkposX.length; j++){
            if((j!=0 || i!=0)){
                neighbors[this.grid[checkposY[i]][checkposX[j]]]++;
            }
        }

    }
    //    if(grid[y][x]==1){
    //        console.log(x,y,neighbors,allchecked);
    //    }

    return neighbors;
}


boardO.draw = function(){
//        console.log("I drew")
    for(var y = 0; y<this.grid.length; y++){
        for(var x = 0; x < this.grid[y].length; x++){
            this.ctx.fillStyle = this.colors[this.grid[y][x]];
            this.ctx.fillRect(x*this.px_width,y*this.px_height,this.px_height,this.px_width);
            //            ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
        }
    }
}

boardO.randomize = function(){
    for(var y in this.grid){
        for(var x in this.grid[y]){
            //            console.log(parseInt(Math.random()*states));
            this.grid[y][x] = parseInt(Math.random()*this.states);
        }
    }
}


boardO.pause = function(){
    this.running = false;
    this.editible = true;
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","boardO.play();");
    button.innerHTML="Play";
}

boardO.play = function(){
    this.running = true;
    this.editible = false;
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","boardO.pause();");
    button.innerHTML="Pause";

//    this.run();
}





//draw_checkerboard()
boardO.make_glider = function(){
    this.grid[6][6] = 1;
    this.grid[7][6] = 1;
    this.grid[8][6] = 1;
    this.grid[8][7] = 1;
    this.grid[7][8] = 1;
}
//grid[20][20] = 3;
//console.log(grid);
//make_glider();
//grid[5][5] = 1;


