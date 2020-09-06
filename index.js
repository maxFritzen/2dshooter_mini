
kontra.init();
kontra.initKeys();

const newPlayer = new Player(
  150,
  50,
  'blue',
  'green',
  3,
  5,
  2,
  10
)

const createEnemy = (x, y, width, height) => new Enemy(
  x,
  y,
  'white',
  'orange',
  width,
  height,
  Math.floor(Math.random() * 10) + 5,
  10,
  newPlayer,
  Math.random()
)

const gameState = new GameState()
gameState.incEnemies()

let loop = kontra.GameLoop({
  update: function() {
    gameState.getPlayer().update();
    gameState.getEnemies().map(sprite => sprite.update())
    gameState.getBlood().map(sprite => sprite.update())
    gameState.getProjectiles().map(sprite => sprite.update())
    gameState.getFireEffects().map(sprite => sprite.update())
    gameState.removeEnemies()
    gameState.removeProjectiles()
    gameState.removeFireEffects()
    if (gameState.getEnemies().length <= 0) {
      gameState.incLevel()
      gameState.incEnemies()
    }

  },
  render: function() {
    gameState.getPlayer().render();
    gameState.getEnemies().map(sprite => sprite.render())
    gameState.getProjectiles().map(sprite => sprite.render())
    gameState.getBlood().map(sprite => sprite.render())
    gameState.getFireEffects().map(sprite => sprite.render())
  }
});

loop.start()