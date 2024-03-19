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
        groundLayer.setCollisionByProperty({ collides: true})

        //find flag and bike pos
        const bikeSpawn = map.findObject('spawns', (obj) => obj.name === 'bikeSpawn')
        //console.log(bikeSpawn)
        const flagSpawn = map.findObject('spawns', (obj) => obj.name === 'flagSpawn')

        //sky background
        let sky = this.add.rectangle(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor, 0xaaeeff).setOrigin(0).setDepth(-2)

        //create flag
        this.flag = this.add.sprite(flagSpawn.x*globalScaleFactor, flagSpawn.y*globalScaleFactor, 'sSheet', 'flag').setScale(globalScaleFactor).setOrigin(.5, 1)
        //create bike and player
        this.bike = new Bike(this, bikeSpawn.x*globalScaleFactor, bikeSpawn.y*globalScaleFactor, 'sSheet', 'bikeWheeled')
        this.bike.scaleBoth(globalScaleFactor)

        //colliders
        this.groundCollider = this.matter.world.convertTilemapLayer(groundLayer)
        //console.log(this.groundCollider)
        //collision detection setup
        groundLayer.forEachTile(tile => {
            if(tile.collides == true) {
                tile.physics.matterBody.body.label = 'ground'
            }
        })

        //set physics bounds
        this.matter.world.setBounds(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor)
        //world is small, make larger and taller
        
        //set camera bounds
        this.cameras.main.setBounds(0, 0, map.widthInPixels*globalScaleFactor, map.heightInPixels*globalScaleFactor)
        this.cameras.main.startFollow(this.bike, true, 0.75, 0.75, 0, 0).setFollowOffset(-game.config.width/4, game.config.height/8)

        //define controls
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J)
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)

        //create ui
        this.ui = new UiHandler(this)
        this.ui.updateHelmets(game.playerStats.helmets)
        this.ui.updateBones(game.playerStats.bones)

        //flag setup
        this.bike.end = false

    }

    //do constantly
    update() {
        //automatically fed time and delta
        this.bike.update()

        this.bike.flagDistX = Math.abs(this.bike.x - this.flag.x)

        if(this.bike.flagDistX < this.flag.width/2 && this.bike.end == false) {
            this.add.bitmapText(this.flag.x, this.flag.y, 'pixelU', 'Flag Reached!', 64).setOrigin(0.5)

            this.time.delayedCall(5000, () => {
                this.scene.start('scoreScene')
            })
            
            this.bike.end = true
            this.bike.airTime.paused = true

            this.changeScore((game.playerStats.helmets + game.playerStats.bones) * 100)
        }
    }

    changeScore(value) {
        game.playerStats.score += value
        this.ui.score.text = game.playerStats.score
        let text = this.add.bitmapText(this.bike.x, this.bike.y - this.bike.height, 'pixelU', value, 32).setOrigin(.5)
        this.time.delayedCall(1000, () => text.destroy())
    }

    changeHelmets() {
        game.playerStats.helmets -= 1
        this.ui.updateHelmets(game.playerStats.helmets)
    }

    changeBones(value) {
        game.playerStats.bones += value
        game.playerStats.bones = Math.max(0, game.playerStats.bones)
        this.ui.updateBones(game.playerStats.bones)
    }    
}