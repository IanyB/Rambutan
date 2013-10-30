var GameObject = Class.create({
    initialize: function (objectData) {
        objectData = objectData || {};
        this.name = objectData.name || null;
        this.div = objectData.selector;
        this.x = objectData.left || 0;
        this.y = objectData.top || 0;
        this.height = 0;
        this.width = 0;
        this.dX = objectData.dX || 0;
        this.dY = objectData.dY || 0;
        this.offscreenPos = objectData.offscreenPos || 0;
        this.parent = objectData.parent || null;
        if (objectData.parent != null) {
            this.append(objectData.parent, objectData.align);
        }
    },

    append: function (parent, align) {
        parent.append(this.div);
        this.height = this.div.outerHeight();
        this.width = this.div.outerWidth();
        if (!align) {
            this.move(0, 0);
        }
        else {
            this.move(0, this.height);
        }
    },

    remove: function () {
        this.div.remove();
    },

    move: function (dX, dY) {
        dX = dX || this.dX;
        dY = dY || this.dY;
        this.x = this.x - dX;
        this.y = this.y - dY;
        this.div.css('left', this.x);
        this.div.css('top', this.y);
    },

    show: function (time) {
        time = time || 0;
        this.div.show(time);
    },

    hide: function (time) {
        time = time || 0;
        this.div.hide(time);
    },

    intersects: function (obj, offsetX, offsetY) {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        if (this.x + this.width <= obj.x + offsetX || obj.x + obj.width <= this.x ||
                this.y + this.height <= obj.y + offsetY || obj.y + obj.height + offsetY <= this.y) {
            return false;
        }
        else {
            return true;
        }
    },

    update: function(){
    },

    offsetY: function (obj) {
        return this.y + this.height - obj.y;
    },

    offsetX: function (obj) {
        return this.x + this.width - obj.x;
    }
});
