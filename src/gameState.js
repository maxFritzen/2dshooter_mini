

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
    this.timer = null
    this.context = document.getElementsByClassName('gameCanvas')[0].getContext('2d')
  }

  setHasStartedGame () {
    this.hasStartedGame = true
    this.timer = this.setTimer()
  }

  setGameIsRunning (bool) {
    this.gameIsRunning = bool
    this.timer = this.setTimer()
  }

  setTimer () {
    console.log('setTimer')
    if (this.timer) {
      this.timer = clearInterval(this.timer)
    }
    const originalTime = 5
    let time = originalTime
    this.timer = setInterval(() => {
      time -= 1
      if (time <= 0) {
        time = originalTime
        this.level += 1
        this.incEnemies()
      }
      console.log(time)
    }, 1000)
  }

  getTimer () {
    return this.timer
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
        gameState.getBlood().map(sprite => sprite.render())
        gameState.getEnemies().map(sprite => sprite.render())
        gameState.getProjectiles().map(sprite => sprite.render())
        gameState.getFireEffects().map(sprite => sprite.render())
        gameState.getPlayer().render();
        if (!gameState.gameIsRunning) {
          getText(`You made it to wave ${gameState.getLevel()}! \nPlay again?  Press y`).render()
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
    const directions = ['top', 'right', 'bot', 'left']
    const direction = directions[Math.floor(Math.random() * 4)]
    console.log('incenemies direction:  ', direction)
    console.log('this:', this)
    const getX = () => {
      let x
      if (direction === 'top' || direction === 'bot') {
        x = Math.random() * this.context.canvas.width
      } else if (direction === 'left') {
        x = Math.random() * -10
      } else if (direction === 'right') {
        x = this.context.canvas.width - (Math.random() * 10)
      }
      return x
    }

    const getY = () => {
      let y
      if (direction === 'left' || direction === 'right') {
        y = Math.random() * this.context.canvas.height
      } else if (direction === 'top') {
        y = Math.random() * -10
      } else if (direction === 'bot') {
        y = this.context.canvas.height - (Math.random() * 10)
      }
      return y
    }


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
      const x = getX()
      const y = getY()
      const random = Math.floor(Math.random() * 5) + 3 
      const width = random
      const height = random + 1
      this.enemies.push(createEnemy(x, y, width, height, target))
    }
    
  }

  incBlood (x, y, angle, width, height) {
    const newX = x +  Math.floor(Math.random() * 3) -1
    const newY = y +  Math.floor(Math.random() * 3) -1
    // this.blood.push(createBlood(newX, newY, angle))
    this.blood.push(createBlood(x, y, angle, width, height))
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

