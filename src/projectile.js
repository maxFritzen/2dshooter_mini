// @ts-check
import { drawCircle } from './common-graphics.js'

export class Projectile {
  constructor(startX, startY, angle, canvas) {
    this.x = startX,
    this.y = startY
    this.w = 10
    this.speed = 1
    this.angle = angle
    this.color = 'green'
    this.canvas = canvas

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
    drawCircle(this.canvas.getContext('2d'),x, y, w, this.color)
  }

}