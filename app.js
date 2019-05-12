var boardO = boardO || {};

boardO.init = function(height, width,size){
    // initalize all the variables for the board object
    this.height = height;
    this.width = width;
    this.size = size;
    this.pxHeight =  this.height/this.size;
    this.pxWidth = parseInt(this.width/this.size*(this.height/this.width));
    this.gridHeight = this.height/this.pxHeight;
    this.gridWidth = parseInt(this.width/this.pxWidth);
    this.time;
    this.grid;
    this.states;
    this.colors;
    this.wraping;
    this.running;
    this.rules;
    this.editible = false;
}

boardO.reset = function(rules){
    // reset all the board stuff
    this.pause();
    this.init(this.height,this.width,document.getElementById("reset-size").value);
    this.play();
    this.time = 0;
    this.grid = new Array(this.gridHeight);
    this.oldBoard = this.oldBoard || this.grid;
    this.states = rules.length;
    this.wraping = true;
    this.play();
    this.editible = false;

    this.rules = rules;
    this.colors = this.rules.colors;

    for(let i = 0; i<this.grid.length; i++){
        this.grid[i] = new Array(this.gridWidth);
        this.grid[i].fill(0);
    }
    if(this.oldBoard.length!=this.size){
            this.oldBoard = this.grid;
            this.pause()

    }
}

boardO.drawCheckerboard = function(){
    // just for testing, sets every other cell to 1
    for(var y = 0; y<this.grid.length; y++){
        for(var x = 0; x < this.grid[y].length; x++){
            if((x+y)%2===0){
                this.grid[y][x] = 1;
            }
        }
    }
}

boardO.step = function(){
    // loops through every cell, checks its neighbors, and figures out what it needs to change to
    let changes = [] // save all the changes until after we have checked every cell
    for(var y = 0; y<this.grid.length; y++){
        for(var x = 0; x < this.grid[y].length; x++){
            let neighbors = this.checker(x,y); // finds all the different neighbors of the cell
            for(var i = 0; i<this.rules[this.grid[y][x]].length; i++){
                let rule = this.rules[this.grid[y][x]][i];
                for(var check in neighbors){
                    if(check in rule.conditions){
                        condition = rule.conditions[check];
                        if(condition.includes(neighbors[check])){ // checks to see if any change condition is filled
                            changes.push([x,y,rule.changeTo]); // adds it to the change list
                        }
                    }

                }
            }
        }

    }
    this.oldBoard = JSON.parse(JSON.stringify(this.grid));
    for(var i in changes){
        this.grid[changes[i][1]][changes[i][0]] = changes[i][2]; // goes through all the changes and... actually changes them
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
        // figures out the cells that are neighbors
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
        for(var j = 0; j < checkposX.length; j++){
            if((j!=0 || i!=0)){
                // adds the color and the amount to the list
                neighbors[this.grid[checkposY[i]][checkposX[j]]]++;
            }
        }

    }
    return neighbors;
}



boardO.randomize = function(){
    // changes every cell to a random possible cell state
    for(var y in this.grid){
        for(var x in this.grid[y]){
            this.grid[y][x] = parseInt(Math.random()*this.states);
        }
    }
}


boardO.pause = function(){
    // stops the game from stepping
    this.oldtime = this.time;
    this.time = 0;
    this.running = false;
    stepButton.style.display = "inline";
    this.editible = true;
    pauseButton.onclick = (e) =>{
        boardO.play();
        pauseButton.innerHTML = "Pause";
    }
}

boardO.play = function(){
    // restarts the games steping
    this.time=this.oldtime;
    this.running = true;
    this.editible = false;
    stepButton.style.display = "none";
    pauseButton.onclick = (e) =>{
        boardO.pause();
        pauseButton.innerHTML = "Play";
    }
}





boardO.makeGlider = function(){
    // only for testing, creates a "Glider" in classic game of life
    this.grid[6][6] = 1;
    this.grid[7][6] = 1;
    this.grid[8][6] = 1;
    this.grid[8][7] = 1;
    this.grid[7][8] = 1;
}


