// @ts-check
import { ctx } from './index.js'
import { Projectile } from './projectile.js'
import { Sprite } from './sprite.js'
export const collision = (objA, objB) => {
  // remember anchor x and y on enemy is 0.5. Not after refactoring. collision should proably change to
  const objAtop = objA.y - objA.height / 2
  const objAbot = objA.y + objA.height / 2
  const objAleft = objA.x - objA.width / 2
  const objAright = objA.x + objA.width / 2

  const objBtop = objB.y - objB.height / 2
  const objBbot = objB.y + objB.height / 2
  const objBleft = objB.x - objB.width / 2
  const objBright = objB.x + objB.width / 2


  const collisionY = objAtop <= objBbot
    && objAbot >= objBtop
  const collisionX = objAleft <= objBright
    && objAright >= objBleft

  return collisionY && collisionX
}


export function createProjectile (x, y, angle) {
  const projectile = new Projectile(x, y, angle)
  return projectile
}

export function createFireEffect (x, y, angle) {
  const width = 15
  const height = 8
  const projectile = new Sprite(x, y, angle, width, height, 'yellow', 5)
  projectile.draw = function() {
    ctx.save()
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);

    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, width, height)
    ctx.restore()
  }
  return projectile
}

export function createBlood (x, y, angle, width = 2, height = 2) {
  const blood = new Sprite(x, y, angle, width, height, 'red')
  return blood
}

export function createPickup (x, y, angle, width = 10, height = 10) {
  const pickup = new Sprite(x, y, angle, width, height, 'purple')
  return pickup
}

export function degToRad (radians) {
  return radians * Math.PI / 180
} 