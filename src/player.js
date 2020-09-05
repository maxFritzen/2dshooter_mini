
const { keyPressed, degToRad } = kontra
const possibleDirections = ['up', 'right', 'down', 'left']
const getRotation = (direction) => {
  switch (direction) {
    case 'right': {
      return degToRad(0)
    }
    case 'left': {
      return degToRad(180)
    }
    case 'up': {
      return degToRad(270)
    }
    case 'down': {
      return degToRad(90)
    }
    default: {
      break;
    }
  }
}

class Player extends Obj {
  constructor (x, y, color, width, height, speed, hp) {
    super(x, y, color, width, height, speed, hp)
    this.shootingSpeedInterval = null
    this.rotateSpeedInterval = null
    this.direction = possibleDirections[1]
    this.bullets = 20
  }
  rotate(direction) {
    if (this.rotateSpeedInterval) return
      const currentIndex = possibleDirections.indexOf(this.direction)
      let newIndex = currentIndex
      switch (direction) {
        case 'left': {
          newIndex--
          if (newIndex < 0) {
            newIndex = possibleDirections.length - 1
          }
          break
        }
        case 'right': {
          newIndex++
          if (newIndex >= possibleDirections.length) {
            newIndex = 0
          }
          break
        }
        default: break
      }
      const newDirection = possibleDirections[newIndex]
      this.direction = newDirection
      this.rotation = getRotation(newDirection)
      const cos = Math.cos(this.rotation);
      const sin = Math.sin(this.rotation);
      this.dx = cos * 0.5;
      this.dy = sin * 0.5;

      this.rotateSpeedInterval = setTimeout(() => {
        this.rotateSpeedInterval = null
      }, 200)
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
    if (keyPressed('left')) {
      this.rotate('left')      
    } else if (keyPressed('right')) {
      this.rotate('right')
    }
      
    if (keyPressed('up')) {
      this.advance(this.speed);
    } else if (keyPressed('down')) {
      this.advance(-this.speed * 0.7);
    }

    if (keyPressed('space')) {
      this.shoot()
    }
  } 

}