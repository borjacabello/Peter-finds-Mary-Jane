class Spiderweb {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "./images/spiderweb.png";
    this.h = 25;
    this.w = 55;
    this.x = x; // Spiderman's x position
    this.y = y;
    this.speed = 5;
    this.existsOnScreen = true;
  }

  // Move Spiderman attacks
  moveSpiderweb = () => {
    this.x += this.speed;
    if (this.x > canvas.width) {
      this.existsOnScreen = false;
    }
  };

  // Draw Spirderman attacks
  drawSpiderweb = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}

// Enemy attacks
class EnemyAttack {
  constructor(enemyX, enemyY, enemyType) {
    this.img = new Image();
    this.type = enemyType;
    if (this.type === "ground_enemy") {
      this.img.src = "./images/pink-attack.png";
      this.h = 50;
      this.w = 80;
    } else if (this.type === "air_enemy") {
      this.img.src = "./images/green-attack.png"
      this.h = 60;
      this.w = 110;
    } else if (this.type === "top_enemy") {
      this.img.src = "./images/purple-attack.png"
      this.h = 80;
      this.w = 50;
    }
    this.x = enemyX;
    this.y = enemyY;
    this.vx = 0;
    this.speed = 3;
    this.existsOnScreen = true;
  }

  moveEnemyAttack = () => {
    if (this.type === "ground_enemy") {
      this.x -= this.speed;
      if (this.x < 0) {
        this.existsOnScreen = false;
      }
    }

    if (this.type === "air_enemy") {
      this.x -= this.speed;
      this.y += this.speed;

      if (this.y > canvas.height) {
        this.existsOnScreen = false;
      } else if (this.x + this.w < 0) {
        this.existsOnScreen = false;
      }
    }

    if (this.type === "top_enemy") {
      this.x += this.vx;
      this.y += this.speed;

      if (this.y > canvas.height) {
        this.existsOnScreen = false;
      }
    }
  }

  drawEnemyAttack = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}