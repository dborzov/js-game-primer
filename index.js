// Defining Game object: constructor
Game = function(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.screen = this.canvas.getContext("2d");
    var self = this;
    
    this.enemies = [];
    for (var i=0; i <10; i++) {
        var newEnemy = new Enemy(this, {
            x: Math.random()* this.canvas.width, 
            y: Math.random()* this.canvas.height,
            speedX: 2*Math.random() - 1.0,
            speedY: 2*Math.random() - 1.0
        });
        this.enemies.push(newEnemy);
    }

    tick = function() {
        self.update();
        self.draw();
        requestAnimationFrame(tick);
    };
    tick();
};

// Defining Game Object: all the attributes 
Game.prototype = {
    update: function() {
        for (var i=0; i<this.enemies.length; i++) {
            this.enemies[i].update();
        }
    },
    draw: function() {       
        this.screen.fillStyle = "rgba(21, 235, 110, 1)";
        this.screen.fillRect(0,0,this.canvas.width,this.canvas.height);
        for (var i=0; i<this.enemies.length; i++) {
            this.enemies[i].draw();
        }
    }
};


// Defining Enemies: constructor
Enemy = function(game, props) {
    this.game = game;
    this.size = {x: 15, y: 15};
    this.position = props;
};
// Defining Enemies: attributes
Enemy.prototype = {
    update: function() {
        this.position.x += this.position.speedX;
        this.position.y += this.position.speedY;
        if (this.position.x > this.game.canvas.width) {
            this.position.x = 0;
        }
        
        if (this.position.x < 0) {
            this.position.x = this.game.canvas.width;
        }
        
        if (this.position.y > this.game.canvas.height) {
            this.position.y = 0;
        } 
        
        if (this.position.y < 0) {
            this.position.y = this.game.canvas.height;
        }
    },
    draw: function() {
        this.game.screen.fillStyle="rgba(240,30,10,1)";
        this.game.screen.fillRect(this.position.x, 
                                  this.position.y, 
                                  10, 
                                  10);
    }
};

window.onload = function() {
    game = new Game("gamefield");
};
