// * GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#main-screen");
const gameScreen = document.querySelector("#game-screen");
const startBtn = document.querySelector("#start-btn");
const gameOverScreen = document.querySelector("#gameover-screen");

let gameObj;
let arrPressedKeys = []; // To hold the eventListener (below in this page) actions

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {

  // Hiding initial screen when "Start" button is pressed
  startScreen.style.display = "none";

  // Display canvas
  gameScreen.style.display = "flex";

  // New Game version created
  gameObj = new Game();
  //console.log(gameObj);

  // New Game version initialized
  gameObj.gameLoop();
};

// * ADD EVENT LISTENERS
startBtn.addEventListener("click", startGame);

// Gets the current pressed key and checks if it has been previously added to the array
window.addEventListener("keydown", (event) => {
  if (
    (event.code === "KeyW" ||
      event.code === "KeyA" ||
      event.code === "KeyD" ||
      event.code === "Space") &&
    arrPressedKeys.indexOf(event.code) === -1
  ) {
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
    gameObj.spacePressed = 0;
  }
});
