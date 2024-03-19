class Tutorial extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('tutorialScene')
    }

    //happens once every time the scene is restarted/added
    init() {
        //can recieve data
    }

    //load assets
    preload() {

    }

    //make things
    create() {
        //can recieve data
        //grey box
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x444444).setOrigin(0)
        //text
        //titles
        this.add.bitmapText(game.config.width*1/4, game.config.height*2/6 - 64, 'pixelU', 'RIDE', 64).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/2, game.config.height*2/6 - 64, 'pixelU', 'vs', 64).setOrigin(.5)
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 - 64, 'pixelU', 'FLY', 64).setOrigin(.5)
        //instruction
        //ride
        this.add.bitmapText(game.config.width*1/4, game.config.height*2/6 + 32*1, 'pixelU', 'Use [A] and [D]', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/4, game.config.height*2/6 + 32*2, 'pixelU', 'to control speed', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/4, game.config.height*2/6 + 32*3.5, 'pixelU', 'Slow down or speed', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/4, game.config.height*2/6 + 32*4.5, 'pixelU', 'up to avoid crashing', 32).setOrigin(.5)
        //fly
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 + 32*1, 'pixelU', 'Use [A] and [D]', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 + 32*2, 'pixelU', 'to tilt the bike', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 + 32*3.5, 'pixelU', 'Use [J] and [K]', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 + 32*4.5, 'pixelU', 'to do stunts', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*3/4, game.config.height*2/6 + 32*6, 'pixelU', 'Do a flip for points!', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/2, game.config.height*5/6 + 32, 'pixelU', 'Press [D] to return', 32).setOrigin(.5)

        //define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('titleScene')
        }
    }

    
}