// @ts-check
import { drawCircle, drawRect } from './common-graphics.js'
import { collision } from './helper-functions.js'
import { canvas, canvasHeight, canvasWidth, findGridUnit, gameState, grid, typeBlood, typeEnemy } from './index.js'

export class Projectile {
  constructor(startX, startY, angle) {
    this.x = startX,
    this.y = startY
    this.width = 5
    this.speed = 10
    this.angle = angle
    this.color = 'green'
    this.ttl = 10
  }

  isAlive() {
    return this.ttl > 0
  }

  move () {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed 

    

    // die if outside of map
    if (this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight) {
      this.ttl = 0
      return
    }

    // Enemy collision
    this.prevGridUnit = this.currentGridUnit ?? findGridUnit(this.x + this.width/2, this.y + this.width/2)
    this.currentGridUnit = findGridUnit(this.x + this.width/2, this.y + this.width/2)
    if (grid[this.currentGridUnit] === undefined) return
    if (this.prevGridUnit !== this.currentGridUnit) {
      if (grid[this.currentGridUnit].type === typeEnemy) {
        
        grid[this.currentGridUnit].enemy.die()
        this.ttl = 0
      }
    }
  }

  update () {
    this.move()
  }

  draw () {
    const { x, y, width } = this
    drawCircle(x, y, width, this.color)
  }

}