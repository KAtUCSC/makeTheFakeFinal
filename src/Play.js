class Play extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('playScene')
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
        //tilemap setup
        const map = this.add.tilemap('tilemapJSON1')
        //ground is the tileset's name in tiled
        const tileset = map.addTilesetImage('ground', 'assetImage')
        //foreground is the name of the layer in tiled
        const groundLayer = map.createLayer('foreground', 'ground', 0, 0).setScale(4)

        //create bike and player
        
        //set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
        //this.cameras.main.startFollow()
    }

    //do constantly
    update() {
        //automatically fed time and delta
    }

    
}