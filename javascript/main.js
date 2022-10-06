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
const gameoverHomeBtn = document.querySelector("#gameover-home-btn")
const homeBtn = document.querySelector("#go-home-page-btn");
const redSpidermanBtn = document.querySelector("#red-spiderman");
const blackSpidermanBtn = document.querySelector("#black-spiderman");
const nightBackgroundBtn = document.querySelector("#city-night");
const dayBackgroundBtn = document.querySelector("#sunrise");
const easyLevelBtn = document.querySelector("#easy-btn")
const mediumLevelBtn = document.querySelector("#medium-btn")
const hardLevelBtn = document.querySelector("#hard-btn")

// HTML DOM elements
const bodyTableDom = document.querySelector("#table-body")
const newTableRow = document.createElement("tr");
const playerName = document.querySelector("#name")

// Audios
/*let audio1 = new Audio();
audio1.src = "./audios/background-song.mp3";
audio1.autoplay = true;
audio1.muted = true;
audio1.volume = 0.5;*/

let audioButton = new Audio();
audioButton.src = "./audios/button.wav"
audioButton.volume = 0.1;

let audioGameOver = new Audio();
audioGameOver.src = "./audios/gameover.mp3";
audioGameOver.volume = 0.4;

let hitAudio = new Audio();
hitAudio.src = "./audios/hit.wav";
hitAudio.volume = 0.4;

let hitAudio2 = new Audio();
hitAudio2.src = "./audios/hit2.wav";
hitAudio2.volume = 0.4;

let hitAudio3 = new Audio();
hitAudio3.src = "./audios/hurt.mp3"
hitAudio3.volume = 0.4;

let finalAudio = new Audio();
finalAudio.src = "./audios/finalsong.mp3";
finalAudio.volume = 0.4;

// Global variables
let gameObj;
let rankingValues = []; // To keep record of last attempts after each gameLoop
let arrPressedKeys = []; // To hold the eventListener (below in this page) actions
let playerSelected;  // To change the true/false value which is passed to gameObj to choose main player
let backgroundSelected; // To change background image depending on pressed button
let levelSelected;


// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "flex";
  gameObj = new Game(playerSelected, backgroundSelected, levelSelected);
  gameObj.gameLoop();
  gameObj.audio.play();
};

const replayGame = () => {
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "flex";
  gameObj = new Game(playerSelected, backgroundSelected, levelSelected);
  gameObj.gameLoop();
  gameObj.audio.play();
  audioGameOver.pause();
};

const returnToHomePage = () => {
  gamePassedScreen.style.display = "none";
  startScreen.style.display = "grid";
  finalAudio.pause();
};

const gameoverHomePage = () => {
  gameOverScreen.style.display = "none";
  startScreen.style.display = "grid";
  audioGameOver.pause();
}

// To change selected player inside gameObj, its value is passed to gameObj constructor
const changeRedPlayer = () => {
  playerSelected = false;
  audioButton.play();
}

const changeBlackPlayer = () => {
  playerSelected = true;
  audioButton.play();
}

// To change selected background inside gameObj, its value is passed to gameObj constructor
const changeNightBackground = () => {
  backgroundSelected = false;
  audioButton.play();
}

const changeDayBackground = () => {
  backgroundSelected = true;
  audioButton.play();
}

// To change selected level inside gameObj, its value is passed to gameObj constructor
const changeEasyLevel = () => {
  levelSelected = 1;
  audioButton.play();
}

const changeMediumLevel = () => {
  levelSelected = 2;
  audioButton.play();
}

const changeHardLevel = () => {
  levelSelected = 3;
  audioButton.play();
}

// * ADD EVENT LISTENERS
replayBtn.addEventListener("click", replayGame);
startBtn.addEventListener("click", startGame);
gameoverHomeBtn.addEventListener("click", gameoverHomePage);
homeBtn.addEventListener("click", returnToHomePage);
redSpidermanBtn.addEventListener("click", changeRedPlayer);  // Red Spiderman gameObj
blackSpidermanBtn.addEventListener("click", changeBlackPlayer)  // Black Spiderman gameObj
nightBackgroundBtn.addEventListener("click", changeNightBackground)  // Night Background gameObj
dayBackgroundBtn.addEventListener("click", changeDayBackground)  // Day Background gameObj
easyLevelBtn.addEventListener("click", changeEasyLevel)  // Easy level gameObj
mediumLevelBtn.addEventListener("click", changeMediumLevel) // Mediumm level gameObj
hardLevelBtn.addEventListener("click", changeHardLevel) // Hard level gameObj


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
