var Soldier = Class.create(GameObject, {
    initialize: function ($super, objectData) {
        $super(objectData);
        this.guns = objectData.guns;
        this.currentGun = 0;
        this.isFiring = objectData.isFiring || false;
        this.gunX = objectData.gunX;
        this.gunY = objectData.gunY;
        this.life = objectData.life || 100;
        this.onGround = false;
        this.jumpHeight = 25;
        this.walkCount = 0;
        this.movingUp = false;
        this.jumping = false;
        this.falling = false;
        this.points = objectData.points || 50;
        this.groundY = objectData.groundY || 0;
        this.currentPlatform = null;
        this.onHitImage = objectData.onHitImage || null;
        this.onDeadImage = objectData.onDeadImage || null;
    },

    feet: function () {
        return this.x + this.height;
    },

    fire: function () {
        var self = this;
        var _bullets = [];
        var _bullet = null;
        for (var i = 0; i < self.guns.length; i++) {
            _bullet = self.guns[i].fire(self.x + self.gunX, self.y + self.gunY, self.name, self);
            if (_bullet != null) {
                _bullets.push(_bullet);
            }
        }

        return _bullets;
    },

    bulletHit: function (bullet) {
        var self = this;
        this.life -= bullet.damage;
        var blood = $(document.createElement("div")).addClass("blood");
        if (this.onHitImage != null) {
            self.div.addClass(this.onHitImage);
            setTimeout(function () {
                self.div.removeClass(self.onHitImage);
                if (self.life <= 0) {
                    self.width = 0;
                    self.height = 80;
                    self.isFiring = false;
                    setTimeout(function () {
                        self.div.addClass(self.onDeadImage);
                    }, 20);
                }
            }, 300);
        }

        if (bullet.name == "enemy") {
            blood.css({ left: bullet.x - 50 });
            blood.css({ top: bullet.y - 15 });
            this.changeBG("hit");
        }
        else {
            blood.css({ left: bullet.x });
            this.move(-20, 0);
        }
        blood.css({ top: bullet.y });
        this.parent.append(blood);
        blood.fadeOut(300);

        setTimeout(function () {
            blood.remove();
        }, 1000);
    },

    update: function (bullets) {
        var self = this;
        if (self.currentPlatform != null) {
            if (!self.intersects(self.currentPlatform, 0, -1) && self.jumping == false && self.falling == false) {
                self.onGround = false;
                self.fall();
                self.currentPlatform = null;
            }
        }

        if (self.isFiring == true) {
            var bullet = self.fire();
            if (bullet != null) {
                for (var i = 0; i < bullet.length; i++) {
                    bullets.push(bullet[i]);
                }
            }
        }
    },

    stepOn: function (groundObject, offset) {
        offset = offset || 0;
        this.move(0, -(groundObject.y - this.y - this.height) + offset);
        this.currentPlatform = groundObject;
        this.onGround = true;
    },

    changeBG: function (action) {
        if (action == "move" && this.walkCount == 0) {
            this.moveBG.push(this.moveBG[0]);
            this.div.css("background", this.moveBG[0]);
            this.moveBG.shift();
        }
        else if (action == "stand") {
            this.div.css("background", "url(../images/hero/standing.png)");
        }
        else if (action == "firing") {
            this.div.css("background", "url(../images/hero/firing.png)");
        }
        else if (action == "hit") {
            this.div.css("background", "url(../images/hero/hit.png)");
        }
        else if (action == "dead") {
            this.div.css("background", "url(../images/hero/dead.png)");
        }

        this.walkCount++;
        if (this.walkCount == 3) {
            this.walkCount = 0;
        }
    },

    jump: function () {
        var self = this;
        if (self.onGround != true) {
            return;
        }
        self.jumping = true;
        self.onGround = false;
        var stepsCount = 0;
        var jumpInterval = window.setInterval(function () {
            if (self.jumping == false || stepsCount > self.jumpHeight) {
                self.jumping = false;
                self.fall();
                window.clearInterval(jumpInterval);
                return;
            }
            self.move(0, 5);
            stepsCount++;
        }, 10);
    },

    fall: function () {
        var self = this;
        self.falling = true;
        var fallInterval = window.setInterval(function () {
            if (self.onGround == true) {
                self.falling = false;
                window.clearInterval(fallInterval);
                return;
            }
            if (self.y >= self.groundY - self.height) {
                self.y = self.groundY - self.height;
                self.onGround = true;
                self.falling = false;
                window.clearInterval(fallInterval);
                return;
            }

            self.move(0.01, -5);
        }, 7);
    }
});