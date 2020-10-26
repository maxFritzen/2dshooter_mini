// @ts-check
import { drawCircle } from './common-graphics.js'

export class Projectile {
  constructor(startX, startY, angle) {
    this.x = startX,
    this.y = startY
    this.w = 10
    this.speed = 1
    this.angle = angle
    this.color = 'green'

  }

  move () {
    this.x += Math.cos(this.angle) * this.speed
    this.y += Math.sin(this.angle) * this.speed
  }
  update () {
    this.move()
  }
  draw () {
    const { x, y , w } = this
    drawCircle(x, y, w, this.color)
  }

}