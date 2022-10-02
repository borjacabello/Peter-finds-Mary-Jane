class Game {
  constructor() {
    this.background = new Background();
    this.player = new Player();
    this.arrEnemies = [];
    this.spiderwebsArr = [];
    this.frames = 0;
    this.spacePressed = 0;
    this.isGameOn = true; //! hay que añadirle un uso para recursión, ver ejemplo birds
  }

  addEnemy = () => {
    if (this.frames % 180 === 0) {
      let groundEnemy = new GroundEnemy();
      this.arrEnemies.push(groundEnemy);
      //console.log(this.arrEnemies)
    } else if (this.frames % 120 === 0) {
      let airEnemy = new AirEnemy();
      this.arrEnemies.push(airEnemy);
      //console.log(this.arrEnemies)
    }

    // Cleaning enemies array
    this.arrEnemies.forEach((eachElement) => {
      if (!eachElement.existsOnScreen) {
        // If the enemy has scrolled all the way the left edge
        this.arrEnemies.shift(); // Then remove the first enemy of the array
        //console.log(this.arrEnemies)
      }
    });
  };

  addSpiderwebToPlayer = () => {
    // Adding spiderwebs objects to the spiderwebs array
    if (arrPressedKeys.includes("Space")) {
      this.spacePressed++;
      if (this.spacePressed === 1) {
        // Only shoot a spiderweb one time per "Space" pressed
        this.spiderwebsArr.push(
          new Spiderweb(this.player.x + 30, this.player.y + 20)
        );
      }
    }

    // Delete spiderwebs from its array if scrolled all the way the rightcanvas edge
    this.spiderwebsArr.forEach((eachSpiderweb) => {
      if (!eachSpiderweb.existsOnScreen) {
        this.spiderwebsArr.shift();
      }
    });

    console.log(this.spiderwebsArr);
  };

  // Spiderwebs collision with enemies
  killEnemy = () => {
    this.arrEnemies.forEach((eachEnemy, index) => {
      this.spiderwebsArr.forEach((eachSpiderweb, index2) => {
        if (
          eachSpiderweb.x < eachEnemy.x + eachEnemy.w &&
          eachSpiderweb.x + eachSpiderweb.w > eachEnemy.x &&
          eachSpiderweb.y < eachEnemy.y + eachEnemy.h &&
          eachSpiderweb.h + eachSpiderweb.y > eachEnemy.y
        ) {
          // Collision between spiderweb (projectile) and Enemy detected!
          this.arrEnemies.splice(index, 1);
          this.spiderwebsArr.splice(index2, 1);
        }
      });
    });
  };

  // Player collision with enemies
  playerEnemyCollision = () => {
    this.arrEnemies.forEach((eachEnemy) => {
      if (
        this.player.x < eachEnemy.x + eachEnemy.w &&
        this.player.x + this.player.w > eachEnemy.x &&
        this.player.y < eachEnemy.y + eachEnemy.h &&
        this.player.h + this.player.y > eachEnemy.y
      ) {
        // Collision detected!
        this.gameOver();
      }
    });
  };

  gameOver = () => {
    // Game stopped
    this.isGameOn = false;

    // Hide Canvas
    canvas.style.display = "none";

    // "Game Over" screen displayed
    gameOverScreen.style.display = "flex";
  };

  gameLoop = () => {
    // Increments for each animation frame (60 times per second)
    this.frames++;

    // 1. Clean Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Actions and Players Movements
    this.background.moveBackground();
    this.player.movePlayer();
    this.arrEnemies.forEach((eachEnemy) => {
      if (eachEnemy.type === "air_enemy") {
        eachEnemy.moveAirEnemy();
      } else if (eachEnemy.type === "ground_enemy") {
        eachEnemy.moveGroundEnemy();
      }
    });
    this.spiderwebsArr.forEach((eachSpiderweb) => {
      eachSpiderweb.moveSpiderweb();
    });
    this.addEnemy();
    this.addSpiderwebToPlayer();
    this.killEnemy();
    this.playerEnemyCollision();

    // 3. Elements Drawning
    this.background.drawBackground();
    this.player.drawPlayer();
    this.arrEnemies.forEach((eachEnemy) => {
      if (eachEnemy.type === "air_enemy") {
        eachEnemy.drawAirEnemy();
      } else if (eachEnemy.type === "ground_enemy") {
        eachEnemy.drawGroundEnemy();
      }
    });
    this.spiderwebsArr.forEach((eachSpiderweb) => {
      eachSpiderweb.drawSpiderweb();
    });

    // 4. Recursion control
    requestAnimationFrame(this.gameLoop);
  };
}
