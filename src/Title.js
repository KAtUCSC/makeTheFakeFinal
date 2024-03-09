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
        this.add.bitmapText(0, 0, 'pixelU', 'Title text. Placeholder. BROKEN BONEZ', 16)
        this.add.bitmapText(0, 20, 'pixelU', 'press [D] to continue', 16)

        //define keys
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        //testing
        this.add.rectangle(0, 200, 600, 300, 0x00ff00)
        this.add.image(100, 100, 'sSheet', 'bikeWheeled').setScale(4)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(Phaser.Input.Keyboard.JustDown(keyD)){
            this.scene.start('playScene')
        }
    }

    
}