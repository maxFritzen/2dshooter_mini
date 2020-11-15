// @ts-check

import { drawRect } from "./common-graphics.js";
import { ctx } from "./index.js";
import { Sprite } from "./sprite.js";

export class Obj extends Sprite {
  constructor (x, y, color, damageColor, width, height, speed, hp) {
    super(x, y, 90, width, height, color);
    this.damageColor = damageColor
    this.originalColor = color
    this.anchor = {x: 0.5, y: 0.5}
    this.speed = speed;
    this.hp = hp;
  }

  draw () {
    const { x, y, width, height } = this
    // ctx.save()
    // ctx.translate(x + width / 2, y + height / 2)
    // ctx.rotate(this.angle + (Math.PI / 180)) // 90 is just for starting rotation
    // ctx.fillStyle = this.color;
    // ctx.fillRect(-width / 2, -height / 2, width, height);
    // ctx.restore()

    drawRect(x, y, width, height, this.color)
  }
 
  hit (dmg) {
    console.log('hit')
    this.hp -= dmg
    this.color = this.damageColor
    setTimeout(() => {
      this.color = this.originalColor
    }, 100)
  }
} 