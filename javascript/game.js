class Game {
    constructor() {
        this.background = new Background()
        this.player = new Player()
        this.arrEnemies = [];
        this.frames = 0;
    }

    addEnemy = () => {
        if (this.frames % 180 === 0) {
            let groundEnemy = new GroundEnemy()
            this.arrEnemies.push(groundEnemy);
            //console.log(this.arrEnemies)
        } 
        else if (this.frames % 120 === 0) { 
            let airEnemy = new AirEnemy()
            this.arrEnemies.push(airEnemy)
            //console.log(this.arrEnemies)
        }

        this.arrEnemies.forEach( eachElement => {
            if (eachElement.existsOnScreen === false) {
                this.arrEnemies.shift();
                //console.log(this.arrEnemies)
            }
        })
    }

    cleanEnemies = () => {

    }

    gameLoop = () => {
        // Increments for each animation frame (60 times per second)
        this.frames++;
      
        // 1. Clean Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      
        // 2. Actions and Players Movements
        this.background.moveBackground();
        this.player.movePlayer();
        this.arrEnemies.forEach( eachEnemy => {
            if (eachEnemy.type === "air_enemy") {
                eachEnemy.moveAirEnemy()
            } else if (eachEnemy.type === "ground_enemy") {
                eachEnemy.moveGroundEnemy()
            }
        })
        this.addEnemy()

        // 3. Elements Drawning
        this.background.drawBackground();
        this.player.drawPlayer();
        this.arrEnemies.forEach( eachEnemy => {
            if (eachEnemy.type === "air_enemy") {
                eachEnemy.drawAirEnemy()
            } else if (eachEnemy.type === "ground_enemy") {
                eachEnemy.drawGroundEnemy()
            }
        })
      
        // 4. Recursion control
        requestAnimationFrame(this.gameLoop);
      };
}