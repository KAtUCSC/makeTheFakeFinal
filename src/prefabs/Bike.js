class Bike extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        //scene.matter.world from: https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220/5
        super(scene.matter.world, x, y, texture, frame, {
            label: 'bike',
            restitution: 0,
            friction: 0.01,
            frictionAir: 0,
            frictionStatic: 0,
            vertices: [
              { "x": 47, "y": 12 },
              { "x": 45, "y": 15 },
              { "x": 43, "y": 16 },
              { "x": 35, "y": 12 },
              { "x": 28, "y": 16 },
              { "x": 23, "y": 12 },
              { "x": 30, "y": 3 },
              { "x": 40, "y": 3 }
            ]
        })
        //add to scene
		scene.add.existing(this)

        //driving params
        this.xAcceleration = 20
        this.xControlSpeed = 5
        this.maxSpeed = 15
        this.minSpeed = 0
        this.angleSpeed = 10
        this.angleAcceleration = 1

        this.velocityTarget = 0
        this.grounded = true

        //airTime sensor
        this.airTime = scene.time.delayedCall(999999, null, null, this)
        this.airTime.repeat = -1
        this.airTime.loop = true
        this.airTime.paused = true
        console.log(this.airTime)

        //collision testing
        scene.matter.world.on('collisionactive', this.groundSetter, this)
        //scene.matter.world.on('collisionend', this.groundStopper, this)

        //testbed
        console.log(this)
    }

    update() {
        if(this.grounded){
            this.airTime.elapsed = 0
            this.airTime.hasDispatched = false
            //console.log(this.getVelocity().x)
            /*
            const currentXSpeed = this.getVelocity().x
            this.velocityTarget = this.velocityTarget + keyD.isDown * this.xControlSpeed/10 - keyA.isDown * this.xControlSpeed/10
            this.velocityTarget = Math.min(this.maxSpeed, Math.max(this.minSpeed, this.velocityTarget))
            this.velocitySet = Math.min(this.velocityTarget, this.xAcceleration/10 + currentXSpeed)
            console.log(this.velocityTarget, this.velocitySet)
            this.setVelocityX(this.velocitySet)
            */
            if(keyD.isDown && this.getVelocity().x < 15) {
                this.applyForceFrom({x: this.x - this.height/2, y: this.y}, {x: 0.02, y: 0.001})
            }
        } else if(this.airTime.elapsed > 100) {
            //console.log(this.airTime.elapsed)
            let currentSpin = this.getAngularVelocity()
            this.setAngularVelocity(currentSpin*9/10)
            this.targetSpin = (keyD.isDown - keyA.isDown) * this.angleSpeed/100
            this.approachAngular(this.targetSpin)
            /*
            if(this.targetSpin > currentSpin) {
                this.setAngularVelocity(Math.min(this.targetSpin, currentSpin + this.angleAcceleration/100))
            } else {
                this.setAngularVelocity(Math.max(this.targetSpin, currentSpin - this.angleAcceleration/100))
            }
            */
            //console.log(this.targetSpin, this.getAngularVelocity())
        }
        
        //console.log(this.getVelocity().x)
        this.grounded = false
        this.airTime.paused = false

    }

    groundSetter(matterCollide) {
        //console.log(matterCollide)
        for (let i = 0; i < matterCollide.pairs.length; i++) {
            //console.log(matterCollide.pairs[i])
            const bodyA = matterCollide.pairs[i].bodyA
            const bodyB = matterCollide.pairs[i].bodyB
            if((bodyA.label === 'bike' && bodyB.label === 'ground') ||
            (bodyB.label === 'bike' && bodyA.label === 'ground')) {
                this.grounded = true
            }
        }
    }

    groundStopper(matterCollide) {
        for (let i = 0; i < matterCollide.pairs.length; i++) {
            //console.log(matterCollide.pairs[i])
            const bodyA = matterCollide.pairs[i].bodyA
            const bodyB = matterCollide.pairs[i].bodyB
            if((bodyA.label === 'bike' && bodyB.label === 'ground') ||
            (bodyB.label === 'bike' && bodyA.label === 'ground')) {
                this.grounded = false
            }
        }
    }

    approachAngular(target) {
        let currentSpin = this.getAngularVelocity()
        let difference = target - currentSpin
        let directionSign = Math.abs(difference)/difference
        if (isNaN(directionSign)) {
            directionSign = 1
        }
        let spinSetter = currentSpin + Math.min(Math.abs(difference), this.angleAcceleration/100) * directionSign
        this.setAngularVelocity(spinSetter)
    }
}