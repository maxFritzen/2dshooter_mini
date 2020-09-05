
kontra.init();
kontra.initKeys();

const newPlayer = new Player(
  150,
  250,
  'blue',
  3,
  5,
  2,
  10
)

const createEnemy = (x, y, width, height) => new Enemy(
  x,
  y,
  'white',
  width,
  height,
  Math.floor(Math.random() * 10) + 5,
  10,
  newPlayer,
  Math.random()
)

// function createProjectile (x, y, angle) {
//   const projectile = kontra.Sprite({
//     id: x + y + angle, 
//     x: x,
//     y: y,
//     width: 3,
//     height: 1,
//     rotation: angle,
//     dx: Math.cos(angle) * 2.5,
//     dy: Math.sin(angle) * 2.5,
//     color: 'green',
//     ttl: 100,
//     update () {
      
//       for (const enemy of gameState.getEnemies()) {
//         if (collision(this, enemy)) {
//             // collision detected!
//             gameState.incBlood(this.x, this.y, angle)
//             this.height = 5
//             this.width = 8
//             enemy.hit(5);
//             this.ttl = 0;
//             break
//         }
//       }

//       this.advance()    
//     }
//   })
//   return projectile
// }

// function createFireEffect (x, y, angle) {
//   const projectile = Sprite({
//     id: x + y + angle, 
//     x: x,
//     y: y,
//     width: 2,
//     height: 3,
//     rotation: angle,
//     color: 'yellow',
//     ttl: 5,
//     anchor: { x: -0.3, y: 0.5 }
//   })
//   return projectile
// }

// function createBlood (x, y, angle) {
//   const blood = Sprite({
//     id: x + y + angle, 
//     x: x,
//     y: y,
//     width: 2,
//     height: 2,
//     rotation: angle,
//     color: 'red',
//     ttl: 300
//   })
//   return blood
// }

// class GameState {
//   constructor () {
//     this.level = 0;
//     this.enemies = [];
//     this.projectiles = [];
//     this.fireEffects = [];
//     this.player = newPlayer
//     this.blood = []
//   }

//   incProjectiles (x, y, angle) {
//     const newProjectile = createProjectile(x, y, angle)
//     const newFireEffect = createFireEffect(x, y, angle)
//     this.projectiles.push(newProjectile)
//     this.fireEffects.push(newFireEffect)
//   }
  

//   removeProjectiles () {
//     this.projectiles = this.projectiles.filter(sprite => sprite.isAlive())
//   }

//   incEnemies () {
//     const stages = [ 100, 200, 302, 403 ]
//     const numberOfEnemies = stages[this.level]
//     this.enemies.push(createEnemy(
//       20, 50, 15, 15
//     ))

//     for (let i = 0; i < numberOfEnemies; i++) {
//       const x = 20
//       const y = Math.floor(Math.random() * 400)
//       const random = Math.floor(Math.random() * 5) + 3 
//       const width = random
//       const height = random + 1
//       this.enemies.push(createEnemy(x, y, width, height))
//     }
    
//   }

//   incBlood (x, y, angle) {
//     const newX = x +  Math.floor(Math.random() * 3) -1
//     const newY = y +  Math.floor(Math.random() * 3) -1
//     this.blood.push(createBlood(newX, newY, angle))
//   }

//   getBlood () {
//     return this.blood
//   }

//   removeFireEffects () {
//     this.fireEffects = this.fireEffects.filter(sprite => sprite.isAlive())
//   }

//   removeEnemies () {
//     this.enemies = this.enemies.filter(sprite => sprite.isAlive())
//   }

//   getLevel () {
//     return this.level
//   }

//   incLevel () {
//     this.level++
//   }

//   getEnemies () {
//     return this.enemies
//   }

//   getProjectiles () {
//     return this.projectiles
//   }

//   getFireEffects () {
//     return this.fireEffects
//   }

//   getPlayer () {
//     return this.player
//   }

// }
const gameState = new GameState()
gameState.incEnemies()

let loop = kontra.GameLoop({
  update: function() {
    gameState.getPlayer().update();
    gameState.getBlood().map(sprite => sprite.update())
    gameState.getEnemies().map(sprite => sprite.update())
    gameState.getProjectiles().map(sprite => sprite.update())
    gameState.getFireEffects().map(sprite => sprite.update())
    gameState.removeEnemies()
    gameState.removeProjectiles()
    gameState.removeFireEffects()
    if (gameState.getEnemies().length <= 0) {
      gameState.incLevel()
      gameState.incEnemies()
    }

  },
  render: function() {
    gameState.getBlood().map(sprite => sprite.render())
    gameState.getPlayer().render();
    gameState.getEnemies().map(sprite => sprite.render())
    gameState.getProjectiles().map(sprite => sprite.render())
    gameState.getFireEffects().map(sprite => sprite.render())
  }
});

loop.start()