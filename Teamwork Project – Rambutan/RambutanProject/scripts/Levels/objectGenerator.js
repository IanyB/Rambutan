var objectGenerator = (function () {

    function createDivWithClass(className) {
        return $(document.createElement("div")).addClass(className);
    }

    function greenNeck(objectPosition, y) {
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
            "onHitImage": "greenNeck-hit",
            "onDeadImage": "greenNeck-dead",
            "top": y,
            "dX": 5,
            "dY": 0,
            "life": 50,
            "gunX": 0,
            "gunY": 15,
            "guns": [gun]
        });

        redneck.isFiring = true;
        return redneck;
    }

    function box(objectPosition, y) {
        var box = new GameObject({
            "name": "platform",
            "selector": createDivWithClass("box"),
            "offscreenPos": objectPosition,
            "top": y || ground,
            "align": "bottom",
            "dX": 5,
            "dY": 0
        });

        return box;
    }

    function platform(objectPosition, y) {
        var box = new GameObject({
            "name": "platform",
            "selector": createDivWithClass("platformLine"),
            "offscreenPos": objectPosition,
            "top": y,
            "dX": 5,
            "dY": 0
        });

        return box;
    }

    function platform2(objectPosition, y) {
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

    function boss1(objectPosition, y) {
        var gun = new Gun({
            "bullet": "greenNeckBullet",
            "damage": 10,
            "speed": 200,
            "dX": 7
        });
        var gun2 = new Gun({
            "bullet": "greenNeckBullet",
            "damage": 10,
            "speed": 150,
            "dX": 7,
            "gunOffsetX": 50,
            "gunOffsetY": 50
        });
        var gun3 = new Gun({
            "bullet": "greenNeckBullet",
            "damage": 10,
            "speed": 100,
            "dX": 7,
            "gunOffsetX": 50,
            "gunOffsetY": 200
        });
        var guns = [];
        guns.push(gun);
        guns.push(gun2);
        guns.push(gun3);

        var redneck = new Soldier({
            "name": "enemy",
            "offscreenPos": objectPosition,
            "selector": createDivWithClass("boss1"),
            "top": y,
            "onHitImage": "boss1-hit",
            "onDeadImage": "boss1-dead",
            "dX": 5,
            "dY": 0,
            "life": 400,
            "gunX": 0,
            "gunY": 15,
            "guns": guns
        });

        redneck.isFiring = true;
        return redneck;
    }

    return {
        greenNeck: greenNeck,
        box: box,
        platform: platform,
        platform2: platform2,
        boss1: boss1
    };
})();