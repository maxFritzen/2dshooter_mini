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
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)
    ctx.rotate(this.angle + (90 * Math.PI / 180))
    ctx.fillStyle = this.color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.restore()
  }

}