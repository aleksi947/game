const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");
const startButton = document.querySelector('#start-button')
const hitSound = new Audio('sounds/hit.mp3')
const gameOverSound = new Audio('sounds/game_over.mp3')


let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
      hitSound.play() 
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    gameOverSound.play();
    alert("GAME OVER! Your final score is " + result);
  }
}

function startGame() {
  gameOverSound.pause();
  gameOverSound.currentTime = 0;

  result = 0;
  score.textContent = result;
  currentTime = 60;
  timeLeft.textContent = currentTime;



  
  moveMole();
  countDownTimerId = setInterval(countDown, 1000);
}


startButton.addEventListener("click", startGame);
