// @ts-check
import { collision, degToRad } from './helper-functions.js'
import { canvasHeight, canvasWidth, ctx, findGridUnit, gameState, grid } from './index.js'
import { Obj } from './object.js'

let ammo = 20
export class Player extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp) {
    super(x, y, color, damageColor, width, height, speed, hp)
    this.shootingSpeedInterval = null
    this.animationShootingSpeedInterval = 0
    this.rotateSpeedInterval = null
    this.pickupInterval = null
    this.bullets = ammo
    this.collisionInterval = null
    this.collisionPickupInterval = null
    this.level = 1

    this.drive = false
    this.reverse = false
    this.steerLeft = false
    this.steerRight = false
    this.brake = false
    this.isShooting = false

    this.controlKeyGas = undefined
    this.controlKeyRight = undefined
    this.controlKeyReverse = undefined
    this.controlKeyLeft = undefined
    this.controlKeyShoot = undefined

    this.currentGridUnitPosition = 0
  }

  stayInsideMap () {
    if (this.x <= 0) this.x = 1;
    if (this.x + this.width >= canvasWidth) {
      this.x = canvasWidth - this.width
    }
    if (this.y <= 0) this.y = 1;
    if (this.y + (this.height / 2) >= canvasHeight) {
      this.y = canvasHeight - this.height
    }
  }

  incLevel () {
    if (this.collisionPickupInterval) return
    this.collisionPickupInterval = setTimeout(() => {
      this.collisionPickupInterval = null
    }, 200)
    this.level++
  }

  shoot = () => {
    if (this.bullets <= 0) {
      setTimeout(() => {
        this.bullets = ammo * this.level / 2
      }, 500)
    }

    if (this.shootingSpeedInterval) return
      if (this.bullets > 0) {
        const centerX = this.x + this.width / 2
        const centerY = this.y + this.height / 2
        this.animationShootingSpeedInterval = 1
        gameState.incProjectiles(centerX, centerY, this.angle)
        this.bullets -= 1
        this.shootingSpeedInterval = setTimeout(() => {
          this.shootingSpeedInterval = null
        }, 100)
      }
  }

  draw () {
    const { x, y, width, height } = this
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)
    ctx.rotate(this.angle + (90 * Math.PI / 180)) // 90 is just for starting rotation
    ctx.fillStyle = this.color;
    ctx.fillRect(-width / 2, -height / 2, width, height);
    ctx.restore()
  }

  addKeyListeners () {
    document.addEventListener('keydown', this.keyDown)
    document.addEventListener('keyup', this.keyUp)
  }

  setUpControls (gas, right, reverse, left, shoot) {
    this.controlKeyGas = gas
    this.controlKeyRight = right
    this.controlKeyReverse = reverse
    this.controlKeyLeft = left
    this.controlKeyShoot = shoot
  }
  keySet (e, setTo) {
    if (e.key === this.controlKeyGas) {
      this.drive = setTo
    }
    if (e.key === this.controlKeyRight) {
      this.steerRight = setTo
    }
    if (e.key === this.controlKeyReverse) {
      this.reverse = setTo
    }
    if (e.key === this.controlKeyLeft) {
      this.steerLeft = setTo
    }
    if (e.key === this.controlKeyShoot) {
      this.isShooting = setTo
    }
  }

  keyDown = (e) => {
    this.keySet(e, true)
  }

  keyUp = (e) => {
    this.keySet(e, false)
  }

  update () {
    this.move()
  }

  move() {
    if (this.ttl <= 0) return
    if (this.drive) {
      this.speed = 5
    } else {
      this.speed = 0
    }

    if (this.isShooting) {
      this.shoot()
    }

    if (this.reverse) {
      this.speed = -0.5
    }

    if (this.steerLeft) {
        this.angle -= 0.1
    }

    if (this.steerRight) {
      this.angle += 0.1
    }

    this.stayInsideMap()
    // this.collisionCheckPickup()

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // which grid unit am I in?
    const currentGridUnit = findGridUnit(this.x + this.width/2, this.y + this.height/2)
    if (grid[currentGridUnit]) {
      this.currentGridUnitPosition = currentGridUnit
    }
    
  } 

  collisionCheckPickup () {
    // Either level up or kill all enemies.
    const pickups = gameState.getPickups()
    pickups.forEach((p) => {
      if (collision(this, p)) {
        p.ttl = 0
        if (this.level < 5) {
          this.incLevel()
        } else {
          gameState.getEnemies().forEach((x) => {
            x.die()
          })

        }
      }
    })
  }

  die () {
    this.ttl = 0
    gameState.incBlood(this.x, this.y, 0, 20, 20)
    gameState.stopGame()
  }
}