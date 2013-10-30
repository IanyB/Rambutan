var Gun = Class.create({
    initialize: function (gunData) {
        gunData = gunData || {};
        this.damage = gunData.damage;
        this.bullet = gunData.bullet;
        this.speed = gunData.speed;
        this.parent = gunData.parent;
        this.timeInterval = this.speed;
        this.direction = gunData.direction || 1;
        this.dX = gunData.dX || -5;
        this.dY = gunData.dY || 0;
        this.gunOffsetX = gunData.gunOffsetX || 0;
        this.gunOffsetY = gunData.gunOffsetY || 0;
    },

    fire: function (posX, posY, name, soldier) {
        var newBullet = null;
        if (this.timeInterval == this.speed) {
            var self = this;
            var bulletDiv = $(document.createElement("div")).addClass(self.bullet);
            var bullet = new Bullet({
                "name": name,
                "selector": bulletDiv,
                "parent": self.parent,
                "left": posX - this.gunOffsetX,
                "top": posY + this.gunOffsetY,
                "dX": this.dX * this.direction ,
                "dY": this.dY ,
                "damage": this.damage
            });
            newBullet = bullet;

            if (soldier.name == "player") {
                var off = 3;
            }
            else {
                var off = -3;
            }
            soldier.move(off, 0);
            setTimeout(function () {
                soldier.move(-off, 0);
            }, 60);
        }

        this.timeInterval--;

        if (this.timeInterval == 0) {
            this.timeInterval = this.speed;
        }

        return newBullet;
    }
});