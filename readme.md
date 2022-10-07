# Peter finds Mary Jane

## [See the Game](https://borjacabello.github.io/Peter-finds-Mary-Jane/)

NOTE: above link will be added later

# Description

Peter finds Mary Jane is a Spider-Man based-on animation where Peter, the main player, has to move
to the right with full range of movement (right, left, jump) while he kills different air and ground
enemies. Among the main options are the background music play, player selection (red or black spiderman),
background selection (night or day) and difficulty level (easy, medium hard).

Peter has three lives, and each collision with a villain or a villain attack will rest one life.
If Peter loses all his lives, game over screen is displayed.

The game ends when Peter reaches Mary Jane position in the final animation, after a certain time,
when she appears on the screen ramdomly. Final score will have been calculated through the number
of enemies killed along the way. It will be displayed in the next game on a table, along with
the time spent in passing the previous game.

# Main Functionalities

- Spider-Man moves himself in any range of positions, with controlled (gravity exists) jumps.
- On-ground and air enemies appear randomly from the right and top screen edges.
- Enemies can shot and hurt Spider-Man.
- Spider-Man shots with spider webs to its enemies.
- Spider-Man can destroy enemy attacks and those enemies.
- Spider-Man has three lives and looses life with each collision.
- Scores grow up with each enemy killed.
- Mary Jane appears at a random time, almost always before a minute.
- Timer is counting the actual game time.
- A table shows the last three attempts together with the name of the player.
- Random enemies quantity and velocity vary with the difficulty level.
- Music is displayed. Main-screen music can be switched on and off.
- Player and background selection.
- Game-over screen or Passed-screen is displayed depending on the game result.

# Backlog Functionalities

- Spider-Man animation image is different for each movement.
- Spider-Man could shot in any direction.

# Proyect Structure

## main.js

- startGame() {}
- replayGame() {}
- returnToHomePage() {}
- gameoverHomePage() {}
- changeRedPlayer() {}
- changeBlackPlayer() {}
- changeNightBackground() {}
- changeDayBackground() {}
- changeEasyLevel() {}
- changeMediumLevel() {}
- changeHardLevel() {}
- reproduceBackgroundMusic() {}
- stopBackgroundMusic() {}

## game.js

- Game (playerSelected, backgroundSelected, levelSelected) {
  this.backgroundSelection;
  this.background;
  this.playerSelection;
  this.player;
  this.levelSelection;
  this.arrEnemies;
  this.spiderwebsArr;
  this.enemyAttacksArr;
  this.collisionImagesArr;
  this.enemyCollisionImagesArr;
  this.frames;
  this.spacePressed;
  this.timerMaryJane;
  this.score;
  this.isGameOn;
  this.timer;
  this.audio;
  this.audio.volume }
- addEnemy() {}
- addSpiderwebToPlayer() {}
- addAttackToEnemy() {}
- killEnemy() {}
- playerEnemyCollision() {}
- playerAttackCollision() {}
- spiderwebAttackCollision() {}
- incrementTimer() {}
- addRankingPositions() {}
- drawScore() {}
- gameOver() {}
- gamePassed() {}
- gameLoop () {}

## player.js

- Player (selection) {
  this.img;
  this.w;
  this.h;
  this.x;
  this.bottomMargin;
  this.y;
  this.vy;
  this.gravity;
  this.speed;
  this.maxSpeed;
  this.lives
  }
- playerOnGround () {}
- drawPlayer () {}
- movePlayer () {}

## enemy.js

- AirEnemy(selectedLevel) {
  this.levelSelection;
  let randomizeAirEnemy;
  this.img;
  this.w;
  this.h;
  this.x;
  this.y;
  this.vx;
  this.vy;
  this.curve;
  this.type;
  this.existsOnScreen }

  - moveEnemy() {}
  - drawEnemy() {}

- GroundEnemy(selectedLevel) {
  this.levelSelection;
  let randomizeGroundEnemy;
  this.img;
  this.w;
  this.h;
  this.x;
  this.y;
  this.type;
  this.existsOnScreen }

  - moveEnemy() {}
  - drawEnemy() {}

- TopEnemy(selectedLevel) {
  this.levelSelection;
  let randomizeTopEnemy;
  this.img;
  this.w;
  this.h;
  this.x;
  this.y;
  this.vx;
  this.directionY;
  this.type;
  this.existsOnScreen }

  - moveEnemy() {}
  - drawEnemy() {}

- MaryJane() {
  this.img;
  this.w;
  this.h;
  this.x;
  this.y;
  this.vx;
  this.vy;
  this.directionY;
  this.type }
  - drawEnemy() {}
  - moveEnemy() {}

## attack.js

- Spiderweb(x, y) {
  this.img;
  this.h;
  this.w;
  this.x;
  this.y;
  this.speed;
  this.existsOnScreen }

  - moveSpiderweb() {}
  - drawSpiderweb() {}

- EnemyAttack(enemyX, enemyY, enemyType) {
  this.img;
  this.type;
  this.h;
  this.w;
  this.x;
  this.y;
  this.vx;
  this.speed;
  this.existsOnScreen }
  - moveEnemyAttack() {}
  - drawEnemyAttack() {}

## background.js

- Background(selection) {
  this.img;
  this.img2;
  this.w;
  this.h;
  this.x;
  this.x2;
  this.hImg2;
  this.y;
  this.yImg2;
  this.speed }
  - moveBackground() {}
  - drawBackground() {}

## collision.js

- AttackCollision(x, y) {
  this.img;
  this.x;
  this.y;
  this.w;
  this.h }
  - drawAttackCollision() {}

- EnemyCollision(x, y) {
  this.img;
  this.x;
  this.y;
  this.w;
  this.h }
  - drawEnemyCollision() {}

# States and Transitions

- Main Screen
- Game Screen
- Game Over Screen
- Win Screen

# Extra Links (The links can be added later when available)

### Trello

[Link](www.your-url-here.com)

### Slides

[Link](www.your-url-here.com)
