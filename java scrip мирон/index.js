const playboard = document.querySelector(".play-board");
const highScoreElement= document.querySelector(".high-score");
const scoreElement= document.querySelector(".play-board");
const controls = document.querySelectorAll(".controls i") 

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${  highScore }`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
}
const handleGameOver = ()=> {
  clearInterval(setIntervalId);
  alert("Game Over! Press OK to replay...");
  location.reload();
}
const changeDirectin = (e) => {
if(e.key === "ArrowUp" && velocityY != 1) {
  velocityX = 0;
  velocityY = -1;
} else if(e.key === "ArrowDown"&& velocityY != -1) {
  velocityX = 0;
  velocityY = 1;
} else if(e.key === "ArrowLeft"&& velocityX != 1) {
  velocityX = -1;
  velocityY = 0;
} else if(e.key === "ArrowRight"&& velocityX != -1) {
  velocityX = 1;
  velocityY = 0;
}
}

controls.forEach(key => {
  key.addEventListener("click", () => changeDirectin({key: key.dataset.key }));
});

const initGame = () => {
  if(gameOver) return handleGameOver();
  let htmlmarkup = `<div class="food" style="grid-area: ${foodY}  / ${foodX} "></div>`;

if(snakeX ===foodX && snakeY === foodY ) {
  changeFoodPosition();
  snakeBody .push([foodX, foodY]);
  score++;



  highScore = score >= highScore ? score : highScore;
  localStorage.setItem("high Score", highScore);
  scoreElement. innerText = `Score: ${score}`;
  highScoreElement.innerText = `High Score: ${  highScore }`;
}
snakeX +=velocityX;
snakeY +=velocityY;

snakeX +=velocityX;
snakeY +=velocityY;


for (let i = snakeBody.length - 1; i > 0; i--) {
  snakeBody[i] = snakeBody[i - 1];
}


snakeBody[0] = [snakeX, snakeY];

 

  if(snakeX <= 0 || snakeX > 30 ||snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let index = 0; index < snakeBody .length; index++) {
    htmlmarkup += `<div class="head" style="grid-area: ${snakeBody[index][1]}  / ${snakeBody[index][0]} "></div>`;
    if(index !== 0 && snakeBody[0][1] === snakeBody[index][1] && snakeBody[0][0] === snakeBody[index][0]) {
      gameOver = true;
    }
  }
  playboard.innerHTML  =  htmlmarkup;
}
changeFoodPosition ();
setIntervalId = setInterval(initGame,170);
document.addEventListener("keydown" , changeDirectin);