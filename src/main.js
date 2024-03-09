/*
Kira Way
Make the Fake: Broken Bonez
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
            debug: true
        }
    },
    scene: [Load, Title, Play, Score]
}

let game = new Phaser.Game(config);

let keyA, keyD, keyJ, keyK