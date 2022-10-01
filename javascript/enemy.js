class AirEnemy {
    constructor() {
        this.img = new Image();
        this.img.src = "./images/duende.png"
        this.w = 45;
        this.h = 55;
        this.x = canvas.width;
        this.y = 100 + Math.random() * canvas.height * 0.4; // Random y positions of the air enemies
        this.vx = (Math.random() * 1) + 2;                  // Random x speed for each one of them
        this.vy = 0;
        this.type = "air_enemy";
        this.existsOnScreen = true;
    }

    moveAirEnemy = () => {
        this.x -= this.vx;
        this.y += this.vy;
        if (this.x + this.w < 0) { // If the element scrolls all the way the left canvas edge
            this.existsOnScreen = false;
        }
    }

    drawAirEnemy = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}


class GroundEnemy {
    constructor() {
        this.img = new Image();
        this.img.src = "./images/rhino.png"
        this.w = 55;
        this.h = 65;
        this.x = canvas.width;
        this.y = canvas.height - this.h - 50;  // 50 is bottomMargin
        this.vx = (Math.random() * 1) + 2;
        this.type = "ground_enemy";
        this.existsOnScreen = true;
    }

    moveGroundEnemy = () => {
        this.x -= this.vx;
        if (this.x + this.w < 0) {
            this.existsOnScreen = false;
        }
    }

    drawGroundEnemy = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}