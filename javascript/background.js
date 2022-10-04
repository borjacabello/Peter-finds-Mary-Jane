class Background {
    constructor(selection) {
        this.img = new Image();
        if (selection) {
            this.img.src = "./images/background-day.jpg";     // background images
        } else {
            this.img.src = "./images/background-night.jpg";
        }
        this.img2 = new Image();      
        this.img2.src = "./images/roof.png"     // bottom image roofs
        this.w = canvas.width;
        this.h = canvas.height;
        this.x = 0;                  // background image 1 & bottom image 1
        this.x2 = canvas.width;      // background image 2 & bottom image 2
        this.hImg2 = 60;             // bottom image roofs
        this.y = 0;
        this.yImg2 = canvas.height - this.hImg2;   // bottom image roofs
        this.speed = 1;
    }

    moveBackground = () => {
        // The background image has scroll all the way left relative to canvas
        if (this.x <= -this.w + this.speed) {
            this.x = this.w;
        } else {
            this.x -= this.speed;  // There was a small white line so I had to consider the speed gap
        }

        // Move the 2nd background to the left
        if (this.x2 <= -this.w + this.speed) {
            this.x2 = this.w;
        } else {
            this.x2 -= this.speed;
        }
    }

    // Two background images to scroll and two bottom roof images to scroll
    drawBackground = () => {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);     
        ctx.drawImage(this.img, this.x2, this.y, this.w, this.h);
        ctx.drawImage(this.img2, this.x, this.yImg2, this.w, this.hImg2);
        ctx.drawImage(this.img2, this.x2, this.yImg2, this.w, this.hImg2);
    }
}