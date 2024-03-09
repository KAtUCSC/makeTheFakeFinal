class Title extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('titleScene')
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
        this.add.bitmapText(0, 0, 'pixelU', 'WOW A TITLE damn')
    }

    //do constantly
    update() {
        //automatically fed time and delta
    }

    
}