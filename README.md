# Snake-Game-using-Js
window.alert(`Wanna Play Snake Game !!!`);

const gameboard = document.querySelector(`#gameboard`);
const ctx = gameboard.getContext(`2d`);
const scoretext = document.querySelector(`#scoretext`);
const resetbtn = document.querySelector(`#resetbtn`);
const gameWidth = gameboard.width;
const gameHeight = gameboard.height;
const boardBackground = `white`;
const snakeColor = `aqua`;
const snakeBorder = `black`;
const foodColor = `red`;
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
// let scoretext = 0;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
resetbtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoretext.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
if(running){
    setTimeout(()=>{
        clearBoard();
        drawFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    }, 150);
}
else{
    displayGameOver();
}
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randnum = Math.round((Math.random() * (max - min) + min)/ unitSize ) * unitSize;
        return randnum;
    }
   foodX = randomFood(0,gameWidth - unitSize);
   foodY = randomFood(0,gameWidth - unitSize);
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};

    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        console.log("Score:", score);
    console.log("Scoretext:", scoretext);
   score+=1;
   scoretext.textContent = score;
   createFood();
    }
    else{
        snake.pop();
    }   
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x,snakePart.y,unitSize,unitSize);
        ctx.strokeRect(snakePart.x,snakePart.y,unitSize,unitSize);
    })
};
function changeDirection(event){
  const keyPressed = event.keyCode;
  const LEFT = 65;
  const RIGHT = 68;
  const UP = 87;
  const DOWN = 83;
  
  const goingUP = (yVelocity == -unitSize);
  const goingDOWN = (yVelocity == unitSize);
  const goingRIGHT = (xVelocity == unitSize);
  const goingLEFT = (xVelocity == -unitSize);

  switch(true){
    case(keyPressed == LEFT && !goingRIGHT):
    xVelocity = -unitSize;
    yVelocity = 0;
    break;

    case(keyPressed == UP && !goingDOWN):
    xVelocity = 0;
    yVelocity = -unitSize;
    break;

    case(keyPressed == RIGHT && !goingLEFT):
    xVelocity = unitSize;
    yVelocity = 0;
    break;

    case(keyPressed == DOWN && !goingUP):
    xVelocity = 0;
    yVelocity = unitSize;
    break;
  }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x<0):
            running= false;
            break;

            case (snake[0].x>= gameWidth):
            running= false;
            break;
                 
            case (snake[0].y<0):
            running= false;
            break;

            case (snake[0].y>=gameHeight):
            running= false;
            break;
    }

    for(let i = 1 ; i < snake.length ; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
            running=false;
    }
};
function displayGameOver(){
    ctx.font = `50px MV Boli`;
    ctx.fillStyle = `black`;
    ctx.textAlign = `center`;
    ctx.fillText(`GAME OVER !!`,gameWidth/2,gameHeight/2);
    running=false;
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
 snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}];
        gameStart();
};

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title><link rel="stylesheet" href="snake.css">
</head>
<body>
  <div id="gamecontainer">
<canvas id="gameboard" width="500" height="500"></canvas>
<div id="scoretext">0</div>
<button id="resetbtn">Reset</button>
  </div>
    
  <div class="pagination">
    <a href="rockpaperscissor.html" title="Current Game">1</a>
    <a href="tic tac toe.html" title="Tic Tac Toe">2</a>
    <a href="snake.html" title="Snake" class="active">3</a>
    <a href="game.html" title="Simple Guessing Game">4</a>
<script src="snake.js"></script>    
</body>
</html>

#gamecontainer{
    text-align: center;
    font-size: 50px;
}
#gameboard{
    border: 5px solid;
    margin-top: 60px;
}
#scoretext{
    font-size: 100px;
    font-family: Verdana, Geneva, Tahoma, sans-serif,cursive;
}
#resetbtn{
    width: 100px;
    height: 50px;
    border: 2px solid;
    cursor: pointer;
    border-radius: 8px;
}
#resetbtn:hover{
    background-color: hsl(241, 81%, 67%);
}
