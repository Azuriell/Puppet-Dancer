export let inputs = {
    _pressed: {},

    Q: 81,
    Z: 90,
    D: 68,
    S: 83,
    SPACEBAR: 32,

    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13,

    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    
    onKeyDown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    
    onKeyUp: function(event) {
        delete this._pressed[event.keyCode];

    }
};

window.addEventListener('keyup', function(event) { inputs.onKeyUp(event); }, false);
window.addEventListener('keydown', function(event) { inputs.onKeyDown(event); }, false);