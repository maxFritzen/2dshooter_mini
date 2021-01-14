// @ts-check
import { canvasHeight, canvasWidth, findGridUnit, gameState, grid, gridCellSize, gridCols, gridRows, typeBlood } from './index.js'
import { Obj } from './object.js'
import { collision } from './helper-functions.js'
const FIND_CLOSEST_TARGET_TIMER = 100
const MOVE_TIMER = 0

const getDistance = (myCol, myRow, targetCol, targetRow) => {
  // Math.abs because -2 should count same as +2
  // Distance now is The amount of steps needed rather than actual distance
  const rowDistance = Math.abs(myRow - targetRow)
  const colDistance = Math.abs(myCol - targetCol)
  const distance = rowDistance + colDistance
  return distance
}

export class Enemy extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp, target, id) {
    super(x, y, color, damageColor, width, height, speed, hp) 
    this.target = target
    this.id = id
    this.direction = ''
    this.originalSpeed = this.width
    this.limit = 5
    this.hp = this.width + this.height
    this.ttl = 10
    this.damage = 10
    this.prevGridUnit = null
    this.currentGridUnit = null
    this.findClosestTargetTimer = FIND_CLOSEST_TARGET_TIMER
    this.moveTimer = MOVE_TIMER
  }

  die () {
    // this.drop ()
    this.ttl = 0
    gameState.removeFromEnemiesGridPositions(this.currentGridUnit, grid[this.currentGridUnit].enemy.id)
    grid[this.currentGridUnit].type = typeBlood
  }

  isAlive () {
    return this.ttl > 0
  }

  findClosestTarget = () => {

    if (!grid[this.currentGridUnit]) {
      return
    }
    const myCol = grid[this.currentGridUnit].col
    const myRow = grid[this.currentGridUnit].row
    // get row and column of a player
    
    const currentTargetDistance = getDistance(
      myCol,
      myRow,
      grid[this.target.currentGridUnitPosition].col,
      grid[this.target.currentGridUnitPosition].row
    )

    gameState.players.forEach((player) => {
      const distance = getDistance(
        myCol,
        myRow,
        grid[player.currentGridUnitPosition].col,
        grid[player.currentGridUnitPosition].row
      )
      if (distance < currentTargetDistance) {
        // change target
        this.target = player
      }
    })

  }


  drop () {
    // Pickup will increase playerLevel until 5, then kill all enemies
    // so decrease chance of drop
    if (gameState.players[0].level < 5) {
      const rand = Math.floor(Math.random() * 20)
      if (rand === 1) {
        gameState.incPickup(this.x, this.y)
      }
    } else {
      const rand = Math.floor(Math.random() * 200)
      if (rand === 1) {
        gameState.incPickup(this.x, this.y)
      }
    }
  }

  update() {
    this.move()

    if (this.currentGridUnit === this.target.currentGridUnitPosition) {
      this.target.hit(1)
    }
  }

  checkCollisionWithPlayer () {
    const isCollision = collision(this.target, this)
    if (isCollision) {
      this.target.hit(this.damage)
    }
  }

  move() {
    if (this.moveTimer > 0) {
      this.moveTimer--
      return
    }
    this.moveTimer = MOVE_TIMER
    
    // guess I should change this to targetCol and row?
    // or update x and y according to grid[index]


    // If enemy is outside of map
    if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
      const targetX = Math.floor(this.target.x)
      const targetY = Math.floor(this.target.y)

      if (this.x <= targetX) {
        this.direction = 'right'
        this.x += 1 
      }
      if (this.x >= targetX) {
        this.direction = 'left'
        this.x -= 1 
      }
      if (this.y <= targetY) {
        this.direction = 'down'
        this.y += 1
      }
      if (this.y >= targetY) {
        this.direction = 'up'
        this.y -= 1
      } 
      return 
    }
    if (this.limit > 0) {
      this.limit--
      return
    }
    this.limit = 5

    // Inside of map:

    if (this.currentGridUnit === null || this.currentGridUnit === undefined) {
      this.currentGridUnit = findGridUnit(this.x, this.y)
    }

    this.prevGridUnit = this.currentGridUnit ?? findGridUnit(this.x + this.width/2, this.y + this.height/2)
    // Find direction depending on col and row
    
    const targetsRow = grid[this.target.currentGridUnitPosition].row
    const targetsCol = grid[this.target.currentGridUnitPosition].col
    
    const { col, row } = grid[this.currentGridUnit]
    this.direction = ''
    if (targetsRow < row) {
      this.direction = 'up'
    }
    if (targetsRow > row) {
      this.direction = 'down'
    }
    if (targetsCol < col) {
      this.direction = 'left'
    }
    if (targetsCol > col) {
      this.direction = 'right'
    }

    // Some randomness in enemy movement
    const random = Math.random()
    if (random <= 0.5) {
      this.direction = ''
    }

    // change grid depending on direction
    switch (this.direction) {
      case 'up': {
        if (grid[this.currentGridUnit - gridCols]) {
          this.currentGridUnit -= gridCols
        }
        break
      }
      case 'down': {
        if (grid[this.currentGridUnit + gridCols]) {
          this.currentGridUnit += gridCols
        }
        break
      }
      case 'left': {
        if (grid[this.currentGridUnit -1]) {
          this.currentGridUnit -= 1
        }
        break
      }
      case 'right': {
        if (grid[this.currentGridUnit + 1]) {
          this.currentGridUnit += 1
        }
        break
      }

    }

    if (this.currentGridUnit !== this.prevGridUnit) {
      gameState.addToEnemiesGridPositions(this.currentGridUnit, this)
      gameState.removeFromEnemiesGridPositions(this.prevGridUnit, this.id)
    }

    // check collision with other enemies
    // check collision with enemy


    // move one grid at the time
    // direction= 'up'
      // cell = this.cellIndex - gridCols, right?
      // down is + gridCols
    // left/right = + OR - 1
    
    // If outside of map:
      // Ignore gridCells, just move x and y
  }
}