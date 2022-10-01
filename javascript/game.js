class Game {
    constructor() {
        this.fondo = new Background()
        this.player = new Player()
        //this.frames = 0;
    }

    gameLoop = () => {
        //this.frames = this.frames + 1;
      
        // 1. Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // 2. Acciones y movimientos de los elementos
        this.fondo.moveBackground();
        this.player.movePlayer();

        // 3. Dibujado de los elementos
        this.fondo.drawBackground();
        this.player.drawPlayer();
      
        // 4. Control de la recursión
        requestAnimationFrame(this.gameLoop);
      };
}