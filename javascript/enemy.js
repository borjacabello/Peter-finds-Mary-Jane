class AirEnemy {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/duende.png";
    this.w = 55;
    this.h = 65;
    this.x = canvas.width;
    this.y = 100 + Math.random() * canvas.height * 0.4; // Random y positions of the air enemies
    this.vx = Math.random() * 1 + 2; // Random x speed for each one of them
    this.vy = 0;
    this.curve = Math.random() * 0.3;
    this.type = "air_enemy";
    this.existsOnScreen = true; // enemy hasn't gone all the way through the canvas left edge
  }

  moveAirEnemy = () => {
    this.x -= this.vx;
    this.vy += this.curve;
    this.y += Math.sin(this.vy);
    if (this.x + this.w < 0) {
      // If the element scrolls all the way the left canvas edge
      this.existsOnScreen = false;
    }
  };

  drawAirEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

class GroundEnemy {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/rhino.png";
    this.w = 65;
    this.h = 75;
    this.x = canvas.width;
    this.y = canvas.height - this.h - 60; // 50 is bottomMargin
    this.vx = Math.random() * 1 + 2;
    this.type = "ground_enemy";
    this.existsOnScreen = true;
  }

  moveGroundEnemy = () => {
    this.x -= this.vx;
    if (this.x + this.w < 0) {
      this.existsOnScreen = false;
    }
  };

  drawGroundEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

class TopEnemy {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/venom.png";
    this.w = 55;
    this.h = 65;
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.vx = 0;
    this.vy = 2;
    this.directionY = 1;
    this.type = "top_enemy";
    this.existsOnScreen = true; // enemy hasn't gone all the way through the canvas left edge
  }

  moveTopEnemy = () => {
    this.x += this.vx;
    this.y += this.vy * this.directionY;

    // Vertical boundaries
    if (this.y > canvas.height - this.h - 60) {
      this.directionY = -1;
    } 
    else if (this.y + this.h < 0) {
      this.existsOnScreen = false;
    }
  };

  drawTopEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

class MaryJane {
  constructor() {
    this.img = new Image();
    this.img.src = "./images/mary-jane.png";
    this.w = 50;
    this.h = 60;
    this.x = 830;
    this.y = 0;
    this.vx = 0;
    this.vy = 2;
    this.directionY = 1;
    this.type = "mary_jane";
  }

  drawMaryJane = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  moveMaryJane = () => {
    // Vertical automatic movement of MaryJane
    this.x += this.vx;
    this.y += this.vy * this.directionY;

    // Vertical boundaries
    if (this.y > canvas.height - this.h - 60) {
      // if touches the bottomMargin (60 = the image floor)
      this.directionY = -1;
    } else if (this.y <= 0) {
      // if touches the upper edge of the canvas
      this.directionY = 1;
    }
  };
}
