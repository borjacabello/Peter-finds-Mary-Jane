class Game {
  constructor(playerSelected, backgroundSelected) {
    this.backgroundSelection = backgroundSelected;
    this.background = new Background(this.backgroundSelection);
    this.playerSelection = playerSelected; // Button red or black spiderman pressed
    this.player = new Player(this.playerSelection);
    this.arrEnemies = [];
    this.spiderwebsArr = [];
    this.frames = 0;
    this.spacePressed = 0;
    this.timerMaryJane = 0;
    this.score = 0;
    this.isGameOn = true;
    this.timer = this.frames / 60;
  }

  addEnemy = () => {
    // 20 seconds = 1200 frames
    let randomFramesMaryJaneAppearance = Math.floor(Math.random() * 1200); // Between 0 and 20 seconds

    if (this.frames % 103 === 0) {
      let groundEnemy = new GroundEnemy();
      this.arrEnemies.push(groundEnemy);
    } else if (this.frames % 87 === 0) {
      let airEnemy = new AirEnemy();
      this.arrEnemies.push(airEnemy);
      //console.log(this.arrEnemies)
    } else if (this.frames % 95 === 0) {
      let topEnemy = new TopEnemy();
      this.arrEnemies.push(topEnemy);
      //console.log(this.arrEnemies)
    } else if (
      this.timerMaryJane % (600 + randomFramesMaryJaneAppearance) ===
      0
    ) {
      // Mary Jane appears at intervals between 20 and 30 seconds
      this.timerMaryJane = 0; // Timer set to 0 when mary jane appears
      let maryjaneEnemy = new MaryJane();
      this.arrEnemies.push(maryjaneEnemy);
    }

    // Cleaning enemies array
    this.arrEnemies.forEach((eachElement, index) => {
      if (
        eachElement.type === "air_enemy" ||
        eachElement.type === "ground_enemy" ||
        eachElement.type === "top_enemy"
      ) {
        if (!eachElement.existsOnScreen) {
          // If the enemy has scrolled all the way the left edge
          this.arrEnemies.splice(index, 1); // Then remove that enemy of the array
        }
      } else if (eachElement.type === "mary_jane") {
        // Delete Mary jane if spiderman doesn't collision with she
        if (this.timerMaryJane % 420 === 0 && this.timerMaryJane !== 0) {
          // Mary jane visible 7 seconds
          // ! this.timerMaryJane = 0; only to use if want to reset mary jane timer after watching her on screen
          this.arrEnemies.splice(index, 1);
        }
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
          new Spiderweb(this.player.x + 32, this.player.y + 30)
        );
      }
    }

    // Delete spiderwebs from its array if scrolled all the way the rightcanvas edge
    this.spiderwebsArr.forEach((eachSpiderweb) => {
      if (!eachSpiderweb.existsOnScreen) {
        this.spiderwebsArr.shift();
      }
    });
  };

  // Spiderwebs collision with enemies
  killEnemy = () => {
    this.arrEnemies.forEach((eachEnemy, index) => {
      this.spiderwebsArr.forEach((eachSpiderweb, index2) => {
        if (
          eachEnemy.type === "air_enemy" || // Only collisions with enemy type which is not Mary Jane
          eachEnemy.type === "ground_enemy" ||
          eachEnemy.type === "top_enemy"
        ) {
          if (
            eachSpiderweb.x < eachEnemy.x + eachEnemy.w &&
            eachSpiderweb.x + eachSpiderweb.w > eachEnemy.x &&
            eachSpiderweb.y < eachEnemy.y + eachEnemy.h &&
            eachSpiderweb.h + eachSpiderweb.y > eachEnemy.y
          ) {
            // Collision between spiderweb (projectile) and Enemy detected!
            this.arrEnemies.splice(index, 1);
            this.spiderwebsArr.splice(index2, 1);
            this.score += 10; // Score increases for each killed enemy
          }
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
        if (
          eachEnemy.type === "air_enemy" ||
          eachEnemy.type === "ground_enemy" ||
          eachEnemy.type === "top_enemy"
        ) {
          // Collision with air or ground enemy detected!
          this.gameOver();
        } else if (eachEnemy.type === "mary_jane") {
          this.gamePassed();
        }
      }
    });
  };

  incrementTimer = () => {
    if (this.frames % 60 === 0) {
      this.timer++;
    }
  };

  // Add last attempts to the table located below canvas
  addRankingPositions = () => {
    console.log(rankingValues);
    let html = "";
    let finalTimer = this.timer;
    let finalScore = this.score;

    let rankingObject = {
      name: playerName.value,
      time: finalTimer,
      score: finalScore,
    };

    if (rankingValues.length > 2) {
      rankingValues.pop();
    }

    rankingValues.unshift(rankingObject);

    rankingValues.forEach((eachObject) => {
      html += `
        <tr>
          <td>
            <span>${eachObject.name}</span>
          </td> 
          <td>
            <span>${eachObject.time}</span>
          </td>
          <td>
            <span>${eachObject.score}</span>
          </td>
        </tr>
      `;
    });

    bodyTableDom.innerHTML = html;
  };

  drawScore = () => {
    ctx.font = "200 25px Arial";
    let timerStr = `Timer: ${this.timer}`;
    ctx.fillText(timerStr, 10, 40);

    ctx.font = "200 25px Arial";
    let scoreStr = `Score: ${this.score}`;
    ctx.fillText(scoreStr, 10, 80);
  };

  // Game ends with a collision and gameover screen is displayed
  gameOver = () => {
    this.isGameOn = false;
    this.addRankingPositions();
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
  };

  // Game ends finding Mary Jane and passed-screen is displayed
  gamePassed = () => {
    this.isGameOn = false;
    this.addRankingPositions();
    gameScreen.style.display = "none";
    gamePassedScreen.style.display = "flex";
  };

  gameLoop = () => {
    /*if (this.frames % 60 === 0) {
      console.log("seconds in game", this.time)
      let newDate = new Date()
      let realTimePassed = newDate - this.lastTime
      console.log(realTimePassed / 1000)
      this.time++
    }*/

    this.frames++;
    this.timerMaryJane++;

    //* 1. Clean Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* 2. Actions and Players Movements
    this.background.moveBackground();
    this.player.movePlayer();

    this.arrEnemies.forEach((eachEnemy) => {
      eachEnemy.moveEnemy();
    });

    this.spiderwebsArr.forEach((eachSpiderweb) => {
      eachSpiderweb.moveSpiderweb();
    });

    this.addEnemy();
    this.addSpiderwebToPlayer();
    this.killEnemy();
    this.playerEnemyCollision();
    this.incrementTimer();

    //* 3. Elements Drawning
    this.background.drawBackground();
    this.player.drawPlayer();

    this.arrEnemies.forEach((eachEnemy) => {
      eachEnemy.drawEnemy();
    });

    this.spiderwebsArr.forEach((eachSpiderweb) => {
      eachSpiderweb.drawSpiderweb();
    });

    this.drawScore();

    //* 4. Recursion control
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
