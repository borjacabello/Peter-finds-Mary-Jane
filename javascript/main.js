// * GLOBAL VARIABLES
const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");
const startScreen = document.querySelector("#splash-screen");
const startBtn = document.querySelector("#start-btn");
const gameOverScreen = document.querySelector("#gameover-screen")


let gameObj;
let arrPressedKeys = []; //! cambiar de global a otro sitio

// * STATE MANAGEMENT FUNCTIONS
const startGame = () => {
  //console.log("iniciando el juego");

  // ocultar la pantalla de inicio
  //startScreen.style.display = "none";

  // mostrar el canvas
  //canvas.style.display = "block";

  // crear una nueva versión del juego
  gameObj = new Game();
  console.log(gameObj);

  // iniciará el juego, ejecutar el método gameLoop
  gameObj.gameLoop();
};



// * ADD EVENT LISTENERS
//startBtn.addEventListener("click", startGame);
startGame();


// Gets the current pressed key and checks if it has been previously added to the array
window.addEventListener('keydown', (event) => {

    if ((   event.code === "KeyS" ||
            event.code === "KeyW" ||
            event.code === "KeyA" ||
            event.code === "KeyD")
        && arrPressedKeys.indexOf(event.code) === -1) {
        arrPressedKeys.push(event.code);
    }
    //console.log(arrPressedKeys);
})

window.addEventListener('keyup', (event) => {

    if (    event.code === "KeyS" ||
            event.code === "KeyW" ||
            event.code === "KeyA" ||
            event.code === "KeyD") {
        arrPressedKeys.splice(arrPressedKeys.indexOf(event.code), 1)
    }
    //console.log(arrPressedKeys)
})