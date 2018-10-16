var boardO = boardO || {};

//class BoardTHing {
//    constrcutor() {
//        
//        this.height = 0;
//        
//        this.reset();
//    }
//    
//    reset() {
//        
//    }
//}


boardO.init = function(height, width,size){
    //    this.canvas = document.getElementById('canvas');
    this.height = height;
    this.width = width;
    //    console.log(width,t);
    this.size = size;
    this.pxHeight =  this.height/this.size;
    this.pxWidth = parseInt(this.width/this.size*(this.height/this.width));
    //console.log(pxWidth)
    this.gridHeight = this.height/this.pxHeight;
    this.gridWidth = parseInt(this.width/this.pxWidth);
//    document.getElementById("canvas").width=this.gridWidth*this.pxWidth;
    //console.log(gridWidth);
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

boardO.reset = function(rules){
    this.running = false;
    this.init(this.height,this.width,document.getElementById("reset-size").value);
    this.running = true;
    this.time = 0;
    //    this.ctx = this.canvas.getContext("2d");
    this.grid = new Array(this.gridHeight);
//    if(this.oldBoard.s)
    this.oldBoard = this.oldBoard || this.grid;
    this.states = rules.length;
    this.wraping = true;
    this.running = true;
    this.editible = false;

    this.rules = rules;
    this.colors = this.rules.colors;

    //grid.fill(new Array(gridWidth))
    for(let i = 0; i<this.grid.length; i++){
        this.grid[i] = new Array(this.gridWidth);
        this.grid[i].fill(0);
        //    console.log(i);
    }
    if(this.oldBoard.length!=this.size){
            this.oldBoard = this.grid;
            this.pause()

    }
}
//console.log(grid);

//ctx.fillRect(25, 25, 100, 100);
//ctx.clearRect(45, 45, 60, 60);
//ctx.strokeRect(50, 50, 50, 50);
//ctx.fillStyle="blue";
//ctx.fillRect(20,20,100,100);



boardO.drawCheckerboard = function(){
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
                            changes.push([x,y,rule.changeTo]);
                        }
                    }

                }
            }
        }

    }
    this.oldBoard = JSON.parse(JSON.stringify(this.grid));
//    console.log(changes)
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
        checkposX.push((x+1)%this.gridWidth); 
        checkposY.push((y+1)%this.gridHeight);
        if(x===0){
            checkposX.push(this.gridWidth-1);
        }
        else{
            checkposX.push(x-1);
        }
        if(y===0){
            checkposY.push(this.gridHeight-1);
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
        if(x!=this.gridWidth-1){
            checkposX.push(x+1)
        }
        if(y!=this.gridHeight-1){
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



boardO.randomize = function(){
    for(var y in this.grid){
        for(var x in this.grid[y]){
            //            console.log(parseInt(Math.random()*states));
            this.grid[y][x] = parseInt(Math.random()*this.states);
        }
    }
}


boardO.pause = function(){
    this.oldtime = this.time;
    this.time = 0;
    this.running = false;
    this.editible = true;
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","boardO.play();");
    button.innerHTML="Play";
}

boardO.play = function(){
    this.time=this.oldtime;
    this.running = true;
    this.editible = false;
    button = document.getElementById("pause-button");
    button.setAttribute("onclick","boardO.pause();");
    button.innerHTML="Pause";

    //    this.run();
}





//drawCheckerboard()
boardO.makeGlider = function(){
    this.grid[6][6] = 1;
    this.grid[7][6] = 1;
    this.grid[8][6] = 1;
    this.grid[8][7] = 1;
    this.grid[7][8] = 1;
}
//grid[20][20] = 3;
//console.log(grid);
//makeGlider();
//grid[5][5] = 1;


