// @ts-check
import { drawCircle, drawRect } from './common-graphics.js'
import { ctx } from './index.js'

export class Sprite {
  constructor(startX, startY, angle, width = 2, height = 2, color = 'green', ttl) {
    this.id = Math.random() // This should probably be changed 
    this.x = startX,
    this.y = startY
    this.width = width
    this.height = height
    this.speed = 1
    this.angle = angle
    this.color = color
    this.ttl = ttl
  }

  update () {
    this.ttl--
  }

  isAlive () {
    return this.ttl > 0
  }
  
  draw () {
    const { x, y, width, height } = this
    const newX = x + Math.cos(this.angle)
    const newY = y + Math.sin(this.angle)

    drawRect(newX, newY, width, height, this.color)
    // drawCircle(x, y, width, this.color)
  }

}