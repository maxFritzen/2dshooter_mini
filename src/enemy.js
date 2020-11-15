// @ts-check
import { canvasHeight, canvasWidth, findGridUnit, gameState, grid, gridCellSize, gridCols, typeBlood } from './index.js'
import { Obj } from './object.js'
import { collision } from './helper-functions.js'

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

  drop () {
    // Pickup will increase playerLevel until 5, then kill all enemies
    // so decrease chance of drop
    if (gameState.getPlayer().level < 5) {
      const rand = Math.floor(Math.random() * 20)
      if (rand === 1) {
        console.log('DROP')
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