
kontra.init();
kontra.initKeys();


const createNewPlayer = () => new Player(
  150,
  50,
  'blue',
  'green',
  3,
  5,
  2,
  100
)

const createEnemy = (x, y, width, height, target) => new Enemy(
  x,
  y,
  'orange',
  'green',
  width,
  height,
  Math.floor(Math.random() * 10) + 5,
  width / 3,
  target,
  Math.random()
)

const getText = (text) => new kontra.Text({
  text,
  font: '14px Helvetica',
  color: 'black',
  x: 100,
  y: 30,
  anchor: {x: 0.5, y: 0.5},
  textAlign: 'center'
})

const gameState = new GameState()
gameState.startGame()

