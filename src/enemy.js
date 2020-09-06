
class Enemy extends Obj {
  constructor (x, y, color, damageColor, width, height, speed, hp, target, id) {
    super(x, y, color, damageColor, width, height, speed, hp) 
    this.target = target
    this.id = id
    this.direction = ''
    this.originalSpeed = this.width
    this.limit = this.originalSpeed
    this.hp = this.width + this.height
  }

  die () {
    this.ttl = 0
  }

  move() {
    let newX = this.x
    let newY = this.y
    
    if (this.limit < 0) {
      let direction = this.direction // up,down,right,left
      const targetX = Math.floor(this.target.x)
      const targetY = Math.floor(this.target.y)

      if (this.x <= targetX) {
        direction = 'right'
        newX += 1 
      }
      if (this.x >= targetX) {
        direction = 'left'
        newX -= 1 
      }
      if (this.y <= targetY) {
        direction = 'down'
        newY += 1
      }
      if (this.y >= targetY) {
        direction = 'up'
        newY -= 1
      }
      this.direction = direction

      // check collision
      const enemies = gameState.getEnemies()
      for (let i = 0; i <= enemies.length - 1; i++) {
        const newValues = {
          height: this.height,
          width: this.width,
          x: newX,
          y: newY
        }

        if (enemies[i].id !== this.id && collision(newValues, enemies[i])) {
          const collidingEnemyX = enemies[i].x
          const collidingEnemyY = enemies[i].y
          // if dir === right OR left => go up or down
          if (direction === 'left' && direction === 'right') {
            if (newY < collidingEnemyY) {
              newY -= 1
            } else if (newY > collidingEnemyY) {
              newY += 1
            }
          } else {
            if (newX < collidingEnemyX) {
              newX -= 1
            } else  if (newX > collidingEnemyX) {
              newX += 1
            } 
          }
          
        } 
       
      }

      this.x = newX
      this.y = newY
      this.rotation = Math.atan2(this.dy,this.dx);
      
      this.limit = this.originalSpeed + this.hp
    } 
    

    this.limit--
    
    
    
  }
}