var GameState = {

    init: function(currentLevel) {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 1000;

        this.cursors = this.game.input.keyboard.createCursorKeys();

        this.game.world.setBounds(0,0,360,700);

        this.RUNNING_SPEED = 180;
        this.JUMPING_SPEED = 550;

        //level data
        this.numLevels = 3;
        this.currentLevel = this.currentLevel || 1;
        console.log('current level: ' + this.currentLevel);
    },



    //executed after everything is loaded
    create: function() {
        var style = {font:'35px Arial', fill:'#fff'};
        var style2 = {font:'18px Arial', fill:'#fff'};
        var myText = 'LEVEL ' + GameState.currentLevel;
        var testo = this.game.add.text(110, this.game.world.centerY + 240,  myText, style);

        // var time = this.game.add.text(0, 10,  'Time: ', style2);
        var score = this.game.add.text(140, 10,  'Score: ', style2);

        var time = this.game.add.text(80, 10,  '11', style2);


        timer = game.time.create();

       // Create a delayed event 1m and 30s from now
       timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);

       // Start the timer
       timer.start();

        // secondi.fixedToCamera = true;
        timer.fixedToCamera = true;
        score.fixedToCamera = true;

        this.refreshStats();

        game.time.events.add(2000, function(){
            game.add.tween(testo).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
            game.add.tween(testo).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        }, this);


        this.game.stage.backgroundColor = '#000';
        this.ground = this.add.sprite(0, 638, 'ground');
        this.game.physics.arcade.enable(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        //parse the file
        this.levelData = JSON.parse(this.game.cache.getText('level' + this.currentLevel));


        //end of level

        // this.endOfLevelWin = this.game.goal.events.add(function(){
        //     console.log('level ended');
        // }, this);

        // if (win)


        this.platforms = this.add.group();
        this.platforms.enableBody = true;

        this.levelData.platformData.forEach(function(element){
            this.platforms.create(element.x, element.y, 'platform');
        }, this);

        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.allowGravity', false);

        //fires
        this.fires = this.add.group();
        this.fires.enableBody = true;

        var fire;
        this.levelData.fireData.forEach(function(element){
            fire = this.fires.create(element.x, element.y, 'fire');
            fire.animations.add('fire', [0, 1], 4, true);
            fire.play('fire');
        }, this);

        this.fires.setAll('body.allowGravity', false);

        //goal
        this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal');
        this.game.physics.arcade.enable(this.goal);
        this.goal.body.allowGravity = false;

        //create player
        this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player', 3);
        this.player.anchor.setTo(0.5);
        this.player.animations.add('walking', [0, 1, 2, 1], 6, true);
        this.game.physics.arcade.enable(this.player);
        this.player.customParams = {};
        this.player.body.collideWorldBounds = true;

        this.game.camera.follow(this.player);

        this.createOnscreenControls();

        this.barrels = this.add.group();
        this.barrels.enableBody = true;

        this.createBarrel();
        this.barrelCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.barrelFrequency, this.createBarrel, this)
    },
    update: function() {

        this.game.physics.arcade.collide(this.player, this.ground);
        this.game.physics.arcade.collide(this.player, this.platforms);

        this.game.physics.arcade.collide(this.barrels, this.ground);
        this.game.physics.arcade.collide(this.barrels, this.platforms);

        this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
        this.game.physics.arcade.overlap(this.player, this.barrels, this.killPlayer);
        this.game.physics.arcade.overlap(this.player, this.goal, this.win);

        this.player.body.velocity.x = 0;

        if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
            this.player.body.velocity.x = -this.RUNNING_SPEED;
            this.player.scale.setTo(1, 1);
            this.player.play('walking');
        }
        else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
            this.player.body.velocity.x = this.RUNNING_SPEED;
            this.player.scale.setTo(-1, 1);
            this.player.play('walking');
        }
        else {
            this.player.animations.stop();
            this.player.frame = 3;

        }

        if((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
            this.player.body.velocity.y = -this.JUMPING_SPEED;
            this.player.customParams.mustJump = false;
        }

        this.barrels.forEach(function(element){
            if(element.x < 10 && element.y > 600) {
                element.kill();
            }
        }, this);
    },
    createOnscreenControls: function(){
        this.leftArrow = this.add.button(20, 535, 'arrowButton');
        this.rightArrow = this.add.button(110, 535, 'arrowButton');
        this.actionButton = this.add.button(280, 535, 'actionButton');

        this.leftArrow.alpha = 0.5;
        this.rightArrow.alpha = 0.5;
        this.actionButton.alpha = 0.5;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.mustJump = true;
        }, this);

        this.actionButton.events.onInputUp.add(function(){
            this.player.customParams.mustJump = false;
        }, this);

        this.actionButton.events.onInputDown.add(function(){
            this.player.customParams.mustJump = true;
        }, this);

        this.actionButton.events.onInputOut.add(function(){
            this.player.customParams.mustJump = false;
        }, this);

        //left
        this.leftArrow.events.onInputOver.add(function(){
            this.player.customParams.isMovingLeft = true;
        }, this);

        this.leftArrow.events.onInputUp.add(function(){
            this.player.customParams.isMovingLeft = false;
        }, this);

        this.leftArrow.events.onInputOver.add(function(){
            this.player.customParams.isMovingLeft = true;
        }, this);

        this.leftArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingLeft = false;
        }, this);

        //right
        this.rightArrow.events.onInputDown.add(function(){
            this.player.customParams.isMovingRight = true;
        }, this);

        this.rightArrow.events.onInputUp.add(function(){
            this.player.customParams.isMovingRight = false;
        }, this);

        this.rightArrow.events.onInputOver.add(function(){
            this.player.customParams.isMovingRight = true;
        }, this);

        this.rightArrow.events.onInputOut.add(function(){
            this.player.customParams.isMovingRight = false;
        }, this);
    },
    killPlayer: function(player, fire) {
        console.log('auch!');
        game.state.start('HomeState', true, false, 'GAME OVER');
    },
    win: function(player, goal) {
        alert('you win!');

        console.log('level ended');
        console.log(GameState.currentLevel);
        if (GameState.currentLevel < GameState.numLevels){
            GameState.currentLevel++;
        } else {
            GameState.currentLevel = 1;
        }
        console.log(GameState.currentLevel);
        game.state.start('GameState');
    },
    createBarrel: function() {
        //give me the first dead sprite
        var barrel = this.barrels.getFirstExists(false);

        if(!barrel) {
            barrel = this.barrels.create(0, 0, 'barrel');
        }

        barrel.body.collideWorldBounds = true;
        barrel.body.bounce.set(1, 0);

        barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
        barrel.body.velocity.x = this.levelData.barrelSpeed;
    },

    refreshStats: function(){
        this.time.text = 'x';

    },

    render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
        }
        else {
            this.killPlayer();
        }
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        timer.stop();
    },
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);
    }



};
