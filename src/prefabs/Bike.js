class Bike extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, frame) {
        //scene.matter.world from: https://phaser.discourse.group/t/how-to-enable-physics-on-extended-sprite-class/4220/5
        super(scene.matter.world, x, y, texture, frame, {
            label: 'bike',
            restitution: 0.1,
            friction: 0,
            frictionAir: 0.01,
            frictionStatic: 0.1,
            vertices: [
              { "x": 47, "y": 10 },
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
              { "x": 23, "y": 10 },
              { "x": 30, "y": 3 },
              { "x": 40, "y": 3 }
            ]
        })
        //add to scene
		scene.add.existing(this)
        this.setCollisionGroup(-6)

        //driving params
        this.xAcceleration = 20
        this.xControlSpeed = 10
        this.maxSpeed = 13
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

        //collision detection
        scene.matter.world.on('collisionactive', this.groundSetter, this)
        scene.matter.world.on('collisionstart', this.checkAngle, this)

        //flags and player
        this.end = false
        this.crashed = false
        this.player = new Player(scene, this.x, this.y, 'sSheet', 'player', this)
    }

    update() {
        this.player.update(this)

        if(this.crashed) {
            //if crashed, skip the below things
            return
        }        
        //using the air timer instead of the grounded flag allows you to keep driving and keep speed after bouncing on the ground
        //makes movement more consistent and smoother
        if(this.airTime.elapsed < 150) {
            //run the player's speed input function
            this.updateTargetSpeed(this.end)
            let bikeSpeed = this.getVelocity().x

            //approach that speed
            if(true) {
                let accerlationGoal = Math.min(this.xAcceleration/100, Math.max(-this.xAcceleration/300, (this.targetSpeed - bikeSpeed)/10))
                this.applyForceFrom({x: this.x, y: this.y}, {x: accerlationGoal/10, y: 0})
            }
        //if you have enough air time, give them tilt control
        } else if(this.airTime.elapsed > 200) {
            //spin slowdown feels nice
            let currentSpin = this.getAngularVelocity()
            this.setAngularVelocity(currentSpin*9/10)
            
            //feed our spin accel function a target spin for it to approach
            this.targetSpin = (keyD.isDown - keyA.isDown) * this.angleSpeed/100
            this.approachAngular(this.targetSpin)

            //check for flip
            this.flipCheck()
        }
        
        this.grounded = false
        this.airTime.paused = false

    }

    groundSetter(matterCollide) {
        //loop through collision pairs, if one of them is of the bike and the ground, set ground to true
        //ground is set false at the end of every bike update
        for (let i = 0; i < matterCollide.pairs.length; i++) {
            const bodyA = matterCollide.pairs[i].bodyA
            const bodyB = matterCollide.pairs[i].bodyB

            if((bodyA.label === 'bike' && bodyB.label === 'ground') ||
            (bodyB.label === 'bike' && bodyA.label === 'ground')) {
                this.groundBike()
            }
        }
    }

    checkAngle(matterCollide, bodyA, bodyB) {
        if(this.crashed) {
            //if crashed, don't care about handling a crash anymore
            return
        }
        //get bike angle (given in radians)
        let angle = 0
        if(bodyA.label === 'bike' || bodyA.label === 'player') {
            angle = bodyA.angle
        } else {
            angle = bodyB.angle
        }
        //divide by pi/2 to turn the circle from 2pi into 4 units, can be treated as 4 quadrants of the circle
        //since rotation can be more than one full rotation, use modulo 4 to get the actual quadrant
        //+ is clockwise, - is counterclockwise
        //0 is straight up, +-4 is a full circle, +-2 is upside down
        //thus, math abs 1 through 3 is the bike being rotated 90 degrees or more and we set that to our crash zone
        angle = (2*angle/Math.PI)%4
        if(Math.abs(angle) > 1 && Math.abs(angle) < 3) {
            //we also check if crashed isn't true so it doesn't keep crashing while its on its back after crashing
            this.crashBike()
        } else if(this.airTime.elapsed > 1000) {
            //if flying for a second and not crashlanding, add score
            this.scene.changeScore(100)
        }
        this.groundBike()
    }

    flipCheck() {
        //turn 2pi circle into 4 quadrants
        let flipAngle = this.rotation*2/Math.PI
        //get the sign
        let flipSign = Math.abs(this.rotation)/this.rotation
        if(Math.abs(flipAngle) > 3) {
            this.scene.changeScore(100)
            //reset rotation by adding 2pi * the opposite sign
            //prevents doing a flip per frame from the same flip
            this.rotation += 2*Math.PI * -flipSign
        }
    }

    groundBike() {
        this.grounded = true
        this.airTime.elapsed = 0
        this.airTime.hasDispatched = false
    }

    crashBike() {
        this.setTexture('sSheet', 'bikeCrashed')

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
            { "x":25, "y":34 },
            { "x":26, "y":40 },
            { "x":47, "y":40 },
            { "x":48, "y":34 }
            ],
            friction: 0.1,
            frictionStatic: 0.5,
            frictionAir: 0.5
        })
        //restore transformations
        this.setScale(scale)
        this.setAngle(angle)
        this.setVelocity(velocity['x'], velocity['y'])
        this.setAngularVelocity(spin)

        //lower image to match hitbox
        this.setOrigin(0.5, 0.65)

        //remove player control
        this.crashed = true
        //stop camera
        this.scene.cameras.main.stopFollow()
        //crash player and handle death
        this.player.crashPlayer()
        this.scene.changeScore(-100)
        this.handleDeath()
    }

    handleDeath() {
        this.scene.changeHelmets()
        console.log(game.playerStats)
        if(game.playerStats.helmets > 0) {
            this.scene.time.delayedCall(5000, () => {
                this.scene.scene.restart()
            })
        } else {
            this.scene.time.delayedCall(5000, () => {
                this.scene.scene.start('scoreScene')
            })
        }
    }

    approachAngular(target) {
        //get how much you need to change the angle and the sign of that change
        let currentSpin = this.getAngularVelocity()
        let difference = target - currentSpin
        let directionSign = Math.abs(difference)/difference
        //direction sign can be nan through a divide by zero
        //if difference is zero, set to 1 to prevent errors
        if (isNaN(directionSign)) {
            directionSign = 1
        }
        //set spin to whichever has the smaller magnitude: the difference or the spin acceleration
        //this lets it smooth out as you get close to the target
        //multiply by the direction sign to push it towards the target spin
        let spinSetter = currentSpin + Math.min(Math.abs(difference), this.angleAcceleration/100) * directionSign
        this.setAngularVelocity(spinSetter)
    }

    updateTargetSpeed(endFlag) {
        //target speed is clamped between the max speed and the min speed
        //target speed starts at min speed
        //uses keyd-keya to act as 1 or -1, then multiplies that by x control speed
        //adds that to the target speed to either add or subtract the x control from the target speed depending on input
        this.targetSpeed = Math.min(this.maxSpeed, Math.max(this.targetSpeed + (keyD.isDown - keyA.isDown) * this.xControlSpeed/10, this.minSpeed))
        if(endFlag) {
            this.targetSpeed = 0
        }
    }

    scaleBoth(amount) {
        //use this instead of directly setting scale to keep both scaled together
        this.setScale(amount)
        this.player.setScale(amount)
    }
}