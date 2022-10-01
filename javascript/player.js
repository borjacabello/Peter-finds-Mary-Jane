class Player {
    constructor() {
        this.img = new Image();
        this.img.src = "./images/spiderman.png";
        this.spriteWidth = 252; // Ancho de la imagen (frame) en el spritesheet (1200x1200) en px 252
        this.spriteHeight = 277;  // Alto de cada spiderman en el spritesheet 277
        this.w = this.spriteWidth / 5 + 5;
        this.h = this.spriteHeight / 5 + 10;
        this.x = 60;
        this.bottomMargin = 50; // Margin from the canvas bottom to elevate the player
        this.y = canvas.height - this.h - this.bottomMargin;
        this.vy = 0;
        this.gravity = 1;
        this.speed = 0;     // Velocity used to indicate or establish that the player is stopped
        this.maxSpeed = 3.6; // Velocity in pixels per frame, to use when movement begins
    }

    playerOnGround = () => {
        // Return if the player is on the air
        return this.y >= canvas.height - this.h - this.bottomMargin;
    }


    movePlayer = () => {
        // Horizontal movement for every frame
        this.x += this.speed;

        if (arrPressedKeys.includes("KeyD")) {
            this.speed = this.maxSpeed;
        } else if (arrPressedKeys.includes("KeyA")) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0; // The keys array doesn't contain any key, stop the player
        }

        // Horizontal boundaries
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x > canvas.width - this.w) {
            this.x = canvas.width - this.w;
        }

        // Vertical movement for every frame
        this.y += this.vy;
        if (arrPressedKeys.includes("KeyW") && this.playerOnGround()) {
            this.vy -= 23;
        } else if (!this.playerOnGround()) {
        // vy is decreasing 20 pixels per animation frame, but starts to increase in the air by
        // 1 (this.gravity), and when gravity is higher than vy(0) it starts to fall down
            this.vy += this.gravity;
        } else {
            this.vy = 0;
        }
        
    }

    drawPlayer = () => {
        ctx.drawImage(this.img, 48, 60, this.spriteWidth, this.spriteHeight, this.x, this.y,
        this.w, this.h);
    }

}