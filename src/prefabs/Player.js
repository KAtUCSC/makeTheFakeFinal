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
        this.setCollisionGroup(-6)
        //this.setOrigin(0.75, 0.75)
        scene.matter.world.on('collisionstart', bike.checkAngle, bike)
    }

    update(bike) {
        if(bike.crashed) {
            return
        }

        this.matchBike(bike)
        this.angle = bike.angle + 20
    }

    matchBike(bike) {
        //adapted from https://stackoverflow.com/questions/34372480/rotate-point-about-another-point-in-degrees-python
        let xr = -Math.sin(bike.rotation)*(-40) + bike.x
        let yr = Math.cos(bike.rotation)*(-40) + bike.y
        this.setPosition(xr, yr)
    }

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
    /*
    original:
    (x,y,xo,yo,theta): #rotate x,y around xo,yo by theta (rad)
    xr=math.cos(theta)*(x-xo)-math.sin(theta)*(y-yo)   + xo
    yr=math.sin(theta)*(x-xo)+math.cos(theta)*(y-yo)  + yo
    return [xr,yr]
    anything with x-xo is zero, remove those terms, anything with y-yo is -40
    why? we manually set our upright offset to 0, -40
    */
}