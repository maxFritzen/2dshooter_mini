const { Sprite } = kontra
const collision = (objA, objB) => {
  return objA.x < objB.x + objB.width &&
    objA.x + objA.width > objB.x &&
    objA.y < objB.y + objB.height &&
    objA.y + objA.height > objB.y
}


function createProjectile (x, y, angle) {
  const projectile = Sprite({
    id: x + y + angle, 
    x: x,
    y: y,
    width: 3,
    height: 1,
    rotation: angle,
    dx: Math.cos(angle) * 2.5,
    dy: Math.sin(angle) * 2.5,
    color: 'green',
    ttl: 100,
    update () {
      
      for (const enemy of gameState.getEnemies()) {
        if (collision(this, enemy)) {
            // collision detected!
            gameState.incBlood(this.x, this.y, angle)
            this.height = 5
            this.width = 8
            enemy.hit(5);
            this.ttl = 0;
            break
        }
      }

      this.advance()    
    }
  })
  return projectile
}

function createFireEffect (x, y, angle) {
  const projectile = Sprite({
    id: x + y + angle, 
    x: x,
    y: y,
    width: 2,
    height: 3,
    rotation: angle,
    color: 'yellow',
    ttl: 5,
    anchor: { x: -0.3, y: 0.5 }
  })
  return projectile
}

function createBlood (x, y, angle) {
  const blood = Sprite({
    id: x + y + angle, 
    x: x,
    y: y,
    width: 2,
    height: 2,
    rotation: angle,
    color: 'red',
    ttl: 300
  })
  return blood
}