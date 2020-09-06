

class GameState {
  constructor () {
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.player = null
    this.blood = []
    this.gameIsRunning = true
    this.hasStartedGame = false
    this.loop = null
    this.text = getText()
  }

  setHasStartedGame () {
    this.hasStartedGame = true
  }

  setGameIsRunning (bool) {
    this.gameIsRunning = bool
  }

  startGame () {
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.blood = []
    this.player = createNewPlayer()
    this.incEnemies()
    if (this.loop) {
      this.loop.stop()
    }
    
  
    

    this.loop = kontra.GameLoop({
      update: function() {
        if (!gameState.hasStartedGame) {
          if (kontra.keyPressed('y')) {
            console.log('pressed y')
            gameState.setHasStartedGame()
          }
          return
        }

        gameState.getPlayer().update();
        gameState.getEnemies().map(sprite => sprite.update())
        gameState.getBlood().map(sprite => sprite.update())
        gameState.getProjectiles().map(sprite => sprite.update())
        gameState.getFireEffects().map(sprite => sprite.update())
        gameState.removeEnemies()
        gameState.removeProjectiles()
        gameState.removeFireEffects()
        if (gameState.getEnemies().length <= 0) {
          gameState.incLevel()
          gameState.incEnemies()
        }
        if (!gameState.gameIsRunning) {
          if (kontra.keyPressed('y')) {
            console.log('dead press y')
            gameState.setGameIsRunning(true)
            gameState.startGame()
          }
        }

    
      },
      render: function() {
        if (!gameState.hasStartedGame) {
          getText('Start game? \n Press y').render()
          return
        }
        gameState.getEnemies().map(sprite => sprite.render())
        gameState.getProjectiles().map(sprite => sprite.render())
        gameState.getBlood().map(sprite => sprite.render())
        gameState.getFireEffects().map(sprite => sprite.render())
        gameState.getPlayer().render();
        if (!gameState.gameIsRunning) {
          getText(`You made it to level ${gameState.getLevel()}! \nPlay again?  Press y`).render()
        }
      }
    })

    this.loop.start()
  }

  stopGame () {
    this.gameIsRunning = false
    console.log('stopgame')
    
  }

  incProjectiles (x, y, angle) {
    const randAngle = angle + (Math.random() / 30 - Math.random() / 30)
    console.log('angle: ', angle)
    console.log('Randangle: ', randAngle)
    const newProjectile = createProjectile(x, y, randAngle)
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
    const target = this.getPlayer()
    // this.enemies.push(createEnemy(
    //   20, 50, 15, 15, target
    // ))
    // this.enemies.push(createEnemy(
    //   20, 55, 15, 15, target
    // ))
    // this.enemies.push(createEnemy(
    //   20, 60, 15, 15, target
    // ))

    for (let i = 0; i < numberOfEnemies; i++) {
      const x = Math.floor(Math.random() * 75) - 65
      const y = Math.floor(Math.random() * 400)
      const random = Math.floor(Math.random() * 5) + 3 
      const width = random
      const height = random + 1
      this.enemies.push(createEnemy(x, y, width, height, target))
    }
    
  }

  incBlood (x, y, angle) {
    const newX = x +  Math.floor(Math.random() * 3) -1
    const newY = y +  Math.floor(Math.random() * 3) -1
    // this.blood.push(createBlood(newX, newY, angle))
    this.blood.push(createBlood(x, y, angle))
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

