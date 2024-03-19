/*
Kira Way
Make the Fake: Broken Bonez
Major components: Physics system, camera, tilemaps, timers, text objects
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    render: {
        pixelArt:true,
    },
    physics:{
        default: "matter",
        matter: {
            debug: false
        }
    },
    scene: [Load, Title, Tutorial, Play, Score, Credits]
}

let game = new Phaser.Game(config);

let keyA, keyD, keyJ, keyK