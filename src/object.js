// @ts-check

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
 
  hit (dmg) {
    this.hp -= dmg
    this.color = this.damageColor
    setTimeout(() => {
      this.color = this.originalColor
    }, 100)
  }
} 