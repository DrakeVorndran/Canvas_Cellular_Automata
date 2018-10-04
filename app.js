const canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
const height = 400;
const width = 400;
const size = 100;
const px_height =  height/size;
const px_width = width/size;
const grid_height = height/px_height;
const grid_width = width/px_width;
let grid = new Array(grid_height);
const colors = ["white","black"]
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

update = function(){
    for(var y = 0; y<grid.length; y++){
        for(var x = 0; x < grid[y].length; x++){
            //            console.log(y+x)
            if((x+y)%2===0){
                grid[y][x] = 1;
            }
        }
    }
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

update()
//grid[5][5] = 1;
//console.log(grid);
draw();