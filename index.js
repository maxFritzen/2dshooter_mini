
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
  10
)

const createEnemy = (x, y, width, height, target) => new Enemy(
  x,
  y,
  'white',
  'orange',
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
  y: 20,
  anchor: {x: 0.5, y: 0.5},
  textAlign: 'center'
})

const gameState = new GameState()
gameState.startGame()

function play () {
  gameState.startGame()
}

function stop () {
  gameState.stopGame()
}
