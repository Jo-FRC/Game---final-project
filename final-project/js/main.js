
//initiate the Phaser framework
var game = new Phaser.Game(360, 592, Phaser.AUTO);





game.global = {
    thumbRows : 5,
    // number of thumbnail cololumns
    thumbCols : 4,
    // width of a thumbnail, in pixels
    thumbWidth : 64,
    // height of a thumbnail, in pixels
    thumbHeight : 64,
    // space among thumbnails, in pixels
    thumbSpacing : 8,
    // array with finished levels and stars collected.
    // 0 = playable yet unfinished level
    // 1, 2, 3 = level finished with 1, 2, 3 stars
    // 4 = locked
    starsArray : [0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    // level currently playing
    level : 0
};





game.state.add('GameState', GameState);
game.state.add('PreloadState', PreloadState);
game.state.add('BootState', BootState);
game.state.add('HomeState', HomeState);
game.state.add('LevelState', LevelState);
game.state.start('BootState');
