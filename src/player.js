
const { keyPressed, degToRad } = kontra

class Player extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp) {
    super(x, y, color, damageColor, width, height, speed, hp)
    this.shootingSpeedInterval = null
    this.rotateSpeedInterval = null
    this.bullets = 20
    this.collisionInterval = null
  }

  shoot () {
    if (this.bullets <= 0) {
      setTimeout(() => {
        this.bullets = 20
      }, 1000)
    }
    if (this.shootingSpeedInterval) return
      if (this.bullets > 0) {
        gameState.incProjectiles(this.x, this.y, this.rotation)
        this.bullets -= 1
        this.shootingSpeedInterval = setTimeout(() => {
          this.shootingSpeedInterval = null
        }, 100)
      }
      
  }

  move() {
    if (this.ttl <= 0) return

    if (keyPressed('left')) {
      // this.rotate('left')
      console.log('rotate left')
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
      // this.rotate('right')
    }
      
    if (keyPressed('up')) {
      this.advance(this.speed);
    } else if (keyPressed('down')) {
      this.advance(-this.speed * 0.7);
    }

    if (keyPressed('space')) {
      this.shoot()
    }

    // collision with enemy
    this.collisionCheck()
  } 

  collisionCheck () {
    const enemies = gameState.getEnemies()
    if (this.collisionInterval) return
    enemies.forEach((enemy) => {
      if (collision(this, enemy)) {
        console.log('collisison with enemy')
        this.context.filter = `blur(0.8px)`
        this.hit(10)
        setTimeout(() => this.context.filter = 'none', 200)
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