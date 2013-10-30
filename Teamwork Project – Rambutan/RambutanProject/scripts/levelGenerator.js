var levelGenerator = (function () {
    // Distance beween objects.
    var MIN_OBJECT_INTERVAL = 100;
    var MAX_OBJECT_INTERVAL = 200;
    var ground = null;

    // Percentage chance used to generate objects.
    var ENEMY_CHANCE = 50;
    var PLATFORM_CHANCE = 45;

    // Not used currently.
    var GUN_CHANCE = 5;

    function generate(levelData, screenWidth, _ground) {
        ground = _ground;
        var level = new Level(levelData);
        var generatedPercentage;
        var intervalBetweenObjects

        // currentPos is the global coordinate of every generated object.
        var currentObjPos = screenWidth;
        var levelLength = levelData.length;

        while (currentObjPos < levelLength) {
            intervalBetweenObjects = Math.floor((Math.random() * MAX_OBJECT_INTERVAL) + MIN_OBJECT_INTERVAL);
            currentObjPos += intervalBetweenObjects;

            generatedPercentage = Math.floor(Math.random() * 101);
            if (generatedPercentage <= ENEMY_CHANCE) {
                level.objects.push(generateEnemy(currentObjPos));
            }
            else {
                generatedPercentage -= ENEMY_CHANCE;
                if (generatedPercentage <= PLATFORM_CHANCE) {
                    level.objects.push(generateBox(currentObjPos));
                }
                else {
                    var platf = generatePlatform(currentObjPos);
                    level.objects.push(platf);
                    level.objects.push(generatePlatform2(currentObjPos, platf.y));
                }
            }
        }

        return level;
    }

    function createDivWithClass(className) {
        return $(document.createElement("div")).addClass(className);
    }

    function generateEnemy(objectPosition) {
        if (Math.random()*100 > 0) {
            var gun = new Gun({
                "bullet": "greenNeckBullet",
                "damage": 10,
                "speed": 200,
                "dX": 7
            });

            var redneck = new Soldier({
                "name": "enemy",
                "offscreenPos": objectPosition,
                "selector": createDivWithClass("greenNeck"),
                "onHitImage": 'greenNeck-hit',
                "onDeadImage": 'greenNeck-dead',
                "dX": 5,
                "dY": 0,
                "life": 50,
                "gunX": 0,
                "gunY": 15,
                "guns": [gun]
            });
        }
        else {
            var gun = new Gun({
                "bullet": "testBullet",
                "damage": 10,
                "speed": 200,
                "dX": 7
            });

            var redneck = new Soldier({
                "name": "enemy",
                "offscreenPos": objectPosition,
                "selector": createDivWithClass("redneck"),
                "dX": 5,
                "dY": 0,
                "life": 50,
                "gunX": -5,
                "gunY": 30,
                "guns": [gun]
            });
        }

        redneck.isFiring = true;
        return redneck;
    }

    function generateBox(objectPosition) {
        var box = new GameObject({
            "name": "platform",
            "selector": createDivWithClass("box"),
            "offscreenPos": objectPosition,
            "top": ground,
            "align": "bottom",
            "dX": 5,
            "dY": 0
        });

        return box;
    }

    function generatePlatform(objectPosition) {
        var box = new GameObject({
            "name": "platform",
            "selector": createDivWithClass("platformLine"),
            "offscreenPos": objectPosition,
            "top": Math.random()*300 + 200,
            "dX": 5,
            "dY": 0
        });

        return box;
    }

    function generatePlatform2(objectPosition, y) {
        var div = createDivWithClass("platform");
        var box = new GameObject({
            "name": "background",
            "selector": div,
            "offscreenPos": objectPosition,
            "top": y + 20,
            "dX": 5,
            "dY": 0
        });

        return box;
    }

    return {
        generate: generate
    };
})();