// @ts-check
import { findGridUnit, gameState } from './index.js'
import { Obj } from './object.js'
import { collision } from './helper-functions.js'

export class Enemy extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp, target, id) {
    super(x, y, color, damageColor, width, height, speed, hp) 
    this.target = target
    this.id = id
    this.direction = ''
    this.originalSpeed = this.width
    this.limit = this.originalSpeed
    this.hp = this.width + this.height
    this.ttl = 10
    this.damage = 10
    this.prevGridUnit = null
    this.currentGridUnit = null
  }

  die () {
    // this.drop ()
    gameState.incBlood(this.x, this.y, 0, this.width + 2, this.height + 2)
    this.ttl = 0
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
  }

  checkCollisionWithPlayer () {
    const isCollision = collision(this.target, this)
    if (isCollision) {
      this.target.hit(this.damage)
    }
  }

  move() {
    let newX = this.x
    let newY = this.y
    
    let direction = this.direction // up,down,right,left
    const targetX = Math.floor(this.target.x)
    const targetY = Math.floor(this.target.y)

    if (this.x <= targetX) {
      direction = 'right'
      newX += 1 
    }
    if (this.x >= targetX) {
      direction = 'left'
      newX -= 1 
    }
    if (this.y <= targetY) {
      direction = 'down'
      newY += 1
    }
    if (this.y >= targetY) {
      direction = 'up'
      newY -= 1
    }
    this.direction = direction
  
    this.prevGridUnit = this.currentGridUnit ?? findGridUnit(this.x + this.width/2, this.y + this.height/2)
    this.currentGridUnit = findGridUnit(this.x + this.width/2, this.y + this.height/2)
    if (this.currentGridUnit < 0 || this.currentGridUnit > gameState.enemiesGridPositions.length) {
      this.x = newX
      this.y = newY  
      return 
    }
    if (this.currentGridUnit === this.target.currentGridUnitPosition) {
      // Check for collision with player
      this.checkCollisionWithPlayer()
    }

    if (this.currentGridUnit !== this.prevGridUnit) {
      // This will enable collision check with enemies in same gridUnit
      gameState.addToEnemiesGridPositions(this.currentGridUnit, this)
      gameState.removeFromEnemiesGridPositions(this.prevGridUnit, this.id)
    }

    // check collision with other enemies
    // check collision with enemy
    const enemies = gameState.enemiesGridPositions[this.currentGridUnit]
    const newValues = {
      height: this.height,
      width: this.width,
      x: newX,
      y: newY
    }
    for (let i = 0; i <= enemies.length - 1; i++) {
      if (enemies[i].id !== this.id && collision(newValues, enemies[i])) {
        this.color = 'green'
        const collidingEnemyX = enemies[i].x
        const collidingEnemyY = enemies[i].y
        // if dir === right OR left => go up or down
        if (direction === 'left' || direction === 'right') {
          if (newY < collidingEnemyY) {
            newY -= 1
          } else if (newY > collidingEnemyY) {
            newY += 1
          }
        } else {
          if (newX < collidingEnemyX) {
            newX -= 1
          } else  if (newX > collidingEnemyX) {
            newX += 1
          } 
        }
        
      } 
    }

    this.x = newX
    this.y = newY  

  }
}