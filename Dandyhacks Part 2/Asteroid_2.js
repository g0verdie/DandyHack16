function main() {
    //init Crafty with FPS of 50 and create the canvas element
    Crafty.init();
    Crafty.canvas();
    //Crafty.scene("main");
    //preload the needed assets
    //splice the spritemap
    Crafty.sprite(1, "player.png",
                  {
                  ship: [0,0]
                  });
    Crafty.scene("bg.png", function(){
                 Crafty.load(["player.png"], function() {
                             //start the main scene when loaded
                Crafty.scene("main");
                });
                 Crafty.background("#FFF");

                 });

   
   // Crafty.scene("gameover", function(e) {
        
        //need something here to restart the game
  //  });
    
        //player entity for player 1
        // player 1 will essentially change from red to green
        //player entity for player 1
       var player1 = Crafty.e("2D, Canvas, Controls, Collision, Color, ship, player1")
            player1.attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.9, h: 50, w: 50, radius: 50, start_time: 0, x: Crafty.viewport.width / 2, y: Crafty.viewport.height / 2 })
            player1.color('red')
            player1.bind("keydown", function(e) {
                //on keydown, set the move booleans
                if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.move.right = true;
                } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.move.left = true;
                } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                    this.move.up = true;
                } else if(e.keyCode === Crafty.keys.SPACE) {
                    var d = new Date();
                    this.start_time = d.getTime();
                }
            })
            player1.bind("keyup", function(e) {
                //on key up, set the move booleans to false
                if(e.keyCode === Crafty.keys.RIGHT_ARROW) {
                    this.move.right = false;
                } else if(e.keyCode === Crafty.keys.LEFT_ARROW) {
                    this.move.left = false;
                } else if(e.keyCode === Crafty.keys.UP_ARROW) {
                    this.move.up = false;
                } else if(e.keyCode === Crafty.keys.SPACE) {
                    var time = new Date().getTime();
                    if((time - this.start_time) >= 5000)
                        var charge = 5;
                    
                    else
                    var charge = (time - this.start_time)/1000;
                    
                    Crafty.e("2D, DOM, Color, bullet")
                        .attr({
                            x: this._x+25, 
                            y: this._y, 
                            w: 1.5*charge*50, 
                            h: 1.5*charge*50,
         
                            rotation: this._rotation, 
                            xspeed: 20 * Math.sin(this._rotation / 57.3), 
                            yspeed: 20 * Math.cos(this._rotation / 57.3),
                            
                        
                            
                        })
                        //Crafty.audio.play("shoot");
                        .color('red')
                        .bind("enterframe", function() {    
                            this.x += this.xspeed;
                            this.y -= this.yspeed;
                            
                            //destroy if it goes out of bounds
                            if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
                                this.destroy();
                            }
                        });
                }
                
                
            })
            player1.bind("enterframe", function() {
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
              
            })
            player1.collision()
            //.checkHits('player1')
            //.ignoreHits('player1')
            var cols = 0;
                //var red = 0;
                //var green = 0;
                //var blue = 0;
            player1.onHit("bullet", function(e) {
                //player1.checkHits('player1')
                    

              
              //this.color()>>8
            //basically the bullet is color A and hits ship B and changes the color to ship A
            //bullets are based on ship A 
            //red to green
              //  if(e.color() != 'red'){
                    /*
                if(e.color() === "#FF0000" && this.start_color === "#00FF00") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                        //red to blue
                } else if(e.color === "#FF0000" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                */
                //green to red

                               /*   
                              var color2 = 35

                              while('green' < 255)

                {
                              green += stepSize;

                              if('green' > 255) { 'green' = 255; }

                              player2.color('red', 'green', 0)
                             //output(red, green, 0); //assume output is function that takes RGB
                }

                              while(red > 0)
                {
                              red -= stepSize;

                              if(red < 0) { red = 0; }

                              //output(red, green, 0); //assume output is function that takes RGB
                }*/

                


                var color1 = ["#FF4500", "#FF4500", "#FF8C00", "#FFFF00", "#FFFACD", "#F5F5DC","#FFE4B5", "#EEE8AA", "#E6E6FA", "#FF00FF", "#DA70D6", "#9370DB", "#00FF00"];

                
                  //player1.color() = e.color();
                  
                  player1.color(color1[cols])
                  
                  console.log("The color is "+cols); 
                  cols++;
                //player1.ignoreHits('player1')
                   //player1.color("#000000") 
                   //this.color() + ("#010000" - "#000001") * e.radius;
               
             
                /*
                //green to blue
                else if(e.color === "#00FF00" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                */
                //blue to red
                /*if(e.color() === "#0000FF") 
                {
                    this.color() = this.color() + ("#010000" - "#000001") * e.radius;
                }*/
                /*
                //blue to green
                else (e.color === "#0000FF" && this.color === "#00FF00") 
                { 
                    this.color = this.color + ("#010000" - "#000001") * e.radius;
                }
                */
                //if(this.color() === e.color()){
                  //     Crafty.scene("end");
               // }

                //this.xspeed = this.xspeed - .1*e.xspeed;
                //this.yspeed = this.yspeed - .1*e.yspeed;
                //e[0].obj.destroy();
            //} else {
              //  e[0].obj.destroy();
            //}
                
            });/*
                player2.onHit("player2", function(e) {

                    // the color is green             
                    var diff2 = "#00FF00" - (this.color1()<<2);
                    this.color1() += (.2*diff2) >> 4;

                    if(e.color1() === "blue") {
                        this.color1() -= (.2*diff2) << 8;
                    }
                    //else {
                    //    this.color1() -= .2*diff2;
                    //}
                
                /*
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
                */
         //       this.xspeed = this.xspeed - e.xspeed;
       //         this.yspeed = this.yspeed - e.yspeed;
     //       });



///////////////////////////PLAYER 2////////////////////////////////////////////////////////////////////////////////////


        //player entity for player 2
       var player2 = Crafty.e("2D, Canvas, Controls, Collision, Color, ship, player2")
            player2.attr({move: {left: false, right: false, up: false, down: false}, xspeed: 0, yspeed: 0, decay: 0.9, h: 50, w: 50, radius: 50, start_time: 0, x: Crafty.viewport.width / 4, y: Crafty.viewport.height / 4 })
            player2.color('green')
            player2.bind("keydown", function(e) {
                //on keydown, set the move booleans
                if(e.keyCode === Crafty.keys.A) {
                    this.move.right = true;
                } else if(e.keyCode === Crafty.keys.D) {
                    this.move.left = true;
                } else if(e.keyCode === Crafty.keys.W) {
                    this.move.up = true;
                } else if(e.keyCode === Crafty.keys.S) {
                    var d = new Date();
                    this.start_time = d.getTime();
                }
            })
            player2.bind("keyup", function(e) {
                //on key up, set the move booleans to false
                if(e.keyCode === Crafty.keys.A) {
                    this.move.right = false;
                } else if(e.keyCode === Crafty.keys.D) {
                    this.move.left = false;
                } else if(e.keyCode === Crafty.keys.W) {
                    this.move.up = false;
                } else if(e.keyCode === Crafty.keys.S) {
                    var time = new Date().getTime();
                    if((time - this.start_time) >= 5000)
                        var charge = 5;
                    
                    else
                    var charge = (time - this.start_time)/1000;
                    
                    Crafty.e("2D, DOM, Color, bullet")
                        .attr({
                            x: this._x+25, 
                            y: this._y, 
                            w: 1.5*charge*50, 
                            h: 1.5*charge*50,
         
                            rotation: this._rotation, 
                            xspeed: 20 * Math.sin(this._rotation / 57.3), 
                            yspeed: 20 * Math.cos(this._rotation / 57.3),
                            
                        
                            
                        })
                        .color('green')
                        .bind("enterframe", function() {    
                            this.x += this.xspeed;
                            this.y -= this.yspeed;
                            
                            //destroy if it goes out of bounds
                            if(this._x > Crafty.viewport.width || this._x < 0 || this._y > Crafty.viewport.height || this._y < 0) {
                                this.destroy();
                            }
                        });
                }
                
                
            })
            player2.bind("enterframe", function() {
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
              
            })
            player2.collision()
            //.checkHits('player2')
            
            var hits = 0;
                //var red = 0;
                //var green = 0;
                //var blue = 0;
            player2.onHit("bullet", function(e) {
              
              this.color()<<8
            //basically the bullet is color A and hits ship B and changes the color to ship A
            //bullets are based on ship A 
            //red to green
              //  if(e.color() != 'red'){
                    /*
                if(e.color() === "#FF0000" && this.start_color === "#00FF00") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                        //red to blue
                } else if(e.color === "#FF0000" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                */
                //green to red

                               /*   
                              var color2 = 35

                              while('green' < 255)

                {
                              green += stepSize;

                              if('green' > 255) { 'green' = 255; }

                              player2.color('red', 'green', 0)
                             //output(red, green, 0); //assume output is function that takes RGB
                }

                              while(red > 0)
                {
                              red -= stepSize;

                              if(red < 0) { red = 0; }

                              //output(red, green, 0); //assume output is function that takes RGB
                }*/

                


                var color2 = ["#0ff000", "32CD32", "#90EE90", "#9aff9a", "#9bcd9b","#838b83","#00fa9a", "#458b74", "#7fffd4", "#20b2aa", "#03A89e", "#800080", "#00ff00","#ff0000"];

                
                  //player1.color() = e.color();
                  
                  player2.color("rgb(255, 0, 0)")
                  
                  console.log("The color is "+hits); 
                  //hits++;
                   //player1.color("#000000") 
                   //this.color() + ("#010000" - "#000001") * e.radius;
               
                    //Crafty.scene("main");
                /*
                //green to blue
                else if(e.color === "#00FF00" && this.color === "#0000FF") 
                {
                    this.color = this.color + ("#010000" - "#000001") * e.radius;

                }
                */
                //blue to red
                /*if(e.color() === "#0000FF") 
                {
                    this.color() = this.color() + ("#010000" - "#000001") * e.radius;
                }*/
                /*
                //blue to green
                else (e.color === "#0000FF" && this.color === "#00FF00") 
                { 
                    this.color = this.color + ("#010000" - "#000001") * e.radius;
                }
                */
                //if(this.color() === e.color()){
                  //     Crafty.scene("end");
               // }

                //this.xspeed = this.xspeed - .1*e.xspeed;
                //this.yspeed = this.yspeed - .1*e.yspeed;
                //e[0].obj.destroy();
            //} else {
              //  e[0].obj.destroy();
            //}
            //player2.ignoreHits('player1')

            });/*
                player2.onHit("player2", function(e) {

                    // the color is green             
                    var diff2 = "#00FF00" - (this.color1()<<2);
                    this.color1() += (.2*diff2) >> 4;

                    if(e.color1() === "blue") {
                        this.color1() -= (.2*diff2) << 8;
                    }
                    //else {
                    //    this.color1() -= .2*diff2;
                    //}
                
                /*
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
                */
         //       this.xspeed = this.xspeed - e.xspeed;
       //         this.yspeed = this.yspeed - e.yspeed;
     //       });
            
    };
