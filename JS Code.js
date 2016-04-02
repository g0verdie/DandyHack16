$(document).ready(function() {
    //init Crafty with FPS of 50 and create the canvas element
    Crafty.init();
    Crafty.canvas();
    //Crafty.scene("main");
    //preload the needed assets
    /*
    Crafty.load(["player.png"], function() {
        //splice the spritemap
        Crafty.sprite("player.png", 
        {
            ship: [0,0]
        });
        
        //start the main scene when loaded
        
    });
    */
   Crafty.scene("main");
   // Crafty.scene("gameover", function(e) {
        
        //need something here to restart the game
  //  });
    
    
    //Craty.scene("start" function() {
    
    //});
    
    
    Crafty.scene("main", function() {
        Crafty.background('#ffffff');

        /*
        //score display
        var score = Crafty.e("2D, DOM, Text")
            .text("Score: 0")
            .attr({x: Crafty.viewport.width - 300, y: Crafty.viewport.height - 50, w: 200, h:50})
            .css({color: "#fff"});
         */
        //player entity for player 1
       var player1 = Crafty.e("2D, Canvas, Controls, Collision, Color, circle, player")
            .attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.9, radius: 50, start_time: 0, x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2, start_color: "#ff0000", color: "#ff0000"})
            .bind("keydown", function(e) {
                //on keydown, set the move booleans
                if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.move.right = true;
                } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.move.left = true;
                } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                    this.move.up = true;
                } else if(e.keyCode === Crafty.keys.L) {
                    this.start_time = Date.getTime();
                }
            }).bind("keyup", function(e) {
                //on key up, set the move booleans to false
                if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.move.right = false;
                } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.move.left = false;
                } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                    this.move.up = false;
                } else if(e.keyCode === Crafty.keys.L) {
                    var charge = Date.getTime() - this.start_time;
                    var self = this;
                    Crafty.e("2D, DOM, Color, circle, bullet")
                        .attr({
                            x: this._x, 
                            y: this._y, 
                            w: 2, 
                            h: 5, 
                            rotation: this._rotation, 
                            xspeed: 20 * Math.sin(this._rotation / 57.3), 
                            yspeed: 20 * Math.cos(this._rotation / 57.3),
                            color: this._start_color,
                            parent: self
                            
                        })
                        .radius = function(){
                            if(charge < 5000) {
                                (charge/1000) * 2;
                            } else {
                                5 * 2;
                            }
                        }
                        .bind("enterframe", function() {    
                            this.x += this.xspeed;
                            this.y -= this.yspeed;
                            
                            //destroy if it goes out of bounds
                            if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
                                this.destroy();
                            }
                        });
                }
                
                
            }).bind("enterframe", function() {
                if(this.move.right) this.rotation += 5;
                if(this.move.left) this.rotation -= 5;
                
                //acceleration and movement vector
                var vx = Math.sin(this._rotation * Math.PI / 180) * 0.3,
                    vy = Math.cos(this._rotation * Math.PI / 180) * 0.3;
                
                //if the move up is true, increment the y/xspeeds
                if(this.move.up) {
                    this.yspeed -= vy;
                    this.xspeed += vx;
                } else {
                    //if released, slow down the ship
                    this.xspeed *= this.decay;
                    this.yspeed *= this.decay;
                }
                
                //move the ship by the x and y speeds or movement vector
                this.x += this.xspeed;
                this.y += this.yspeed;
                
                //if ship goes out of bounds, put him back
                if(this._x > Crafty.viewport.width) {
                    this.x = -64;
                }
                if(this._x < -64) {
                    this.x =  Crafty.viewport.width;
                }
                if(this._y > Crafty.viewport.height) {
                    this.y = -64;
                }
                if(this._y < -64) {
                    this.y = Crafty.viewport.height;
                }
                /*
                //if all asteroids are gone, start again with more
                if(asteroidCount <= 0) {
                    initRocks(lastCount, lastCount * 2);
                }
                */
            }).collision()
            .onHit("bullet", function(e) {
            //basically the bullet is color A and hits ship B and changes the color to ship A
            //bullets are based on ship A 
            //red to green
                if(e.color === "#FF0000" && this.start_color === "#00FF00") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                        //red to blue
                } else if(e.color === "#FF0000" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                //green to red
                else if(e.color === "#00FF00" && this.color === "#FF0000") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                
                //green to blue
                else if(e.color === "#00FF00" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                
                //blue to red
                else if(e.color === "#0000FF" && this.color === "#FF0000") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;
                }
                
                //blue to green
                else (e.color === "#0000FF" && this.color === "#00FF00") 
                { 
                    this.color = this.color + ("#010000" - "#000001") * e.radius;
                }
                if(this.color === e.parent.start_color){
                       Crafty.scene("end");
                }
                this.xspeed = this.xspeed - .1*e.xspeed;
                this.yspeed = this.yspeed - .1*e.yspeed;
                e[0].obj.destroy();
                
            }).onHit("player", function(e) {
                if(this.start_color === "red") {
                    var diff = (this.start_color>>4) - (this.color>>4);
                    this.color += (.2*diff) << 4;
                    if(e.start_color === "green") {
                        this.color -= (.2*diff) << 2;
                    }
                    else {
                        this.color -= .2*diff;
                    }
                }
                else if(this.start_color == "green") {
                    var diff = ((this.start_color >> 8) & "#FF") - (((this.color << 8) >> 16) & "#FF");
                    this.color += (.2*diff) << 8;
                    if(e.start_color == "red") {
                        this.color -= (.2*diff) << 16;
                    }
                    else if(e.start_color == "blue") {
                        this.color -= .2*diff;
                    }
                }
                else {
                    var diff = this.start_color - (((this.color << 16) >> 16) & "#FF");
                    this.color += .2*diff;
                    if(e.start_color == "red")
                    {
                        this.color -= (.2*diff) << 16;
                    }
                    else if(e.start_color == "green") {
                        this.color -= (.2*diff) << 16;
                    }
                }
                this.xspeed = this.xspeed - e.xspeed;
                this.yspeed = this.yspeed - e.yspeed;
            });
            
        
        /*
        //keep a count of asteroids
        var asteroidCount,
            lastCount;     
        //Asteroid component
        Crafty.c("asteroid", {
            init: function() {
                this.origin("center");
                this.attr({
                    x: Crafty.randRange(0, Crafty.viewport.width), //give it random positions, rotation and speed
                    x: Crafty.randRange(0, Crafty.viewport.height),
                    xspeed: Crafty.randRange(1, 5), 
                    yspeed: Crafty.randRange(1, 5), 
                    rspeed: Crafty.randRange(-5, 5)
                }).bind("enterframe", function() {
                    this.x += this.xspeed;
                    this.y += this.yspeed;
                    this.rotation += this.rspeed;
                    
                    if(this._x > Crafty.viewport.width) {
                        this.x = -64;
                    }
                    if(this._x < -64) {
                        this.x =  Crafty.viewport.width;
                    }
                    if(this._y > Crafty.viewport.height) {
                        this.y = -64;
                    }
                    if(this._y < -64) {
                        this.y = Crafty.viewport.height;
                    }
                }).collision()
                .onHit("bullet", function(e) {
                    //if hit by a bullet increment the score
                    player.score += 5;
                    score.text("Score: "+player.score);
                    e[0].obj.destroy(); //destroy the bullet
                    
                    var size;
                    //decide what size to make the asteroid
                    if(this.has("big")) {
                        this.removeComponent("big").addComponent("medium");
                        size = "medium";
                    } else if(this.has("medium")) {
                        this.removeComponent("medium").addComponent("small");
                        size = "small";
                    } else if(this.has("small")) { //if the lowest size, delete self
                        asteroidCount--;
                        this.destroy();
                        return;
                    }
                    
                    var oldxspeed = this.xspeed;
                    this.xspeed = -this.yspeed;
                    this.yspeed = oldxspeed;
                    
                    asteroidCount++;
                    //split into two asteroids by creating another asteroid
                    Crafty.e("2D, DOM, "+size+", Collision, asteroid").attr({x: this._x, y: this._y});
                });
                
            }
        });
        */
        
        //function to fill the screen with asteroids by a random amount
        /*
        function initRocks(lower, upper) {
            var rocks = Crafty.randRange(lower, upper);
            asteroidCount = rocks;
            lastCount = rocks;
            
            for(var i = 0; i < rocks; i++) {
                Crafty.e("2D, DOM, big, Collision, asteroid");
            }
        } */
        
        //first level has between 1 and 10 asteroids
        //initRocks(1, 10);
    });
    
});