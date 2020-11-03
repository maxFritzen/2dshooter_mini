// @ts-check
import { ctx } from './index.js'
import { Projectile } from './projectile.js'
import { Sprite } from './sprite.js'
export const collision = (objA, objB) => {
  const objAtop = objA.y - objA.height
  const objAbot = objA.y + objA.height
  const objAleft = objA.x - objA.width
  const objAright = objA.x + objA.width

  const objBtop = objB.y - objB.height
  const objBbot = objB.y + objB.height
  const objBleft = objB.x - objB.width
  const objBright = objB.x + objB.width


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
  const width = 2
  const height = 16
  const projectile = new Sprite(x, y, angle, width, height, 'yellow', 5)
  projectile.draw = function() {
    ctx.save()
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.translate(-x, -y);

    ctx.fillStyle = 'red';
    ctx.fillRect(x + 2, y - height/2, width, height)
    // ctx.fillStyle = 'black';
    // ctx.fillRect(x, y, 5, 5)
    // ctx.fillStyle = 'green';
    // ctx.fillRect(x, y, width, 1)
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