// Collision between Spiderman's and enemy attacks
class AttackCollision {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "./images/small-collision.png";
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
  }

  drawAttackCollision = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

// Spiderman's collision with an enemy
class EnemyCollision {
    constructor(x, y) {
      this.img = new Image();
      this.img.src = "./images/enemy-collision.png";
      this.x = x;
      this.y = y;
      this.w = 50;
      this.h = 50;
    }
  
    drawEnemyCollision = () => {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    };
  }