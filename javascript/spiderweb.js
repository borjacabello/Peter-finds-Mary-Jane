class Spiderweb {
  constructor(x, y) {
    this.img = new Image();
    this.img.src = "./images/spiderweb.png";
    this.h = 25;
    this.w = 55;
    this.x = x; // Spiderman's width
    this.y = y;
    this.speed = 4;
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
