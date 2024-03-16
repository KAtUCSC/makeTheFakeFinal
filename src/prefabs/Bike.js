class Bike extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        //scene.matter.world from: https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220/5
        super(scene.matter.world, x, y, texture, frame, {
            label: 'bike',
            restitution: 0,
            friction: 0.0,
            frictionAir: 0,
            frictionStatic: 0.1,
            vertices: [
              { "x": 47, "y": 12 },
              { "x": 46, "y": 14 },
              { "x": 45, "y": 15.5 },
              { "x": 44, "y": 16 },
              { "x": 42, "y": 16 },
              { "x": 35, "y": 12 },
              { "x": 28, "y": 16 },
              { "x": 26, "y": 16 },
              { "x": 25, "y": 15.5 },
              { "x": 24, "y": 14 },
              { "x": 23, "y": 12 },
              { "x": 30, "y": 3 },
              { "x": 40, "y": 3 }
            ]
        })
        //add to scene
		scene.add.existing(this)

        //driving params
        this.xAcceleration = 20
        this.xControlSpeed = 10
        this.maxSpeed = 15
        this.minSpeed = 1
        this.angleSpeed = 10
        this.angleAcceleration = 1

        this.targetSpeed = this.minSpeed
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
        scene.matter.world.on('collisionstart', this.checkAngle, this)

        //testbed
        this.end = false
        console.log(this)
    }

    update() {
        if(this.grounded){
            //reset air timer
            this.airTime.elapsed = 0
            this.airTime.hasDispatched = false
        }
        
        if(this.airTime.elapsed < 150) {
            //using the air timer instead of the grounded flag allows you to keep driving and keep speed after bouncing on the ground
            //makes movement more consistent and smoother
            //run the player's speed input function
            this.updateTargetSpeed(this.end)
            let bikeSpeed = this.getVelocity().x
            //approach that speed
            //the -0.2 is to prevent it from trying to move at 0 speed when the bike moves slightly backwards from bouncing
            if(true) {//bikeSpeed < this.targetSpeed
                let accerlationGoal = Math.min(this.xAcceleration/100, Math.max(-this.xAcceleration/300, (this.targetSpeed - bikeSpeed)/10))
                //console.log(this.xAcceleration/100, (this.targetSpeed - bikeSpeed)/10)
                this.applyForceFrom({x: this.x, y: this.y}, {x: accerlationGoal/10, y: 0}) // - this.height/2
            }
        } else if(this.airTime.elapsed > 200) {
            let currentSpin = this.getAngularVelocity()
            this.setAngularVelocity(currentSpin*9/10)
            this.targetSpin = (keyD.isDown - keyA.isDown) * this.angleSpeed/100
            this.approachAngular(this.targetSpin)
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

    checkAngle(matterCollide, bodyA, bodyB) {
        let angle = 0
        if(bodyA.label === 'bike') {
            angle = bodyA.angle
        } else {
            angle = bodyB.angle
        }
        angle = (2*angle/Math.PI)%4
        console.log(angle)
        if(Math.abs(angle) > 1 && Math.abs(angle) < 3) {
            console.log('CRASH', angle)
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

    updateTargetSpeed(endFlag) {
        this.targetSpeed = Math.min(this.maxSpeed, Math.max(this.targetSpeed + (keyD.isDown - keyA.isDown) * this.xControlSpeed/10, this.minSpeed))
        if(endFlag) {
            this.targetSpeed = 0
        }
    }
}