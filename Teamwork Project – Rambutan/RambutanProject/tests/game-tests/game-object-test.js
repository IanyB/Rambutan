module("GameObject.initialize");
test("Testing constructor correct initializations", function () {
    var objData = {
        "name": "Grass",
        "selector":$("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObj = new GameObject(objData);
    equal(testGameObj.name, objData.name, "Check in name");
    equal(testGameObj.x, objData.left, "Check in direction");
    equal(testGameObj.parent, objData.parent, "Check in parent");
    equal(testGameObj.width, 0, "Check in width");
    equal(testGameObj.height, 0, "Check in height");

});

module("GameObject.move");
test("Testing move() method of gameObject on X and Y", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObj = new GameObject(objData);
    testGameObj.move(-1, -2);
    var expectedNewCordinates = { x: 1, y: 2 };
    equal(testGameObj.x, expectedNewCordinates.x, "Check in X");
    equal(testGameObj.y, expectedNewCordinates.y, "Check in Y");
    equal(testGameObj.div.css("left"), "auto", "Check CSS X");
    equal(testGameObj.div.css("top"), "auto", "Check CSS Y");

});

module("GameObject.move");
test("Testing move() method of gameObject when there is no change", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObj = new GameObject(objData);
    testGameObj.move(0, 0);
    var expectedNewCordinates = { x: 0, y: 0 };
    equal(testGameObj.x, expectedNewCordinates.x, "Check in X");
    equal(testGameObj.y, expectedNewCordinates.y, "Check in Y");
    equal(testGameObj.div.css("left"), "auto", "Check CSS X");
    equal(testGameObj.div.css("top"), "auto", "Check CSS Y");

});

module("GameObject.intersects");
test("Testing intersects() method of two gameObject that intersec on X and Y", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObjFirst = new GameObject(objData);
    testGameObjFirst.width = 10;
    testGameObjFirst.height = 10;
    var testGameObjSecond = new GameObject(objData);
    testGameObjSecond.x = 5;
    testGameObjSecond.y = 5;
    testGameObjSecond.width = 10;
    testGameObjSecond.height = 10;
    var expected = true;
    equal(testGameObjFirst.intersects(testGameObjSecond), expected);
});

module("GameObject.intersects");
test("Testing intersects() method of two gameObject when there is no intersection", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObjFirst = new GameObject(objData);
    testGameObjFirst.width = 10;
    testGameObjFirst.height = 10;
    var testGameObjSecond = new GameObject(objData);
    testGameObjSecond.x = 20;
    testGameObjSecond.y = 20;
    testGameObjSecond.width = 10;
    testGameObjSecond.height = 10;
    var expected = false;
    equal(testGameObjFirst.intersects(testGameObjSecond), expected);
    
});

module("GameObject.intersects");
test("Testing intersects() method of two gameObject when there is intersection only on X", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObjFirst = new GameObject(objData);
    testGameObjFirst.width = 10;
    testGameObjFirst.height = 10;
    var testGameObjSecond = new GameObject(objData);
    testGameObjSecond.x = 10;
    testGameObjSecond.y = 20;
    testGameObjSecond.width = 10;
    testGameObjSecond.height = 10;
    var expected = false;
    equal(testGameObjFirst.intersects(testGameObjSecond), expected);
});

module("GameObject.intersects");
test("Testing intersects() method of two gameObject when there is intersection only on Y", function () {
    var objData = {
        "name": "Grass",
        "selector": $("div"),
        "left": 0,
        "top": 0,
        "align": "bottom",
        "parent": null,
    };
    var testGameObjFirst = new GameObject(objData);
    testGameObjFirst.width = 10;
    testGameObjFirst.height = 10;
    var testGameObjSecond = new GameObject(objData);
    testGameObjSecond.x = 20;
    testGameObjSecond.y = 10;
    testGameObjSecond.width = 10;
    testGameObjSecond.height = 10;
    var expected = false;
    equal(testGameObjFirst.intersects(testGameObjSecond), expected);
});
