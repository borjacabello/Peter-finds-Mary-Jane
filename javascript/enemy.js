class AirEnemy {
  constructor() {
    let randomizeAirEnemy = Math.random() * 1;
    this.img = new Image();
    if (randomizeAirEnemy < 0.5) {
      this.img.src = "./images/duende.png";
    } else {
      this.img.src = "./images/hodgoblin.png";
    }
    this.w = 55;
    this.h = 65;
    this.x = canvas.width;
    this.y = 100 + Math.random() * canvas.height * 0.4; // Random y positions of the air enemies
    this.vx = Math.random() * 2 + 2; // Random x speed for each one of them
    this.vy = 0;
    this.curve = Math.random() * 0.3;
    this.type = "air_enemy";
    this.existsOnScreen = true; // enemy hasn't gone all the way through the canvas left edge
  }

  moveEnemy = () => {
    this.x -= this.vx;
    this.vy += this.curve;
    this.y += Math.sin(this.vy);
    if (this.x + this.w < 0) {
      // If the element scrolls all the way the left canvas edge
      this.existsOnScreen = false;
    }
  };

  drawEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

class GroundEnemy {
  constructor() {
    let randomizeGroundEnemy = Math.random() * 1;
    this.img = new Image();
    if (randomizeGroundEnemy < 0.5) {
      this.img.src = "./images/rhino.png";
    } else {
      this.img.src = "./images/electro.png";
    }
    this.w = 65;
    this.h = 75;
    this.x = canvas.width;
    this.y = canvas.height - this.h - 60; // 50 is bottomMargin
    this.vx = Math.random() * 2 + 1;
    this.type = "ground_enemy";
    this.existsOnScreen = true;
  }

  moveEnemy = () => {
    this.x -= this.vx;
    if (this.x + this.w < 0) {
      this.existsOnScreen = false;
    }
  };

  drawEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };
}

class TopEnemy {
  constructor() {
    let randomizeTopEnemy = Math.random() * 1;
    this.img = new Image();
    //let venomType = "./images/venom.png";
    if (randomizeTopEnemy < 0.5) {
      this.img.src = "./images/octopus.png";
    } else {
      this.img.src = "./images/venom.png";
    }
    this.w = 65;
    this.h = 65;
    this.x = 60 + Math.random() * canvas.width * 0.8;
    this.y = 0;
    this.vx = 0;
    this.vy = 1 + Math.random() * 2;
    this.directionY = 1;
    this.type = "top_enemy";
    this.existsOnScreen = true; // enemy hasn't gone all the way through the canvas left edge
  }

  moveEnemy = () => {
    this.x += this.vx;
    this.y += this.vy * this.directionY;

    // Vertical boundaries
    if (this.y > canvas.height - this.h - 60) {
      this.directionY = -1;
    } else if (this.y + this.h < 0) {
      this.existsOnScreen = false;
    }
  };

  drawEnemy = () => {
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

  drawEnemy = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  moveEnemy = () => {
    // Vertical automatic movement of MaryJane
    this.x += this.vx;
    this.y += this.vy * this.directionY;

    // Vertical boundaries
    if (this.y > canvas.height - this.h - 200) {
      // if touches the bottomMargin (60 = the image floor)
      this.directionY = -1;
    } else if (this.y <= 0) {
      // if touches the upper edge of the canvas
      this.directionY = 1;
    }
  };
}
