var gameManager = (function () {
    //'use strict';

    var gameWrapper = null;
    var speed = 0;
    var turn = 0;
    var player = null;
    var currentLevel = null;
    var enemies = [];
    var bullets = [];
    var platforms = [];
    var backgrounds = [];
    var all = [enemies, platforms, backgrounds];
    var ground = null;
    var currentPlatform = null;
    var rightKeyPressed = false;
    var leftKeyPressed = false;
    var spaceKeyPressed = false;
    var globalCoordinates = 0;
    var screenWidth = 0;
    var level = null;
    var timer = null;
    var lifeDiv = $("#player-life");
    var pointsDiv = $("#points");
    var points = 0;

    function createDivWithClass(className) {
        return $(document.createElement("div")).addClass(className);
    }

    function removeFrom(array, index) {
        array[index].remove();
        array.splice(array.indexOf(array[index]), 1);
    }

    function gamePlay() {

        for (var i = 0; i < enemies.length; i++) {
            enemies[i].fall();
        }

        var playing = window.setInterval(function () {
            player.update(bullets);
            var wallHit = false;

            //// Delete elements outside the wrapper
            for (var i = 0; i < all.length; i++) {
                for (var y = 0; y < all[i].length; y++) {
                    if (!all[i][y].intersects(gameWrapper) && all[i][y].x < 0) {
                        all[i][y].remove();
                        removeFrom(all[i], y);
                        y--;
                    }
                    else {
                        all[i][y].update(bullets);
                    }
                }
            }

            //// Bullets collisions
            for (var i = 0; i < bullets.length && i > -1; i++) {
                if (!bullets[i].intersects(gameWrapper)) {
                    removeFrom(bullets, i);
                    i--;
                }
                else {
                    bullets[i].move();

                    if (bullets[i].name == "player") {
                        for (var z = 0; z < enemies.length; z++) {
                            if (bullets[i].intersects(enemies[z])) {
                                enemies[z].bulletHit(bullets[i]);
                                removeFrom(bullets, i);
                                i--;
                                points += 35;
                                pointsDiv.html("Points: " + points);
                                if (i < 0) {
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        if (bullets[i].intersects(player)) {
                            player.bulletHit(bullets[i]);
                            //////////////// Life bar
                            lifeDiv.css("width", player.life / 2 + "px");
                            ////////////////
                            removeFrom(bullets, i);
                            i--;
                        }
                    }
                }
            }

            //// Player platform collisions
            for (var i = 0; i < platforms.length; i++) {
                if (player.intersects(platforms[i], 20, 0)) {
                    if (player.offsetY(platforms[i]) > 50) {
                        wallHit = true;
                    }
                    else {
                        wallHit = false;
                        player.stepOn(platforms[i]);
                        player.falling = false;
                        player.jumping = false;
                        player.onGround = true;
                    }
                }

                for (var b = 0; b < enemies.length; b++) {
                    if (enemies[b].intersects(platforms[i], 20, 0)) {
                        if (enemies[b].offsetY(platforms[i]) > 50) {
                            //wallHit = true;
                        }
                        else {
                            //wallHit = false;
                            enemies[b].stepOn(platforms[i]);
                            enemies[b].falling = false;
                            enemies[b].jumping = false;
                            enemies[b].onGround = true;
                        }
                    }
                }
            }

            if (spaceKeyPressed == true && rightKeyPressed != true) {
                player.changeBG("firing");
            }
            else if (rightKeyPressed == true && wallHit == false) {
                if (player.onGround == true) {
                    moveAll(5, 0);
                }
                else {
                    moveAll(10, 0);
                }
            }
            else if (leftKeyPressed == true && wallHit == false) {
                moveAll(-5, 0);
            }
            else {
                player.changeBG("stand");
            }

            turn++;
        }, speed);
    }

    function moveAll(dX, dY) {
        if (turn % 5 != 0) {
            return;
        }

        var newObjectsOnScreen = level.getObjectsOnScreen(globalCoordinates);
        if (level !== null && newObjectsOnScreen.length > 0) {
            appendObjects(newObjectsOnScreen);
        }

        for (var i = 0; i < all.length; i++) {
            for (var y = 0; y < all[i].length; y++) {
                if (all[i][y]) {
                    all[i][y].move(dX, dY);
                }
            }
        }
        player.changeBG("move");
        globalCoordinates += dX;
    }

    function appendObjects(newObjectsOnScreen) {
        for (var i = 0, length = newObjectsOnScreen.length; i < length; i++) {
            var current = newObjectsOnScreen[i];
            current.x = screenWidth;
            current.parent = gameWrapper.div;

            if (current instanceof Soldier) {
                for (var i = 0; i < current.guns.length; i++) {
                    current.guns[i].parent = gameWrapper.div;
                }
                enemies.push(current);
                //current.y = ground;
                current.groundY = ground;
                current.falling = true;
                current.fall();
            }

            else if (current.name == "platform") {
                platforms.push(current);
            }
            else if (current.name == "background") {
                backgrounds.push(current);
            }
            current.append(current.parent, "bottom");
        }
    }

    function checkDocumentKey(e) {
        e = e || window.event;

        //"up" key
        if (e.keyCode == '38') {
            if (player.onGround == true) {
                player.jump();
            }
        }
        //"down" key
        if (e.keyCode == '40') {
        }
        //"right" key
        if (e.keyCode == '39') {
            rightKeyPressed = true;
        }
        //"left" key
        if (e.keyCode == '37') {
            leftKeyPressed = true;
        }

        //space key
        if (e.keyCode == '32') {
            spaceKeyPressed = true;
            player.isFiring = true;
        }
    }

    function checkDocumentKeyUp(e) {
        e = e || window.event;
        //"up" key
        if (e.keyCode == '38') {
        }

        //"right" key
        if (e.keyCode == '39') {
            rightKeyPressed = false;
        }
        //"left" key
        if (e.keyCode == '37') {
            leftKeyPressed = false;
        }

        //space key
        if (e.keyCode == '32') {
            spaceKeyPressed = false;
            player.isFiring = false;
            player.guns[player.currentGun].timeInterval = player.guns[player.currentGun].speed;
        }
    }

    return {
        init: function (initData) {
            speed = initData.speed;

            gameWrapper = new GameObject({
                "selector": $("<div id=gameWrapper></div>"),
                "parent": $("#wrapper")
            });

            ground = gameWrapper.height;
            screenWidth = gameWrapper.width;
            globalCoordinates = screenWidth;

            gun = new Gun({
                "bullet": "testBullet",
                "damage": 10,
                "parent": gameWrapper.div,
                "speed": 60,
                "dX": -15
            });

            player = new Player({
                "name": "player",
                "selector": createDivWithClass("player"),
                "left": 100,
                "top": ground,
                "parent": gameWrapper.div,
                "align": "bottom",
                "groundY": ground,
                "isFiring": false,
                "gunX": 25,
                "gunY": 30,
                "life": 400,
                "guns": [
                    gun
                ]
            });

            grass = new GameObject({
                "name": "Grass",
                "selector": createDivWithClass("grass"),
                "left": 0,
                "top": ground,
                "align": "bottom",
                "parent": gameWrapper.div,
                "dX": 5,
                "dY": 0
            });
            backgrounds.push(grass);

            background = new GameObject({
                "name": "Grass",
                "selector": createDivWithClass("background1"),
                "parent": gameWrapper.div,
                "dX": 1,
                "dY": 0
            });
            backgrounds.push(background);

            player.stepOn(grass, -20);

            //level = levelGenerator.generate({
            //    "name": "level 1",
            //    "backgrounds": null,
            //    "length": 10000
            //}, screenWidth, ground);

            level = _level1;

            timer = new Timer({
                "name": "timer",
                "selector": createDivWithClass("timer"),
                "parent": gameWrapper.div
            });

            timer.start();

            document.onkeydown = checkDocumentKey;
            document.onkeyup = checkDocumentKeyUp;
            gamePlay();
        }
    }
}());

gameManager.init({
    "gameWrapper": "#gameWrapper",
    "speed": 8,
});
