class Credits extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('creditsScene')
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
        this.add.image(game.config.width*0.78, game.config.height*1/6, 'sSheet', 'bikeWheeled').setOrigin(.5).setScale(4).setAngle(-20)

        //text
        //title
        this.add.bitmapText(game.config.width*0.43, game.config.height*1/6, 'pixelU', 'CREDITS', 64).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6, 'pixelU', 'Code, art: Kira Way', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6 + 32, 'pixelU', 'Teaching: Nathan Altice', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6 + 64, 'pixelU', 'Game concept: Regular Show', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6 + 128, 'pixelU', 'Special thanks to my parents,', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height*2/6 + 160, 'pixelU', 'teachers, and Ellie for support', 32).setOrigin(.5)
        this.add.bitmapText(game.config.width*1/2, game.config.height*5/6 + 32, 'pixelU', 'Press [D] to go to title', 32).setOrigin(.5)

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