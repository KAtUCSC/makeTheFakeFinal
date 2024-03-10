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
        groundLayer.setCollisionByExclusion([-1, 0])

        //sky background
        let sky = this.add.rectangle(0, 0, map.widthInPixels*4, map.heightInPixels*4, 0x00ff00).setOrigin(0).setDepth(-2)
        console.log(sky)

        //create bike and player
        this.bike = this.matter.add.sprite(0, 0, 'sSheet', 'bike').setScale(4)

        //colliders
        this.matter.world.convertTilemapLayer(groundLayer)
        
        
        //set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels*4, map.heightInPixels*4)
        this.cameras.main.startFollow(this.bike, true, 0.25, 0.25, 0, 0)
    }

    //do constantly
    update() {
        //automatically fed time and delta
        
    }

    
}