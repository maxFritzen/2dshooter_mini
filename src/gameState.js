// @ts-check
import { createBlood, createFireEffect, createProjectile, createPickup } from './helper-functions.js'
import { createNewPlayer, createEnemy, gameState, canvasWidth, canvasHeight, drawMap, grid, gridCellSize, typeEnemy } from './index.js'
import { drawRect, drawStandardText } from './common-graphics.js';

export class GameState {
  constructor () {
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.fireEffects = [];
    this.pickups = []
    this.players = []
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
      // this.enemiesGridPositions[i] = []
    }
    console.log('this.enemiesGridPositions', this.enemiesGridPositions.length)
  }

  addToEnemiesGridPositions (index, enemy) {
    if (index >= 0 && index < grid.length) {
      grid[index].type = typeEnemy
      grid[index].enemy = enemy
    }
  }

  removeFromEnemiesGridPositions (index, enemyId) {
    if (grid[index] === undefined) console.log('UNEDFINED INDEX')
    if (grid[index] === undefined) return
    if (grid[index].type === typeEnemy && grid[index].enemy.id === enemyId) {
      grid[index].type = ''
      grid[index].enemy = null
      
    }
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
    this.players.forEach((x) => x.update())
    this.getFireEffects().forEach(sprite => sprite.update())
    this.getProjectiles().forEach(sprite => sprite.update())
    this.getEnemies().forEach(sprite => sprite.update())
    this.getBlood().forEach(sprite => sprite.update())
    this.removeEnemies()
    this.removeProjectiles()
    this.removeFireEffects()
    this.removePickups()
  }

  draw = () => {
    if (!this.gameIsRunning) {
      // draw is called once after showStartScreen. 
      // Should be able to fix that but gameIsRunning boolean is easy-fix
      console.log('this game is not running')
      return
    }
    
    drawRect(0, 0, canvasWidth, canvasHeight, 'grey')
    drawMap() // drawMap draws enemies and blood
    // gameState.getBlood().forEach(sprite => sprite.draw())
    this.getPickups().forEach(sprite => sprite.draw())
    //this.getEnemies().forEach(sprite => sprite.draw())
    this.getProjectiles().forEach(sprite => sprite.draw())
    this.getFireEffects().forEach(sprite => sprite.draw())
    this.players.forEach((x) => x.draw())

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
    this.players.push(createNewPlayer(10, 10, 'blue', 'green'))
    this.players.push(createNewPlayer(10, 30, 'purple', 'orange', 24, 12))
    // this.players.push(createNewPlayer(10, 50, 'black', 'orange', 24, 12))
    // this.players.push(createNewPlayer(10, 60, 'yellow', 'orange', 24, 12))
    // this.players.push(createNewPlayer(10, 70, 'red', 'orange', 24, 12))
    // this.players.push(createNewPlayer(10, 80, 'green', 'orange', 24, 12))
    // this.players.push(createNewPlayer(10, 90, 'orange', 'orange', 24, 12))
    for (let i = 0; i < 2; i++) {
      // this.players.push(createNewPlayer(10, 20 * i, 'orange', 'orange'))
    }
    this.players.forEach((x) => {
      x.addKeyListeners()
      // x.setUpControls('ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', ' ')
    })
    this.players[0].setUpControls('ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', ' ')
    
    this.players[1].setUpControls('w', 'd', 's', 'a', 'u')
    // this.setStartEnemiesGridPositions()
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
    this.projectiles = this.projectiles.filter(x => x.isAlive())
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

    // Should probably be closest player or something
    // and should be updated as you go
    const random = Math.floor(Math.random() * this.players.length)
    const target = this.players[random]

    for (let i = 0; i < numberOfEnemies; i++) {
      const x = getX()
      const y = getY()
      // const random = Math.floor(Math.random() * 5) + 3 
      const width = 20
      const height = 50
  
      this.enemies.push(createEnemy(x, y, gridCellSize, gridCellSize, target))
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
    this.fireEffects = this.fireEffects.filter(x => x.isAlive())
  }

  removeEnemies () {
    this.enemies = this.enemies.filter(x => x.isAlive())
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

}

