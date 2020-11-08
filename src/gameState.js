// @ts-check
import { createBlood, createFireEffect, createProjectile, createPickup } from './helper-functions.js'
import { createNewPlayer, createEnemy, gameState, canvasWidth, canvasHeight, drawMap, grid } from './index.js'
import { drawRect, drawStandardText } from './common-graphics.js';

export class GameState {
  constructor () {
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.pickups = []
    this.player = null
    this.blood = []
    this.gameIsRunning = true
    this.hasStartedGame = false
    this.loop = null
    this.timer = null
    this.keyPress = ''
    this.enemiesGridPositions = [] // array of array
  }

  setStartEnemiesGridPositions () {
    console.log('grid:', grid.length)
    this.enemiesGridPositions = new Array(grid.length)
    const length = this.enemiesGridPositions.length
    for (let i = 0; i <= length -1; i++) {
      // this.enemiesGridPositions.fill([]) doesnt work because it seems to set every [] as same reference or something, interesting
      this.enemiesGridPositions[i] = []
    }
    console.log('this.enemiesGridPositions', this.enemiesGridPositions.length)
  }

  addToEnemiesGridPositions (index, enemy) {
    if (index > 0 && index < this.enemiesGridPositions.length) {
      this.enemiesGridPositions[index].push(enemy)
    }
  }

  removeFromEnemiesGridPositions (index, enemyId) {
    if (this.enemiesGridPositions[index] === undefined) console.log('UNEDFINED INDEX')
    if (this.enemiesGridPositions[index] === undefined) return
    this.enemiesGridPositions[index] = this.enemiesGridPositions[index].filter((enemy) => enemy.id !== enemyId)
  }

  setTimer () {
    if (this.timer) {
      this.timer = clearInterval(this.timer)
    }
    const originalTime = 5
    let time = originalTime
    this.timer = setInterval(() => {
      time -= 1
      if (time <= 0) {
        time = originalTime
        // this.incLevel()
        // this.incEnemies()
      }
    }, 1000)
  }

  getTimer () {
    return this.timer
  }

  update = () => {
    gameState.getPlayer().update();
    gameState.getFireEffects().forEach(sprite => sprite.update())
    gameState.getProjectiles().forEach(sprite => sprite.update())
    gameState.getEnemies().forEach(sprite => sprite.update())
    gameState.getBlood().forEach(sprite => sprite.update())
    // gameState.removeEnemies()
    gameState.removeProjectiles()
    gameState.removeFireEffects()
    gameState.removePickups()
  }

  draw = () => {
    if (!this.gameIsRunning) {
      // draw is called once after showStartScreen. 
      // Should be able to fix that but gameIsRunning boolean is easy-fix
      console.log('this game is not running')
      return
    }
    
    drawRect(0, 0, canvasWidth, canvasHeight, 'grey')
    drawMap()
    gameState.getBlood().forEach(sprite => sprite.draw())
    gameState.getPickups().forEach(sprite => sprite.draw())
    gameState.getEnemies().forEach(sprite => sprite.draw())
    gameState.getProjectiles().forEach(sprite => sprite.draw())
    gameState.getFireEffects().forEach(sprite => sprite.draw())
    gameState.getPlayer().draw();

    drawStandardText('WAVE: ' + gameState.level)
    
  }

  keypress = (e) => {
    if (e.key === 'y') {
      this.startGame()
      document.removeEventListener('keypress', this.keypress)
    }
  }

  drawStartScreen = (firstRun) => {
    drawRect(0, 0, canvasWidth, canvasHeight, 'grey')
    drawMap()
    if (firstRun) {
      drawStandardText('Start game? \n Press y')
    } else {
      drawStandardText(`You made it to wave ${gameState.getLevel()}! \nPlay again?  Press y`)
    }
    document.addEventListener('keypress', this.keypress)
  }

  startGame = () => {
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.blood = []
    this.player = createNewPlayer()
    this.player.addKeyListeners()
    this.player.setUpControls('ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', ' ')
    this.setStartEnemiesGridPositions()
    this.gameIsRunning = true
    this.incEnemies()
    if (this.loop) {
      window.clearInterval(this.loop)
    }
    this.setTimer()

    this.loop = setInterval(() => {
      this.update()
      this.draw()
    }, 30)
  }

  stopGame () {
    this.gameIsRunning = false

    clearInterval(this.timer)
    clearInterval(this.loop)
    this.drawStartScreen()
  }

  incProjectiles (x, y, angle) {
    const randAngle = angle + (Math.random() / 30 - Math.random() / 30)
    const newProjectile = createProjectile(x, y, randAngle)
    const newFireEffect = createFireEffect(x, y, angle) 
    this.projectiles.push(newProjectile)
    this.fireEffects.push(newFireEffect)
  }

  incPickup (x, y) {
    this.pickups.push(createPickup(x, y))
  }

  getPickups () {
    return this.pickups
  }

  removePickups () {
    // this.pickups = this.pickups.filter((s) => s.isAlive())
  }
  

  removeProjectiles () {
    // this.projectiles = this.projectiles.filter(sprite => sprite.isAlive())
  }

  incEnemies () {

    const numberOfEnemies = 100
    // const numberOfEnemies = 404 / 100 * this.level
    const directions = ['top', 'right', 'bot', 'left']
    const direction = directions[Math.floor(Math.random() * 4)]
    const getX = () => {
      let x
      if (direction === 'top' || direction === 'bot') {
        x = Math.random() * canvasWidth
      } else if (direction === 'left') {
        x = Math.random() * -10
      } else if (direction === 'right') {
        x = canvasWidth - (Math.random() * 10)
      }
      return x
    }

    const getY = () => {
      let y
      if (direction === 'left' || direction === 'right') {
        y = Math.random() * canvasHeight
      } else if (direction === 'top') {
        y = Math.random() * -10
      } else if (direction === 'bot') {
        y = canvasHeight - (Math.random() * 10)
      }
      return y
    }


    const target = this.getPlayer()

    for (let i = 0; i < numberOfEnemies; i++) {
      const x = getX()
      const y = getY()
      // const random = Math.floor(Math.random() * 5) + 3 
      const width = 20
      const height = 50
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

