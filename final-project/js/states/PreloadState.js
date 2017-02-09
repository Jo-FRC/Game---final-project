var PreloadState = {
    //load the game assets before the game starts
    preload: function() {
        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);
        this.logo.scale.setTo(0.5);
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('platform', 'assets/images/platform.png');
        this.load.image('goal', 'assets/images/gorilla3.png');
        this.load.image('arrowButton', 'assets/images/arrowButton.png');
        this.load.image('actionButton', 'assets/images/actionButton.png');
        this.load.image('barrel', 'assets/images/barrel.png');
        this.load.image('clock', 'assets/images/clock.png', 20, 21, 2, 1, 1);


        this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1);
        this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);



        this.load.spritesheet("levels", "assets/images/levels.png", this.game.global.thumbWidth, this.game.global.thumbHeight);
        this.load.spritesheet("level_arrows", "assets/images/level_arrows.png", 48, 48);
        this.load.spritesheet("game", "assets/images/game.png", 200, 80);




        this.load.text('level1', 'assets/data/level1.json');
        this.load.text('level2', 'assets/data/level2.json');
        this.load.text('level3', 'assets/data/level3.json');

    },

    create: function(){
        this.state.start('HomeState');
    }
};
