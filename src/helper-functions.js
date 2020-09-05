const { Sprite } = kontra
const collision = (objA, objB) => {
  // remember anchor x and y on enemy is 0.5

  // add check for height + width on both objects.
  const top = objB.y - objB.height / 2
  const bot = objB.y + objB.height / 2
  const left = objB.x - objB.width / 2
  const right = objB.x + objB.width / 2

  const objAtop = objA.y - objA.height / 2
  const objAbot = objA.y + objA.height / 2
  const objAleft = objA.x - objA.width / 2
  const objAright = objA.x + objA.width / 2
  console.log('b: ', { top, bot, left, right })
  console.log('a: ', { objAtop, objAbot, objAleft, objAright })

  const collisionY = objAtop <= bot
    && objAbot >= top
  const collisionX = objAleft <= right
  && objAright >= left

  return collisionY && collisionX
  // const collisionY = objA.y > top
  //   && objA.y < bot
  // const collisionX = objA.x > left
  // && objA.x < right

  // return collisionY && collisionX
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
    anchor: { x: 0.5, y: 0.5},
    update () {
      
      for (const enemy of gameState.getEnemies()) {
        if (collision(this, enemy)) {
            // collision detected!
            gameState.incBlood(this.x, this.y, angle)
            this.height = 5
            this.width = 8
            // enemy.hit(5);
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