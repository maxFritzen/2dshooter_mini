
import { init, initKeys, Text } from './mini-kontra.bundle.js'
import { GameState } from './gameState.js'
import { Player } from './player.js'
import { Enemy } from './enemy.js'
init();
initKeys();


export const createNewPlayer = () => new Player(
  150,
  50,
  'blue',
  'green',
  3,
  5,
  0, // Not sure about speed
  10 
)

export const createEnemy = (x, y, width, height, target) => new Enemy(
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

export const canvas = document.getElementById('gameCanvas')
export const { width: canvasWidth, height: canvasHeight } = canvas
export const ctx = canvas.getContext('2d')
export const gameState = new GameState()
window.gameState = gameState
gameState.drawStartScreen(true)

