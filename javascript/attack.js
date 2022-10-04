class Spiderweb {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "./images/spiderweb.png";
    this.h = 25;
    this.w = 55;
    this.x = x; // Spiderman's width
    this.y = y;
    this.speed = 5;
    this.existsOnScreen = true;
  }

  moveSpiderweb = () => {
    this.x += this.speed;
    if (this.x > canvas.width) {
      this.existsOnScreen = false;
    }
  };

  drawSpiderweb = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }

  /*drawSpiderweb = () => {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.w, this.y);
        ctx.stroke();
        ctx.closePath();
    }*/
}


class EnemyAttack {
  constructor(enemyX, enemyY, enemyType) {
    this.img = new Image();
    this.img.src = "./images/14.png";
    this.x = enemyX;
    this.y = enemyY;
    this.type = enemyType;
    this.h = 10;
    this.w = 80;
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
  }

  drawEnemyAttack = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
