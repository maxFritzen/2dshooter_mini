class GameState {
  constructor () {
    this.level = 0;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.player = newPlayer
    this.blood = []
  }

  incProjectiles (x, y, angle) {
    const newProjectile = createProjectile(x, y, angle)
    const newFireEffect = createFireEffect(x, y, angle)
    this.projectiles.push(newProjectile)
    this.fireEffects.push(newFireEffect)
  }
  

  removeProjectiles () {
    this.projectiles = this.projectiles.filter(sprite => sprite.isAlive())
  }

  incEnemies () {
    const stages = [ 100, 200, 302, 403 ]
    const numberOfEnemies = stages[this.level]
    this.enemies.push(createEnemy(
      20, 50, 15, 15
    ))

    for (let i = 0; i < numberOfEnemies; i++) {
      const x = 20
      const y = Math.floor(Math.random() * 400)
      const random = Math.floor(Math.random() * 5) + 3 
      const width = random
      const height = random + 1
      this.enemies.push(createEnemy(x, y, width, height))
    }
    
  }

  incBlood (x, y, angle) {
    const newX = x +  Math.floor(Math.random() * 3) -1
    const newY = y +  Math.floor(Math.random() * 3) -1
    this.blood.push(createBlood(newX, newY, angle))
  }

  getBlood () {
    return this.blood
  }

  removeFireEffects () {
    this.fireEffects = this.fireEffects.filter(sprite => sprite.isAlive())
  }

  removeEnemies () {
    this.enemies = this.enemies.filter(sprite => sprite.isAlive())
  }

  getLevel () {
    return this.level
  }

  incLevel () {
    this.level++
  }

  getEnemies () {
    return this.enemies
  }

  getProjectiles () {
    return this.projectiles
  }

  getFireEffects () {
    return this.fireEffects
  }

  getPlayer () {
    return this.player
  }

}
