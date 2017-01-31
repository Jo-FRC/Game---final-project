var BootState = {
    //initiate game settings
    init: function() {
        //adapt to screen size, fit all the game
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function(){
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('preloadBar', 'assets/images/bar.png');
    },

    create: function(){
        this.game.stage.backgroundColor = '#fff';

        this.state.start('PreloadState');
    }
};
