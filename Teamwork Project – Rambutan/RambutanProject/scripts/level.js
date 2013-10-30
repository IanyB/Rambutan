var Level = Class.create({
    initialize: function (levelData) {
        levelData = levelData || {};
        this.name = levelData.name || null;
        this.backgrounds = levelData.backgrounds;
        this.length = levelData.length;
        this.objects = levelData.objects || [];
    },

    getObjectsOnScreen: function (globalCoordinates) {
        var objectsOnScreen = [];
        for (var i = 0, len = this.objects.length; i < len; i++) {
            if (this.objects[i] != undefined) {
                if (this.objects[i].offscreenPos > globalCoordinates) {
                    break;
                }

                objectsOnScreen.push(this.objects.shift());
            }
        }

        return objectsOnScreen;
    }
});
