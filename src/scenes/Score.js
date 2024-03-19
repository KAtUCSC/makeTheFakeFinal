class Score extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('scoreScene')
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
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0x444444).setOrigin(0)
        this.add.image(game.config.width*2/3 + 20, game.config.height*1/6, 'sSheet', 'bikeWheeled').setOrigin(.5).setScale(4).setAngle(-20)

        //text
        //title
        this.add.bitmapText(game.config.width/2 - 40, game.config.height*1/6, 'pixelU', 'SCORE', 64).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*1/2, 'pixelU', game.playerStats.score, 64).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height*5/6, 'pixelU', 'Press [A] to view credits.', 32).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height*5/6 + 32, 'pixelU', 'Press [D] to go to title.', 32).setOrigin(0.5)

        //define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('titleScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start('creditsScene')
        }
    }

    
}