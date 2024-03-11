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
        this.add.bitmapText(game.config.width/2, game.config.height*2/5, 'pixelU', 'Score scene', 64).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height*3/5, 'pixelU', 'Nothing here yet.', 32).setOrigin(0.5)
    }

    //do constantly
    update() {
        //automatically fed time and delta
    }

    
}