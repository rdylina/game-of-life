// © Robert J Dylina 2021
// Conways Game of Life in Javascript
// Built from scratch without reviewing existing solutions
// Single Array, boundary checks, no roll over from side to side
// or top to bottom. 
let reset = false;
let startDensity = .3 ;
let boardArray = [];
const boardWidth = 100;
const boardHeight = 100;
const totalCells = boardWidth*boardHeight;
const size = "4px";

function setupGame(width, height)
{
  document.querySelector('.world').style.griddTemplateRows = `repeat(${width}, 1fr)`;
  document.querySelector('.world').style.gridTemplateColumns = `repeat(${height}, 1fr)`;
  document.querySelector('.world').innerHTML = "";
  
  // generate random start
  for(i = 0; i < totalCells; i++){
    let newElement = document.createElement("div");
    newElement.style.width = size;
    newElement.style.height = size;
    document.querySelector(".world").appendChild(newElement);
    boardArray.push(newElement);

    // check for mouseover
    newElement.addEventListener("mouseover", (event) => 
    {
      if(event.buttons > 0)
      true;
      // Add Life bomb
    });
    // Randomly generate numbers
    if(Math.random() < startDensity) alive(newElement);
    else dead(newElement);
  } 
  calculateNeighbors();
}

function resetGame(){
  for(i = 0; i < totalCells; i++){
    if(Math.random() < startDensity) alive(boardArray[i]);
    else dead(boardArray[i]);
  }
  calculateNeighbors();
}

function gameCycle(){

    // Cycle through and update board based on last rounds calculations
    for(i = 0; i < boardArray.length; i++){
      // apply life rules to this cell
      if(boardArray[i].lifeCounter == 3)
        alive(boardArray[i]); 
      else if (boardArray[i].lifeCounter == 2)
        if(boardArray[i].life == 1) alive(boardArray[i])
        else dead(boardArray[i]);
      else 
        dead(boardArray[i]);
    }

  calculateNeighbors();
}

function alive(element){
  element.style.backgroundColor = "black";
  element.style.color = "white";
  element.life = 1;

}

function dead(element){
  element.style.backgroundColor = "white";
  element.style.color = "black";
  element.life = 0;

}

function calculateNeighbors(){
  for(i = 0; i < boardArray.length; i++)
  {
    let positionCheck = [];
    // reset neighbor life counter
    boardArray[i].lifeCounter = 0;
    // check surrounding cells
    // Create array of valid index positions on the board
    // calculate index that is directly above
    let indexAbove = i - boardWidth;
    // calculate index that is directly below
    let indexBelow = i + boardWidth;

    // true if index at beginning of board road
    let beginning = (i % boardWidth == 0);
    // true if index at end of board row
    let ending = (i % boardWidth == (boardWidth - 1));

    // check index values on either side and if they're not off the array beginning
    //  or the end then add them to the position check array
    if(i-1 >= 0) positionCheck.push(i-1);
    if(i+1 <= totalCells-1) positionCheck.push(i+1);
  
    // check index values of the cells above
    if(indexAbove >= 0) positionCheck.push(indexAbove);
    if((indexAbove - 1) >= 0 && !beginning) positionCheck.push(indexAbove - 1);
    if(indexAbove + 1 >= 0 && !ending) positionCheck.push(indexAbove + 1);

    // check index values of the cells below
    if(indexBelow <= totalCells-1) positionCheck.push(indexBelow);
    if((indexBelow - 1) <= totalCells-1 && !beginning) positionCheck.push(indexBelow - 1);
    if(indexBelow + 1 <= totalCells-1 && !ending) positionCheck.push(indexBelow + 1);

    // check all the valid positions and count up surrounding live cells
    positionCheck.forEach((index) => {
      if(boardArray[index].life == 1) boardArray[i].lifeCounter++;
    });

    // Some good old console debugging to make sure calculations are working correctly
    // let debugconsole = `index: ${i}  neighbors = `
    // positionCheck.forEach(num => {
    //   debugconsole += num.toString();
    //   debugconsole += boardArray[num].life==1?"A":"D";
    //   debugconsole += ",";
    // });

    // console.log(debugconsole);
    // console.log("Neighbors Alive = " + boardArray[i].lifeCounter);
    // console.log(beginning ? "beginning of row" : ending ? "end of row" : "interior of row");
  }
}

// setup game and run on a specific interval
// Interval may be problematic 
document.querySelector("button").addEventListener("click", resetGame);
setupGame(boardWidth, boardHeight);
setInterval(gameCycle, 100);





