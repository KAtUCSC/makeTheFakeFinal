class Play extends Phaser.Scene {
    //functions happen in order

    //happens when the scene is instantiated at the start
    constructor() {
        super('playScene')
    }

    //happens once every time the scene is restarted/added
    init() {
        //can recieve data
        this.levelNumber = 1
    }

    //load assets
    preload() {

    }

    //make things
    create() {
        //can recieve data
        //scaling factor
        const globalScaleFactor = 4
        //tilemap setup
        const map = this.add.tilemap(`tilemapJSON${this.levelNumber}`)
        //ground is the tileset's name in tiled
        const tileset = map.addTilesetImage('ground', 'assetImage')
        //foreground is the name of the layer in tiled
        const groundLayer = map.createLayer('foreground', 'ground', 0, 0).setScale(globalScaleFactor)
        groundLayer.setCollisionByExclusion([-1, 0])

        //find flag and bike pos
        const bikeSpawn = map.findObject('spawns', (obj) => obj.name === 'bikeSpawn')
        //console.log(bikeSpawn)
        const flagSpawn = map.findObject('spawns', (obj) => obj.name === 'flagSpawn')

        //sky background
        let sky = this.add.rectangle(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor, 0xaaeeff).setOrigin(0).setDepth(-2)
        //console.log(sky)

        //create bike and player
        this.bike = this.matter.add.sprite(bikeSpawn.x*globalScaleFactor, bikeSpawn.y*globalScaleFactor, 'sSheet', 'bikeWheeled').setScale(globalScaleFactor)

        //colliders
        this.groundCollider = this.matter.world.convertTilemapLayer(groundLayer, )
        console.log(this.groundCollider)

        //set physics bounds
        this.matter.world.setBounds(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor)
        //world is small, make larger and taller
        
        //set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor)
        this.cameras.main.startFollow(this.bike, true, 0.25, 0.25, 0, 0)

        //define controls
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        //testing

    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(keyD.isDown){
            //this.bike.applyForce(new Phaser.Math.Vector2(0.01, 0))
            this.bike.setVelocityX(15)
        }
        
    }

    
}