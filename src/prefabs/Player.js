class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame, bike) {
        //scene.matter.world from: https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220/5
        super(scene.matter.world, x, y, texture, frame, {
            label: 'player',
            vertices: [
                { "x":49, "y":13 },
                { "x":57, "y":9 },
                { "x":54, "y":0 },
                { "x":49, "y":0 },
        ]
        })
        //add to scene
		scene.add.existing(this)
        //stop from colliding with bike
        this.setCollisionGroup(-6)
        //count player hitbox for crash checking
        scene.matter.world.on('collisionstart', bike.checkAngle, bike)

        //control
        this.stunting = false
        this.offset = {
            x: 0,
            y: -40,
            angle: 20
        }
    }

    update(bike) {
        if(bike.crashed) {
            return
        }

        let stuntInputs = keyJ.isDown + keyK.isDown
        if(stuntInputs && !this.stunting && bike.airTime.elapsed > 200) {
            this.doStunt(bike, keyJ.isDown, keyK.isDown)
        }

        //stay connected to bike
        this.matchBike(bike, this.offset)
    }

    doStunt(bike, jDown, kDown) {
        this.stunting = true
        if(jDown) {
            this.offset = {
                x: -40,
                y: -55,
                angle: 10
            }
            this.setTexture('sSheet', 'stunt1')
            this.resetBike(bike, 1000, 250)
        } else if(kDown) {
            this.offset = {
                x: -30,
                y: -40,
                angle: 0
            }
            this.setTexture('sSheet', 'stunt2')
            this.resetBike(bike, 500, 100)
        }
    }

    resetBike(bike, time, score) {
        this.scene.time.delayedCall(time, () => {
            if(bike.crashed) {
                return
            }
            this.offset = {
                x: 0,
                y: -40,
                angle: 20
            }
            this.setTexture('sSheet', 'player')
            this.stunting = false
            this.scene.changeScore(score)
        }, null, this)
    }

    matchBike(bike, offset) {
        //adapted from https://stackoverflow.com/questions/34372480/rotate-point-about-another-point-in-degrees-python
        let bikeCos = Math.cos(bike.rotation)
        let bikeSin = Math.sin(bike.rotation)
        let xr = bikeCos * offset.x - bikeSin * offset.y + bike.x
        let yr = bikeSin * offset.x + bikeCos * offset.y + bike.y
        this.setPosition(xr, yr)
        this.angle = bike.angle + offset.angle
    }
    /*
    original:
    (x,y,xo,yo,theta): #rotate x,y around xo,yo by theta (rad)
    xr=math.cos(theta)*(x-xo)-math.sin(theta)*(y-yo)   + xo
    yr=math.sin(theta)*(x-xo)+math.cos(theta)*(y-yo)  + yo
    return [xr,yr]
    anything with x-xo is zero, remove those terms, anything with y-yo is -40
    why? we manually set our upright offset to 0, -40

    update: since values are now dynamic we implemented the whole thing
    */

    crashPlayer() {
        this.setTexture('sSheet', 'playerCrashed')

        //save transformations
        let scale = this.scale
        let angle = this.angle
        let velocity = this.getVelocity()
        let spin = this.getAngularVelocity()
        
        //reset scale
        this.setScale(1)
        this.setAngle(0)
        //set new body at same location
        this.setBody({
            type: 'fromVerts',
            x: this.x,
            y: this.y,
            verts: [
            { "x":25, "y":36 },
            { "x":26, "y":40 },
            { "x":47, "y":40 },
            { "x":48, "y":36 }
            ]
        })
        //restore transformations
        this.setScale(scale)
        this.setAngle(0)
        this.setVelocity(velocity['x'], velocity['y'])
        this.setAngularVelocity(spin)
        
        //set origin to match
        this.setOrigin(0.5, 0.6)
    }
}