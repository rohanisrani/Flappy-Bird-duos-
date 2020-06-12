//https://docs.google.com/document/u/1/d/1cjYyt9cTAmQo0P9Hq0E7E86XCyiUN0-fcfRhO2YJYKM/edit?usp=drive_open&ouid=109630988523177933972


// Specifies resources
let resources = {images:[
                    {id:"bk", src:"images/background.jpg"},
                    {id:"copter", src:"images/copter.png"},
                    {id:"scopter", src:"images/scopter.png"},
                    {id:"heart", src:"images/heart.png"},
                    {id:"s", src:"images/Copter.png"},
                    {id:"go", src:"images/go.png"},
                    {id:"ft", src:"images/ft.png"}
                  
                  ],
                 audios:[
                
                  ]
                };

// Load resources and starts the game loop
function preload(){
    game = new Game("game");
    game.preload(resources);
    game.state = init;
    gameloop();
}
document.onload = preload();

// Controls the state of the game
function gameloop(){
  game.processInput()
  if(game.ready){
    game.state();
  }
  game.update()
  setTimeout(gameloop,20);
}

// Create game objects and perform any game initialization
function init(){

  //bk
  bk = new Sprite(game.images.bk, game)
  game.setBackground(bk)

  //copter
  copter = new Animation(game.images.copter, 9, game, 1728/9, 192)
  copter.scale=0.45
  copter.moveTo(100, game.height/2)

  //ft
  ft = new Animation(game.images.ft, 9, game, 1000/5, 400/2)
  ft.scale=0.8
  ft.setVector(3,90)
  ft.y = randint(175,325)
  ft.x = game.width + 50

  //font
  f = new Font("30px", "Comic Sans MS", "brown", "black")

  //heart
  heart = new Animation(game.images.heart, 12, game, 2500/5, 1500/3)
  heart.scale=0.2

  //startscreen
  s = new Sprite(game.images.s, game)
  game.state = ss;
  scopter = new Animation(game.images.scopter, 9, game, 1728/9, 192)
  scopter.scale=0.45

  //gameover startscreen
  go=new Sprite(game.images.go,game)

}

function ss(){
  game.scrollBackground("left",1)
  s.draw(game.width/2, game.height/2-100)
  scopter.draw()
  game.drawText( `Press [SPACE] to begin`, game.width/2 - 140, game.height - 50, f)
  
  if(key.pressed[key.space]){
    game.state = main;
  }
  
}

// Game logic
function main(){
game.scrollBackground("left", 1)
copter.draw()
ft.move()
heart.draw(40,game.height-40)
//health
game.drawText( `x ${copter.health}`, 70, game.height-25, f)

if(key.pressed[key.space]){
    copter.y -= 2
  }else{
    copter.y += 2 
  }

if(copter.collidedWith(ft)){
    copter.health -= 10
    ft.visible = false
  }

 if(ft.x < 0 || copter.collidedWith(ft)){
    ft.x = game.width + 50
    ft.y = randint(175,325)
    ft.speed += 1
    ft.visible = true
  }


 if(copter.y >= game.height || copter.y <= 0 ){
    game.state = gO;
  }


  if(ft.speed > 13){
    ft.visible = false
    game.state = lvl2;
    
  }

 
}


function lvl2(){
  game.scrollBackground("left", 1)
  copter.draw();
}

function gO(){
  go.draw()
}