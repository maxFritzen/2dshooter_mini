// @ts-check
import { GameState } from './gameState.js'
import { Player } from './player.js'
import { Enemy } from './enemy.js'
import { drawRect, drawText } from './common-graphics.js';

const levelOne = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,1,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,
  1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,1,1,1,
  1,1,0,0,2,0,0,2,0,0,0,0,3,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

export const playerStart = 2
export const darkBrick = 3
export const lightBrick = 4
export const gridWidth = 10;
export const gridHeight = 10;
export const gridCellSize = 10
export const gridCols = 800 / gridCellSize;
export const gridRows = 600 / gridCellSize;
export let grid = new Array(gridCols * gridRows); // 4600 if gridCellSize = 10
export const darkSquare = 'darkSquare'
export const typeEnemy = 'enemy'
export const typePickup = 'pickup'
export const typeBlood = 'blood'


function insertSquares () {
  // To visualize grid
  for (let eachRowFirst = 0; eachRowFirst < gridRows; eachRowFirst++) {
    for (let eachColFirst = 0; eachColFirst < gridCols; eachColFirst++) {
      const index = colRowIndex(eachColFirst, eachRowFirst)
      grid[index] = {
        type: '',
        background: '',
        col: eachColFirst,
        row: eachRowFirst
      }
      if (eachRowFirst % 2 === 0) {
        if (eachColFirst % 2 === 0) {
          grid[index].background = darkSquare
        }
      } else {
        if (eachColFirst % 2 !== 0) {
          grid[index].background = darkSquare
        }
      }
    }
  }
}

insertSquares()

export function colRowIndex (col, row) {
  return col + gridCols * row
}

export function findGridUnit (centerX, centerY) {
  const gridCol = Math.floor(centerX / gridCellSize)
  const gridRow = Math.floor(centerY / gridCellSize)
  return colRowIndex(gridCol, gridRow)
}

export function drawMap() {
  let drawTileX = 0
  let drawTileY = 0
  const width = gridCellSize
  const height = gridCellSize
  for (let eachRow = 0; eachRow < gridRows; eachRow++) {
    for (let eachCol = 0; eachCol < gridCols; eachCol++) {
      const gridUnit = colRowIndex(eachCol, eachRow)
      const { type, background, col, row } = grid[gridUnit]
      
      if (type === typeEnemy) {
        drawRect(drawRect(drawTileX, drawTileY, width, height, 'yellow'))
      } else if (type === typeBlood) {
        drawRect(drawRect(drawTileX, drawTileY, width, height, 'red'))
      } else if (background === darkSquare) { // This is just for dev-purpose
        drawRect(drawTileX, drawTileY, width, height, 'darkgrey')
      }
      // drawText(gridUnit.toString(), drawTileX + (width / 2) - 12, drawTileY + height/2, 'black')
      // drawText(col.toString(), drawTileX + (width / 2) - 12, drawTileY + height/2 + 8, 'black')
      // drawText(row.toString(), drawTileX + (width / 2) - 12, drawTileY + height/2 + 16, 'black')
      drawTileX += gridCellSize
    }
    drawTileY += gridCellSize
    drawTileX = 0
  }
}

function getPlayerStartPos () {
  for (let eachRow = 0; eachRow < gridRows; eachRow++) {
    for (let eachCol = 0; eachCol < gridCols; eachCol++) {
      let index = colRowIndex(eachCol, eachRow)
      if (grid[index] === playerStart) {
        const x = eachCol * gridWidth
        const y = eachRow * gridHeight
        grid[index] = 0
        return { x, y }
      }
    }
  }
}


export const createNewPlayer = () => new Player(
  0,
  0,
  'blue',
  'green',
  8,
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
// @ts-ignore
export const { width: canvasWidth, height: canvasHeight } = canvas
// @ts-ignore
export const ctx = canvas.getContext('2d')
export const gameState = new GameState()
// @ts-ignore
window.gameState = gameState
gameState.drawStartScreen(true)

