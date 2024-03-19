class UiHandler extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'sSheet')
		scene.add.existing(this)
        //create black menu background
        this.blackbox = scene.add.rectangle(0, 0, game.config.width, game.config.height/6, 0x000000).setOrigin(0).setScrollFactor(0)
        this.score = scene.add.bitmapText(96, game.config.height*1/12, 'pixelU', '0', 32).setScrollFactor(0).setOrigin(0.5)
        
    }
}