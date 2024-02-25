const gameContainer = document.querySelector('.game-container');
const snakeElement = document.getElementById('snake');
const foodElement = document.getElementById('food');

let snake = [{x: 200, y: 200}];
let food = {x: 100, y: 100};
let dx = 0;
let dy = 0;
let interval;
const snakeSize = 10;

function moveSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    generateFood();
  } else {
    snake.pop();
  }

  drawSnake();
}

function drawSnake() {
  snakeElement.innerHTML = '';
  snake.forEach(segment => {
    const div = document.createElement('div');
    div.style.width = snakeSize + 'px';
    div.style.height = snakeSize + 'px';
    div.style.background = 'green';
    div.style.position = 'absolute';
    div.style.left = segment.x + 'px';
    div.style.top = segment.y + 'px';
    snakeElement.appendChild(div);
  });
}

function generateFood() {
  const x = Math.floor(Math.random() * (gameContainer.clientWidth / snakeSize)) * snakeSize;
  const y = Math.floor(Math.random() * (gameContainer.clientHeight / snakeSize)) * snakeSize;
  food = {x, y};
  foodElement.style.left = food.x + 'px';
  foodElement.style.top = food.y + 'px';
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (event.keyCode === LEFT_KEY && dx === 0) {
    dx = -snakeSize;
    dy = 0;
  }

  if (event.keyCode === RIGHT_KEY && dx === 0) {
    dx = snakeSize;
    dy = 0;
  }

  if (event.keyCode === UP_KEY && dy === 0) {
    dx = 0;
    dy = -snakeSize;
  }

  if (event.keyCode === DOWN_KEY && dy === 0) {
    dx = 0;
    dy = snakeSize;
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= gameContainer.clientWidth ||
    snake[0].y < 0 ||
    snake[0].y >= gameContainer.clientHeight
  ) {
    clearInterval(interval);
    alert('Game Over!');
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      clearInterval(interval);
      alert('Game Over!');
      return;
    }
  }
}

document.addEventListener('keydown', changeDirection);

generateFood();
interval = setInterval(() => {
  moveSnake();
  checkCollision();
}, 100);
