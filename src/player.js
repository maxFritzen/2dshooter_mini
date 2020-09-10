
const { keyPressed, degToRad } = kontra
let ammo = 20
class Player extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp) {
    super(x, y, color, damageColor, width, height, speed, hp)
    this.shootingSpeedInterval = null
    this.rotateSpeedInterval = null
    this.pickupInterval = null
    this.bullets = ammo
    this.collisionInterval = null
    this.collisionPickupInterval = null
    this.level = 1
  }

  incLevel () {
    if (this.collisionPickupInterval || this.level >= 5) return
    this.collisionPickupInterval = setTimeout(() => {
      this.collisionPickupInterval = null
    }, 200)
    this.level++
  }

  shoot () {
    if (this.bullets <= 0) {
      setTimeout(() => {
        this.bullets = ammo * this.level / 2
      }, 404)
    }

    if (this.shootingSpeedInterval) return
      if (this.bullets > 0) {
        gameState.incProjectiles(this.x, this.y, this.rotation)
        
        this.bullets -= 1
        this.shootingSpeedInterval = setTimeout(() => {
          this.shootingSpeedInterval = null
        }, 404 / this.level)
      }
  }

  move() {
    if (this.ttl <= 0) return

    if (keyPressed('left')) {
      this.rotation += degToRad(-4)
      const cos = Math.cos(this.rotation)
      const sin = Math.sin(this.rotation)
      this.dx = cos * 0.5
      this.dy = sin * 0.5
    } else if (keyPressed('right')) {
      this.rotation += degToRad(4)
      const cos = Math.cos(this.rotation)
      const sin = Math.sin(this.rotation)
      this.dx = cos * 0.5
      this.dy = sin * 0.5
    }
      
    if (keyPressed('up')) {
      this.advance(this.speed);
    } else if (keyPressed('down')) {
      this.advance(-this.speed * 0.7);
    }

    if (keyPressed('space')) {
      this.shoot()
    }

    this.collisionCheck()
    this.collisionPickup()
  } 

  collisionPickup () {
    
    const pickups = gameState.getPickups()
    pickups.forEach((p) => {
      if (collision(this, p)) {
        p.ttl = 0
        this.incLevel()   
      }
    })
  }
  collisionCheck () {
    const enemies = gameState.getEnemies()
    if (this.collisionInterval) return
    enemies.forEach((enemy) => {
      if (collision(this, enemy)) {
        this.hit(10)
        this.collisionInterval = setTimeout(() => {
          this.collisionInterval = null
          this.context.filter = 'none'
        }, 1000)
      }
    })
  }

  die () {
    this.ttl = 0
    this.color = 'purple'
    stop()
  }
}