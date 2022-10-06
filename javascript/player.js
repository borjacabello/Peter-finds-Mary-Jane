class Player {
    constructor(selection) {
        this.img = new Image();
        if (selection) { // Button "Red Spiderman" pressed
            this.img.src = "./images/black-spiderman.png";
        } else {
            this.img.src = "./images/red-spiderman.png"
        }
        this.w = 70
        this.h = 80
        this.x = 60;
        this.bottomMargin = 60; // Margin from the canvas bottom to elevate the player
        this.y = canvas.height - this.h - this.bottomMargin;
        this.vy = 0;
        this.gravity = 1;
        this.speed = 0;     // Velocity used to indicate or establish that the player is stopped
        this.maxSpeed = 3.6; // Velocity in pixels per frame, to use when movement begins
        this.lives = 3;
    }

    playerOnGround = () => {
        // Return if the player is on the air
        return this.y >= canvas.height - this.h - this.bottomMargin;
    }


    movePlayer = () => {
        // Horizontal movement for every frame
        this.x += this.speed;  // Initially 0, doesn't move

        if (arrPressedKeys.includes("KeyD")) {
            this.speed = this.maxSpeed;  // Only have to change the this.speed value
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
        this.y += this.vy;  // 0 at the beginning, doesn't move without pressing a key
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
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

}