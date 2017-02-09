var LevelState = {

    init: function(currentLevel) {

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.world.setBounds(0,0,360,700);


        //level data
        this.numLevels = 3;
        this.currentLevel = this.currentLevel || 1;
        console.log('current level: ' + this.currentLevel);
    },



    //executed after everything is loaded
    create: function() {
        this.game.stage.backgroundColor = '#000';
        this.ground = this.add.sprite(0, 638, 'ground');

    },
    update: function() {


    },



};
