var Bullet = Class.create(GameObject, {
    initialize: function ($super, objectData) {
        $super(objectData);
        this.damage = objectData.damage;
    }
});