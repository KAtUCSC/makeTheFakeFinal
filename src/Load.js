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
    }

    //make things
    create() {
        //can recieve data
        this.add.bitmapText(4, game.config.height*2/5, 'pixelU', 'This is my load scene.', 32)
        this.titleTimer = this.time.delayedCall(5000, () => {
            this.scene.start('titleScene')
        })
        this.titleTimerText = this.add.bitmapText(4, game.config.height/2, 'pixelU', '0000', 32)
        console.log(this.titleTimerText)
        console.log(this.titleTimer)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        let breakMe = ((5000 - this.titleTimer.elapsed)/100).toString().split(".")[0]
        while(breakMe.length < 4) {
            breakMe = "0" + breakMe
        }
        this.titleTimerText.text = breakMe
    }

    
}