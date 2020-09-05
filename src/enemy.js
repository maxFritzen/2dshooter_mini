
class Enemy extends Obj {
  constructor (x, y, color, width, height, speed, hp, target, id) {
    super(x, y, color, width, height, speed, hp) 
    this.target = target
    this.id = id
    this.direction = ''
    this.originalSpeed = this.width
    this.limit = this.originalSpeed
    this.hp = this.width + this.height
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
          x: this.x,
          y: this.y
          // x: newX,
          // y: newY
        }
        if (enemies[i].id !== this.id && collision(newValues, enemies[i])) {
          const collidingEnemyX = enemies[i].x
          const collidingEnemyY = enemies[i].y
          switch (direction) {
            case 'right': {
              if (newX <= collidingEnemyX) {
                newX -= 1
              }
              break; 
            }
            case 'left': {
              if (newX >= collidingEnemyX) {
                newX += 1
              }
              break;
            }
            case 'up': {
             
              if (newY < collidingEnemyY) {
                newY += 1
              } 
              break;
            }
            case 'down': {
              if (newY > collidingEnemyY) {
                newY -= 1
              } 
              break;
            }
            default: {
              break;
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