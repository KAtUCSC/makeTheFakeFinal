class Load extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('loadScene')
    }

    //happens once every time the scene is restarted/added
    init() {
        //can recieve data
    }

    //load assets
    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        // thanks prof :)
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, game.config.height/2, game.config.width * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            console.log('done loading')
            //loadingBar.destroy()
        })

        this.load.path = './assets/'
        //font
        this.load.bitmapFont('pixelU', 'fonts/pixelU.png', 'fonts/pixelU.xml')
        //atlas
        this.load.atlas('sSheet', 'assets.png', 'sprites.json')
        //tilemap
        this.load.image('assetImage', 'assets.png')
        this.load.tilemapTiledJSON('tilemapJSON1', 'tiled/terrain1.json')
    }

    //make things
    create() {
        //can recieve data
        //loading scene text
        this.add.bitmapText(4, game.config.height*2/5, 'pixelU', 'Loading', 32)
        //start the title scene in a bit
        this.titleTimer = this.time.delayedCall(0, () => {
            this.scene.start('titleScene')
        })
        //countdown timer text for the title scene start
        this.titleTimerText = this.add.bitmapText(4, game.config.height/2, 'pixelU', '0000', 32)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        //system for updating the countdown timer text below the loading bar
        let timeLeft = ((0 - this.titleTimer.elapsed)/100).toString().split(".")[0]
        while(timeLeft.length < 4) {
            timeLeft = "0" + timeLeft
        }
        this.titleTimerText.text = timeLeft
    }

    
}