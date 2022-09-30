# Peter finds Mary Jane


## [See the Game](www.your-url-here.com)
NOTE: above link will be added later

# Description

Peter finds Mary Jane is a Spider-Man based-on animation where Peter, the main player, has to move 
to the right with full range of movement (right, left, jump), collecting items for Mary Jane which
are located in the air and killing on-ground and air enemies.

The game ends when Peter reaches Mary Jane position in the final animation. Final score will have
been calculated through the number of enemies killed along the way.

# Main Functionalities

- Spider-Man moves himself in any range of positions, with controlled (gravity exists) jumps.
- Random roofs with gaps between them are under the Spider-Man and on-ground enemies position.
- Spider-Man could fall into the gaps.
- Mary Jane's gifts appear ramdomly at any air location in the screen.
- Spider-Man is able to collect the air items.
- On-ground and air enemies appear randomly from the right screen.
- Air enemies can shot Spider-Man.
- Spider-Man shots with spider webs to its enemies.
- Scores grow up with each enemy killed.
- Gifts total grows up with each collected item.
- Velocity increases with time.
- Random enemies amount increases with time.

# Backlog Functionalities

- Spider-Man animation image is different for each movement.
- A background sound is playing the whole time.
- Levels of difficulty can be introduced (variation with animation speed or random enemies).
- An impact sound is reproduced when an enemy is killed.

# Proyect Structure

## main.js

- startGame()

## game.js

- Game () {
    this.background;
    this.background.src;
    this.player;
}
- gameLoop () {}
- drawBackground () {}
- checkCollisions () {}

## player.js 

- Player () {
    this.img;
    this.img.src;
    this.i
    this.x;
    this.y;
    this.w;
    this.h;
    this.speed;
    this.maxSpeed;
    this.gravity;
}

- onGround () {}
- drawPlayer () {}
- movePlayer () {}

# States and Transitions

- splashScreen
- gameScreen
- succesfulGameScreen
- gameOverScreen

# Extra Links (The links can be added later when available)

### Trello
[Link](www.your-url-here.com)

### Slides
[Link](www.your-url-here.com)