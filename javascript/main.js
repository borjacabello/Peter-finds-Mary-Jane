// * GLOBAL VARIABLES
// Canvas
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");

// Screen
const startScreen = document.querySelector("#main-screen");
const gameScreen = document.querySelector("#game-screen");
const gameOverScreen = document.querySelector("#game-over-screen");
const gamePassedScreen = document.querySelector("#game-passed-screen");

// Buttons
const startBtn = document.querySelector("#start-btn");
const replayBtn = document.querySelector("#restart-btn");
const homeBtn = document.querySelector("#go-home-page-btn");
const redSpidermanBtn = document.querySelector("#red-spiderman");
const blackSpidermanBtn = document.querySelector("#black-spiderman");

// HTML DOM elements
const bodyTableDom = document.querySelector("#table-body")
const newTableRow = document.createElement("tr");
const playerName = document.querySelector("#name")

// Global variables
let gameObj;
let rankingValues = []; // To keep record of last attempts after each gameLoop
let arrPressedKeys = []; // To hold the eventListener (below in this page) actions
let playerSelected;  // To change the true/false value which is passed to gameObj to choose main player


// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "flex";
  gameObj = new Game(playerSelected);
  gameObj.gameLoop();
};

const replayGame = () => {
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "flex";
  gameObj = new Game(playerSelected);
  gameObj.gameLoop();
};

const returnToHomePage = () => {
  gamePassedScreen.style.display = "none";
  startScreen.style.display = "grid";
};

// To change selected player inside gameObj, its value is passed to gameObj constructor
const changeRedPlayer = () => {
  playerSelected = false;
}

const changeBlackPlayer = () => {
  playerSelected = true;
}

// * ADD EVENT LISTENERS
replayBtn.addEventListener("click", replayGame);
startBtn.addEventListener("click", startGame);
homeBtn.addEventListener("click", returnToHomePage);
redSpidermanBtn.addEventListener("click", changeRedPlayer);  // Red Spiderman
blackSpidermanBtn.addEventListener("click", changeBlackPlayer)  // Black Spiderman


// Gets the current pressed key and checks if it has been previously added to the array
window.addEventListener("keydown", (event) => {
  if (
    (event.code === "KeyW" ||
      event.code === "KeyA" ||
      event.code === "KeyD" ||
      event.code === "Space") &&
    arrPressedKeys.indexOf(event.code) === -1
  ) {
    // Key is not in the array
    arrPressedKeys.push(event.code);
  }
});

// Delete keys of the array (or establish spacePressed to 0 if its "Space")
window.addEventListener("keyup", (event) => {
  if (event.code === "KeyW" || event.code === "KeyA" || event.code === "KeyD") {
    arrPressedKeys.splice(arrPressedKeys.indexOf(event.code), 1);
  }

  // Set the Game Object property spacePressed to 0 after being incremented in addSpiderwebToPlayer
  if (event.code === "Space") {
    if (gameObj !== undefined) {  // to prevent bug of pressing "Space" on main screen
      gameObj.spacePressed = 0;
    }
    arrPressedKeys.splice(arrPressedKeys.indexOf(event.code), 1);
  }
});
