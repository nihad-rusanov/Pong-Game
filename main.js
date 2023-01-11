const gameBoard = document.querySelector("#gameBoard");
const canvas = gameBoard.getContext("2d");
const scoretext = document.querySelector("#score");
let left_paddle_x = 20;
let left_paddle_y = 250;
let right_paddle_x = 460;
let right_paddle_y = 250;
let paddle_width = 20;
let paddle_height = 100;
let ball_x_postion = 250;
let ball_y_postion = 250;
let gameBoardWitdh = gameBoard.width;
let gameBoardHeight = gameBoard.height;
let xVelocity = 5;
let yVelocity = -8;
let right = 0;
let left = 0;

showPaddle();

createBall();

function createBall() {
  canvas.beginPath();
  canvas.arc(ball_x_postion, ball_y_postion, 15, 0, 2 * Math.PI);
  canvas.fillStyle = "white";
  canvas.fill();
  canvas.strokeStyle = "white";
  canvas.stroke();
}

function createPaddle(postion) {
  if (postion == "left") {
    canvas.fillStyle = "red";
    canvas.fillRect(
      left_paddle_x,
      left_paddle_y,
      paddle_width,
      paddle_height
    );
  } else if (postion == "right") {
    canvas.fillStyle = "blue";
    canvas.fillRect(
      right_paddle_x,
      right_paddle_y,
      paddle_width,
      paddle_height
    );
  }
}

function showPaddle() {
  createPaddle("left");
  createPaddle("right");
  createBall();
}

function clearBoard() {
  canvas.fillStyle = "green";
  canvas.fillRect(0, 0, gameBoardWitdh, gameBoardHeight);
}

function moveLeft(event) {
  if (event.key == "w") {
    left_paddle_y -= 20;
    showPaddle();
    console.log(event);
  } else {
    left_paddle_y += 20;
    showPaddle();
  }
}

function moveRight(event) {
  if (event.key == "ArrowUp") {
    right_paddle_y -= 20;
    showPaddle();
  } else {
    right_paddle_y += 20;
    showPaddle();
  }
}

window.addEventListener("keydown", (event) => {
  clearBoard();
  if (event.key == "w" || event.key == "s") {
    moveLeft(event);
  } else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
    moveRight(event);
  }
});

function moveBall() {
  ball_x_postion += xVelocity;
  ball_y_postion += yVelocity;
}

function change_direction() {
  if (ball_y_postion == 10) {
    yVelocity = 8;
  } else if (ball_y_postion > 488) {
    yVelocity = -8;
  } else if (
    right_paddle_x == ball_x_postion + 15 &&
    Math.abs(right_paddle_y - ball_y_postion) <= paddle_height
  ) {
    xVelocity = -10;
  } else if (
    Math.abs(left_paddle_x - ball_x_postion) < 40 &&
    Math.abs(left_paddle_y - ball_y_postion) <= paddle_height
  ) {
    xVelocity = 10;
  } else if (ball_x_postion > 500) {
    //right
    left += 1;
    xVelocity = -5;
    yVelocity = 8;
    ball_x_postion = 250;
    ball_y_postion = 250;
    scoretext.textContent = `${left}:${right}`;
  } else if (ball_x_postion < 0) {
    //left
    xVelocity = 5;
    yVelocity = -8;
    right += 1;
    ball_x_postion = 250;
    ball_y_postion = 250;
    scoretext.textContent = `${left}:${right}`;
  }
}

setInterval(() => {
  clearBoard();
  showPaddle();
  moveBall();
  change_direction();
}, 100);
