class Game {
  constructor(playerSelected, backgroundSelected, levelSelected) {
    this.backgroundSelection = backgroundSelected; // Background button day or night pressed
    this.background = new Background(this.backgroundSelection);
    this.playerSelection = playerSelected; // Button red or black spiderman pressed
    this.player = new Player(this.playerSelection);
    this.levelSelection = levelSelected; // Button level easy medium hard pressed
    this.arrEnemies = [];
    this.spiderwebsArr = [];
    this.enemyAttacksArr = [];
    this.collisionImagesArr = [];
    this.enemyCollisionImagesArr = [];
    this.frames = 0;
    this.spacePressed = 0; // To hold player shoot
    this.timerMaryJane = 0; // To specially hold Mary Jane aparitions and time on screen
    this.score = 0;
    this.isGameOn = true;
    this.timer = this.frames / 60;
    this.audio = new Audio();
    if (this.levelSelection === 1 || this.levelSelection === undefined) {  // Different audio per level
      this.audio.src = "./audios/level1.wav";
    } else if (this.levelSelection === 2) {
      this.audio.src = "./audios/level2.mp3";
    } else {
      this.audio.src = "./audios/level3.wav";
    }
    this.audio.volume = 0.4;
  }

  // Add enemies to the enemies array
  addEnemy = () => {
    let randomFramesMaryJaneAppearance = Math.floor(Math.random() * 1200); // Between 0 and 20 seconds

    if (this.levelSelection === 1 || this.levelSelection === undefined) {
      if (this.frames % 180 === 0) {
        let groundEnemy = new GroundEnemy(this.levelSelection);
        this.arrEnemies.push(groundEnemy);
      }
      if (this.frames % 150 === 0) {
        let airEnemy = new AirEnemy(this.levelSelection);
        this.arrEnemies.push(airEnemy);
      }
      if (this.frames % 160 === 0) {
        let topEnemy = new TopEnemy(this.levelSelection);
        this.arrEnemies.push(topEnemy);
      }
    }

    if (this.levelSelection === 2) {
      if (this.frames % 120 === 0) {
        let groundEnemy = new GroundEnemy(this.levelSelection);
        this.arrEnemies.push(groundEnemy);
      }
      if (this.frames % 90 === 0) {
        let airEnemy = new AirEnemy(this.levelSelection);
        this.arrEnemies.push(airEnemy);
      }
      if (this.frames % 80 === 0) {
        let topEnemy = new TopEnemy(this.levelSelection);
        this.arrEnemies.push(topEnemy);
      }
    }

    if (this.levelSelection === 3) {
      if (this.frames % 100 === 0) {
        let groundEnemy = new GroundEnemy(this.levelSelection);
        this.arrEnemies.push(groundEnemy);
      }
      if (this.frames % 80 === 0) {
        let airEnemy = new AirEnemy(this.levelSelection);
        this.arrEnemies.push(airEnemy);
      }
      if (this.frames % 70 === 0) {
        let topEnemy = new TopEnemy(this.levelSelection);
        this.arrEnemies.push(topEnemy);
      }
    }

    if (this.timerMaryJane % (600 + randomFramesMaryJaneAppearance) === 0) {
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
          this.arrEnemies.splice(index, 1);
        }
      }
    });
  };

  // Add spiderwebs to Spideerman player
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

  // Adding attacks to random enemies
  addAttackToEnemy = () => {
    let randomizeEnemyAttack = Math.random() * 1;

    this.arrEnemies.forEach((eachEnemy) => {
      if (this.levelSelection === 1 || this.levelSelection === undefined) {
        if (
          this.frames % 80 === 0 &&
          randomizeEnemyAttack < 0.3 &&
          eachEnemy.type === "ground_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 90 === 0 &&
          randomizeEnemyAttack < 0.3 &&
          eachEnemy.type === "air_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 90 === 0 &&
          randomizeEnemyAttack < 0.3 &&
          eachEnemy.type === "top_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }
      }

      if (this.levelSelection === 2) {
        if (
          this.frames % 70 === 0 &&
          randomizeEnemyAttack < 0.6 &&
          eachEnemy.type === "ground_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 80 === 0 &&
          randomizeEnemyAttack < 0.6 &&
          eachEnemy.type === "air_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 80 === 0 &&
          randomizeEnemyAttack < 0.6 &&
          eachEnemy.type === "top_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }
      }

      if (this.levelSelection === 3) {
        if (
          this.frames % 50 === 0 &&
          randomizeEnemyAttack < 0.7 &&
          eachEnemy.type === "ground_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 60 === 0 &&
          randomizeEnemyAttack < 0.7 &&
          eachEnemy.type === "air_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }

        if (
          this.frames % 60 === 0 &&
          randomizeEnemyAttack < 0.7 &&
          eachEnemy.type === "top_enemy"
        ) {
          this.enemyAttacksArr.push(
            new EnemyAttack(eachEnemy.x, eachEnemy.y + 30, eachEnemy.type)
          );
        }
      }
    });

    // Clean enemy attacks array
    this.enemyAttacksArr.forEach((eachAttack, index) => {
      if (!eachAttack.existsOnScreen) {
        this.enemyAttacksArr.splice(index, 1);
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
            this.enemyCollisionImagesArr.push(
              new EnemyCollision(eachEnemy.x, eachEnemy.y)
            );
            this.score += 10; // Score increases for each killed enemy
            hitAudio.play();
          }
        }
      });
    });
    if (this.frames % 20 === 0 && this.frames !== 0) {
      this.enemyCollisionImagesArr.shift();
    }
  };

  // Player collision with enemies
  playerEnemyCollision = () => {
    this.arrEnemies.forEach((eachEnemy, index) => {
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
          if (this.player.lives === 3) {
            hitAudio3.play();
            this.arrEnemies.splice(index, 1);
            if (this.playerSelection) {
              this.player.img.src = "./images/black-spiderman-2.png" // Spiderman image changes
            } else {
              this.player.img.src = "./images/red-spiderman-2.png"
            }
            this.player.lives--;
          } else if (this.player.lives === 2) {
            hitAudio3.play();
            this.arrEnemies.splice(index, 1);
            if (this.playerSelection) {
              this.player.img.src = "./images/black-spiderman-3.png"
            } else {
              this.player.img.src = "./images/red-spiderman-3.png"
            }
            this.player.lives--;
          } else if (this.player.lives === 1) {
            this.gameOver();
          }
        } else if (eachEnemy.type === "mary_jane") {
          this.gamePassed();
        }
      }
    });
  };

  // Player collision with enemy attacks
  playerAttackCollision = () => {
    this.enemyAttacksArr.forEach((eachAttack, index) => {
      if (
        this.player.x < eachAttack.x + eachAttack.w &&
        this.player.x + this.player.w > eachAttack.x &&
        this.player.y < eachAttack.y + eachAttack.h &&
        this.player.h + this.player.y > eachAttack.y
      ) {
        // Collision with enemy attack detected!
        if (this.player.lives === 3) {
          hitAudio3.play();
          this.enemyAttacksArr.splice(index, 1);
          if (this.playerSelection) {
            this.player.img.src = "./images/black-spiderman-2.png" // Spiderman image changes
          } else {
            this.player.img.src = "./images/red-spiderman-2.png"
          }
          this.player.lives--;
        } else if (this.player.lives === 2) {
          hitAudio3.play();
          this.enemyAttacksArr.splice(index, 1);
          if (this.playerSelection) {
            this.player.img.src = "./images/black-spiderman-3.png"
          } else {
            this.player.img.src = "./images/red-spiderman-3.png"
          }
          this.player.lives--;
        } else if (this.player.lives === 1) {
          this.gameOver();
        }
      }
    });
  };

  // Spiderman's spiderwebs collision with enemy attacks
  spiderwebAttackCollision = () => {
    this.spiderwebsArr.forEach((eachSpiderweb, index) => {
      this.enemyAttacksArr.forEach((eachAttack, index2) => {
        if (
          eachSpiderweb.x < eachAttack.x + eachAttack.w &&
          eachSpiderweb.x + eachSpiderweb.w > eachAttack.x &&
          eachSpiderweb.y < eachAttack.y + eachAttack.h &&
          eachSpiderweb.h + eachSpiderweb.y > eachAttack.y
        ) {
          this.spiderwebsArr.splice(index, 1);
          this.enemyAttacksArr.splice(index2, 1);
          this.collisionImagesArr.push(
            new AttackCollision(eachAttack.x, eachAttack.y)
          );
          hitAudio2.play();
        }
      });
    });
    if (this.frames % 20 === 0 && this.frames !== 0) { // Time image collision appears on screen
      this.collisionImagesArr.shift();
    }
  };

  // Increment general timer / 60 frames
  incrementTimer = () => {
    if (this.frames % 60 === 0) {
      this.timer++;
    }
  };

  // Add last attempts to the table located below canvas using DOM: name, time, score
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

  // Draws score, timer and lives
  drawScore = () => {
    ctx.font = "200 25px Arial";
    let timerStr = `Timer: ${this.timer}`;
    ctx.fillText(timerStr, 10, 40);

    ctx.font = "200 25px Arial";
    let scoreStr = `Score: ${this.score}`;
    ctx.fillText(scoreStr, 10, 80);

    ctx.font = "200 25px Arial";
    let lifeStr = `Lives: ${this.player.lives}`;
    ctx.fillText(lifeStr, 10, 120);
  };

  // Game ends with a collision and gameover screen is displayed
  gameOver = () => {
    this.isGameOn = false;
    this.addRankingPositions();
    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
    this.audio.pause();
    audioGameOver.play();
  };

  // Game ends finding Mary Jane and passed-screen is displayed
  gamePassed = () => {
    this.isGameOn = false;
    this.addRankingPositions();
    gameScreen.style.display = "none";
    gamePassedScreen.style.display = "flex";
    this.audio.pause();
    finalAudio.play();
  };

  // Main recursive game loop
  gameLoop = () => {
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

    this.enemyAttacksArr.forEach((eachAttack) => {
      eachAttack.moveEnemyAttack();
    });

    this.addEnemy();
    this.addSpiderwebToPlayer();
    this.addAttackToEnemy();
    this.killEnemy();
    this.playerEnemyCollision();
    this.playerAttackCollision();
    this.spiderwebAttackCollision();
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

    this.enemyAttacksArr.forEach((eachAttack) => {
      eachAttack.drawEnemyAttack();
    });

    this.collisionImagesArr.forEach((eachImage) => {
      eachImage.drawAttackCollision();
    });

    this.enemyCollisionImagesArr.forEach((eachImage) => {
      eachImage.drawEnemyCollision();
    });

    this.drawScore();

    //* 4. Recursion control
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
