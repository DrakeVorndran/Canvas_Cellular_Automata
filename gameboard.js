
class GameBoard {
    constructor(){
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
    }
    reset(){
        this.time = 0;
        this.ctx = this.canvas.getContext("2d");
        this.grid = new Array(this.grid_height);
        this.states = 2;
        this.colors = ["white","black","blue"];
        this.wraping = true;
        this.running = true;
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
    //console.log(this.grid);

    //this.ctx.fillRect(25, 25, 100, 100);
    //this.ctx.clearRect(45, 45, 60, 60);
    //this.ctx.strokeRect(50, 50, 50, 50);
    //this.ctx.fillStyle="blue";
    //this.ctx.fillRect(20,20,100,100);



    draw_checkerboard(){
        for(var y = 0; y<this.grid.length; y++){
            for(var x = 0; x < this.grid[y].length; x++){
                //            console.log(y+x)
                if((x+y)%2===0){
                    this.grid[y][x] = 1;
                }
            }
        }
    }

    update(){
        let changes = []
        // Loop through the 2d array to find all of the things that need to be changed and change them
        for(var y = 0; y<this.grid.length; y++){
            for(var x = 0; x < this.grid[y].length; x++){
                // Finds all of the neighbors of the current cell
                let neighbors = checker(x,y); 
                //            if(this.grid[y][x]===1){
                //                console.log(neighbors);
                //            }
                // Loops through all of the current rules for each of the cells
                for(var i = 0; i<this.rules[this.grid[y][x]].length; i++){
                    // What rule the color of the current cell follows
                    let rule = this.rules[this.grid[y][x]][i];
                    // check is the color of each of the neighbors
                    for(var check in neighbors){
                        // if the the current cell color will change based on the the neighbor color
                        if(check in rule.conditions){
                            condition = rule.conditions[check];
                            // if the number of neighors of the check color is part of the condition to change
                            if(condition.includes(neighbors[check])){
                                // add to a list of changes what cell needs to be changed, as well as what color it will change to
                                changes.push([x,y,rule.change_to]);
                            }
                        }

                    }
                }
            }

        }
        for(var i in changes){
            // change all of the cells that needed to be changed
            this.grid[changes[i][1]][changes[i][0]] = changes[i][2];
        }
    }



    checker(x,y){
        let neighbors = {};
        // init the neighbors dict
        for( var i = 0; i<this.states; i++) {
            neighbors[i] = 0;
        }
        let checkposX = [x];
        let checkposY = [y];

        if(this.wraping){ // does the board wrap around to the other side or not
            // add the x and y positions of the neighbors of the current cell to an array
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

        //loop through all of the neighbors that the cell has
        for(var i = 0; i < checkposY.length; i++){ 
            for(var j = 0; j < checkposX.length; j++){
                // if the cell is not checking itself
                if((j!=0 || i!=0)){
                    // add 1 to the color of the neighbor in the neighbors dict
                    neighbors[this.grid[checkposY[i]][checkposX[j]]]++;
                }
            }

        }
        //    if(this.grid[y][x]==1){
        //        console.log(x,y,neighbors,allchecked);
        //    }

        return neighbors;
    }


    draw(){
        for(var y = 0; y<this.grid.length; y++){
            for(var x = 0; x < this.grid[y].length; x++){
                this.ctx.fillStyle = this.colors[this.grid[y][x]];
                this.ctx.fillRect(x*px_width,y*px_height,px_height,px_width);
                //            this.ctx.fillRect(x*px_width,y*px_height,px_width,px_height);
            }
        }
    }

    randomize(){
        for(var y in this.grid){
            for(var x in this.grid[y]){
                //            console.log(parseInt(Math.random()*this.states));
                this.grid[y][x] = parseInt(Math.random()*this.states);
            }
        }
    }


    pause(){
        this.running = false
        button = document.getElementById("pause-button");
        button.setAttribute("onclick","play();");
        button.innerHTML="Play";
    }

    play(){
        this.running = true;
        button = document.getElementById("pause-button");
        button.setAttribute("onclick","pause();");
        button.innerHTML="Pause";

        run();
    }

    run(){
        update();
        //    this.grid[5][9] = 1;
        //    this.grid[6][9] = 1;
        //    this.grid[7][9] = 1;
        draw();
        //    console.log(this.grid[6][6])
        //    console.log(this.grid[0]);
        //    this.running = true;
        if(this.running){
            window.setTimeout(this.run,this.time);
        }
    }

    //draw_checkerboard()
    make_glider(){
        this.grid[6][6] = 1;
        this.grid[7][6] = 1;
        this.grid[8][6] = 1;
        this.grid[8][7] = 1;
        this.grid[7][8] = 1;
    }

}

board = new GameBoard();
board.reset();
board.run();
