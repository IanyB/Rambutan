var Timer = Class.create(GameObject, {
    initialize: function ($super, objectData) {
        $super(objectData);
        this.storage = $.localStorage;
        this.seconds = 0;
        this.minutes = 0;
        this.timer = null;
        this.timerIsOn = false;
        this.load();
    },

    start: function () {
        if (!this.timerIsOn) {
            var self = this;
            this.timerIsOn = true;
            this.timer = setInterval(function () {
                self.seconds++;
                if (self.seconds === 60) {
                    self.seconds = 0;
                    self.minutes++;
                }

                self.div.html(self.getTime());
                if (self.seconds % 5 === 0) {
                    self.save();
                }
            }, 1000);
        }
    },

    stop: function () {
        if (this.timerIsOn) {
            this.timerIsOn = false;
            clearInterval(this.timer);
            this.save();
        }
    },

    save: function () {
        this.storage.set("timer", {
            "seconds": this.seconds,
            "minutes": this.minutes
        });
    },

    load: function () {
        if (!this.storage.isEmpty("timer")) {
            var time = this.storage.get("timer");
            this.seconds = time.seconds;
            this.minutes = time.minutes;
            this.div.html(this.getTime());
        }
    },

    getTime: function () {
        return this.minutes + ":" + this.seconds;
    }
});