class Title extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('titleScene')
    }

    //happens once every time the scene is restarted/added
    init() {
        //can recieve data
        game.playerStats = {
            score: 0,
            bones: 5,
            helmets: 3
        }
    }

    //load assets
    preload() {

    }

    //make things
    create() {
        //can recieve data
        //graphics
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x444444).setOrigin(0)
        this.add.image(game.config.width*2/3, game.config.height*3/4, 'sSheet', 'bikeWheeled').setScale(8).setAngle(-20)

        //text
        //title
        this.add.bitmapText(game.config.width/2, game.config.height*2/6 - 64, 'pixelU', 'BROKEN', 64).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6, 'pixelU', 'BONEZ', 64).setOrigin(.5)
        //menu controls
        this.add.bitmapText(game.config.width*1/3, game.config.height*6/12, 'pixelU', 'press [D] to RIDE', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/3, game.config.height*6/12 + 32, 'pixelU', 'press [A] for tutorial', 32).setOrigin(.5)

        //define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('playScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start('tutorialScene')
        }
    }

    
}