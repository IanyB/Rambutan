var gen = objectGenerator;

var i = 0;

var boxH = 80;
var boxW = 79;
var platW = 300;
var elmts = [];
elmts.push(gen.box(110, 500));
elmts.push(gen.box(130, 500 - boxH));
elmts.push(gen.box(110 + boxW, 500));
elmts.push(gen.platform(200, 200));
elmts.push(gen.platform2(200, 200));
elmts.push(gen.greenNeck(300, 140));
elmts.push(gen.box(300, 500));
elmts.push(gen.box(300 + boxW, 500));
elmts.push(gen.platform(600, 200));
elmts.push(gen.platform2(600, 200));
elmts.push(gen.greenNeck(650, 240));
elmts.push(gen.box(800, 500));
elmts.push(gen.box(800 + boxW, 500 - boxH));
elmts.push(gen.box(800 + boxW, 500));
elmts.push(gen.box(1100, 500));
elmts.push(gen.box(1100 + boxW, 500 - boxH));
elmts.push(gen.box(1100 + boxW, 500));
elmts.push(gen.greenNeck(1130, 200));
elmts.push(gen.box(1100 + boxW + boxW, 500));

elmts.push(gen.box(1300, 500));
elmts.push(gen.box(1300 + boxW, 500 - boxH));
elmts.push(gen.box(1300 + boxW, 500));
elmts.push(gen.platform(1450, 250));
elmts.push(gen.platform2(1450, 250));
elmts.push(gen.greenNeck(1500, 450));
elmts.push(gen.greenNeck(1580, 450));
elmts.push(gen.greenNeck(1620, 450));
elmts.push(gen.greenNeck(1700, 450));
elmts.push(gen.platform(1850, 150));
elmts.push(gen.platform2(1850, 150));
elmts.push(gen.box(1950, 500));
elmts.push(gen.box(1950, 500 - boxH));
elmts.push(gen.platform(2150, 200));
elmts.push(gen.platform2(2150, 200));
elmts.push(gen.box(2200, 500));
elmts.push(gen.greenNeck(2350, 400));
elmts.push(gen.box(2400, 500));
elmts.push(gen.greenNeck(2550, 400));
elmts.push(gen.box(2600, 500));
elmts.push(gen.platform(2600, 200));
elmts.push(gen.platform2(2600, 200));
elmts.push(gen.greenNeck(2750, 400));
elmts.push(gen.box(2800, 500));

elmts.push(gen.platform(2950, 150));
elmts.push(gen.platform2(2950, 150));
elmts.push(gen.greenNeck(3100, 50));

elmts.push(gen.boss1(4100, 500));

for (var i = 0; i < elmts.length; i++) {
    elmts[i].offscreenPos += 980;
}

var _level1 = new Level({
    "name": "level 1",
    "backgrounds": null,
    "length": 10000,
    "objects": elmts
});