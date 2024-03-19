class UiHandler extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'sSheet')
		scene.add.existing(this)
        //create black menu background
        this.blackbox = scene.add.rectangle(0, 0, game.config.width, game.config.height/6, 0x111111).setOrigin(0).setScrollFactor(0)
        //score text
        this.score = scene.add.bitmapText(96, game.config.height*1/12, 'pixelU', '0', 32).setScrollFactor(0).setOrigin(0.5)
        //bones
        this.bone1 = scene.add.sprite(game.config.width/2+48*1, game.config.height*1/12, 'sSheet', 'crossBones').setScrollFactor(0).setScale(4)
        this.bone2 = scene.add.sprite(game.config.width/2+48*2, game.config.height*1/12, 'sSheet', 'crossBones').setScrollFactor(0).setScale(4)
        this.bone3 = scene.add.sprite(game.config.width/2+48*3, game.config.height*1/12, 'sSheet', 'crossBones').setScrollFactor(0).setScale(4)
        this.bone4 = scene.add.sprite(game.config.width/2+48*4, game.config.height*1/12, 'sSheet', 'crossBones').setScrollFactor(0).setScale(4)
        this.bone5 = scene.add.sprite(game.config.width/2+48*5, game.config.height*1/12, 'sSheet', 'crossBones').setScrollFactor(0).setScale(4)
        //helmets
        this.helmet1= scene.add.sprite(48*1, game.config.height*11/12, 'sSheet', 'helmet').setScrollFactor(0).setScale(4)
        this.helmet2= scene.add.sprite(48*2, game.config.height*11/12, 'sSheet', 'helmet').setScrollFactor(0).setScale(4)
        this.helmet3= scene.add.sprite(48*3, game.config.height*11/12, 'sSheet', 'helmet').setScrollFactor(0).setScale(4)
    }
}