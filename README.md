# Cellular Automation Editor

###### pssst, its live [here](https://drakevorndran.github.io/Canvas_Cellular_Automata/)

## [Cellular Automation](https://en.wikipedia.org/wiki/Cellular_automaton)
Celular automation is a fairly simple idea.  
You start with an infinite grid, and every cell's state is determined by the cells around it.  
There are a few types of "neighborhoods" or ways to count your neighbors. In this project, I use what is known as a Moore neighborhood. If you don't know what that means, think minesweeper, every cell just checks the 8 cells surrounding it.  
Every cell's state is detirmined by the states of the cells' around them. So in the simplist example, [conway's game of life,](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) every cell can have 2 states, alive or dead. A dead cell becomes alive in the next step if it has 3 alive neighbors. An alive cell becomes dead if it has less than 2 or more than 3 alive neighbors.
## My Project
My project allows you to edit the rules in a simple and easy to understand way.

### features
* Full control of the simulation
  * pause
  * play
  * step
  * editing while paused
  * clearing
  * randomizing
  * changing size of grid
  * changing delay between steps
* rule editor
  * adding rules
  * removing rules
  * editing rules
* help page
  * simple explanation of what is going on
  * interactive demo




## Technical Stuff
I used html5 canvas in this project to draw everything nessasary. I didn't use any libraries.


## Future additions
I do plan to keep working on this project after the intensive, and get people that are also intrested in cellular automation to work with me to add features, that being said I do have a [todo page](https://github.com/DrakeVorndran/Canvas_Cellular_Automata/blob/master/todo.md) with all of the current and future plans.