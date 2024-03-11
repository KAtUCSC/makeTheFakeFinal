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

        //create flag
        this.flag = this.add.sprite(flagSpawn.x*globalScaleFactor, flagSpawn.y*globalScaleFactor, 'sSheet', 'flag').setScale(globalScaleFactor).setOrigin(.5, 1)
        //create bike and player
        this.add.bitmapText(bikeSpawn.x*globalScaleFactor, bikeSpawn.y*globalScaleFactor, 'pixelU', 'Press D to GO', 32).setOrigin(0.5)
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
        //flag setup
        this.bike.end = false

    }

    //do constantly
    update() {
        //automatically fed time and delta
        if(keyD.isDown){
            //this.bike.applyForce(new Phaser.Math.Vector2(0.01, 0))
            this.bike.setVelocityX(15)
        }

        this.bike.flagDistX = Math.abs(this.bike.x - this.flag.x)
        this.bike.flagDistY = Math.abs(this.bike.y - this.flag.y)
        //console.log(this.bike.flagDistX)

        if(this.bike.flagDistX < 200 && this.bike.end == false) {
            this.add.bitmapText(this.flag.x, this.flag.y, 'pixelU', 'Flag Reached!', 64).setOrigin(0.5)
            this.time.delayedCall(3000, () => {
                this.scene.start('scoreScene')
            })
            this.bike.end = true
        }
    }

    
}