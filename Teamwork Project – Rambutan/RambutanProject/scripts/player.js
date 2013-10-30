var Player = Class.create(Soldier, {
    initialize: function ($super, objectData) {
        $super(objectData);
        this.moveBG = [
            'url("../images/hero/walk2.png")',
            'url("../images/hero/walk4.png")',
            'url("../images/hero/walk1.png")',
            'url("../images/hero/walk4.png")'
        ];
    }
});