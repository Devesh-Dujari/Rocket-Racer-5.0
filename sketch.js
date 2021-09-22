//Declaring variables.
var backgroundImg;

var rocket, rocketImg;
var space, spaceImg;
var comet, cometImg, cometGroup;
var bronzeCoin, bronzeCoinImg, bronzeCoinGroup;
var silverCoin, silverCoinImg, silverCoinGroup;
var goldCoin, goldCoinImg, goldCoinGroup;
var weapon, weaponImg, weaponGroup;
var fuel, fuelImg, fuelGroup;

var gameOver, gameOverImg;
var restart, restartImg;
var play, playImg;
var line1, line2, line3,line4;
var home, homeImg;
var win, winImg;

var gameState = "4";
var distance = 0;
var coinCount = 0;
var deaths = 0;
var weaponCount = 10;
var fuelCount = 100;

function preload() {
  //Loading images in variables.
  backgroundImg = loadImage("images/rocketRacer.jpg");

  rocketImg = loadImage("images/rocket.png");
  spaceImg = loadImage("images/space.jpg");

  cometImg = loadImage("images/comet.png");
  bronzeCoinImg = loadImage("images/bronzeCoin.png");
  silverCoinImg = loadImage("images/silverCoin.png");
  goldCoinImg = loadImage("images/goldCoin.png");
  weaponImg = loadImage("images/weapon.png");
  fuelImg = loadImage("images/fuel.png");

  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  playImg = loadImage("images/play.png");
  homeImg = loadImage("images/home.png");
  winImg = loadImage("images/win.png");
}

function setup() {
  createCanvas(400, 500);

  //Creating space.
  space = createSprite(200, 150, 20, 20);
  space.addImage(spaceImg);
  space.scale = 0.86;
  space.velocityY = 8;

  rocket = createSprite(200, 380, 20, 20);
  rocket.addImage(rocketImg);
  rocket.scale = 0.125;
  //rocket.debug=true;
  rocket.setCollider("rectangle", 0, -200, 400, 600);

  line1 = createSprite(10, 55, 2, 20);
  line1.visible = false;

  line2 = createSprite(390, 55, 2, 20);
  line2.visible = false;

  line3 = createSprite(200, 64, 380, 2);
  line3.visible = false;

  line4 = createSprite(200, 70, 2, 10);
  line4.visible = false;

  play = createSprite(200, 400, 10, 10);
  play.addImage(playImg);
  play.scale = 0.3;
  play.visible = false;

  gameOver = createSprite(200, 180, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.35;
  gameOver.visible = false;

  restart = createSprite(150, 260, 10, 10);
  restart.addImage(restartImg);
  restart.scale = 0.15;
  restart.visible = false;

  home = createSprite(250, 260, 10, 10);
  home.addImage(homeImg);
  home.scale = 0.175;
  home.visible = false;

  win = createSprite(200, 180, 10, 10);
  win.addImage(winImg);
  win.scale = 0.3
  win.visible = false;

  cometGroup = new Group();
  bronzeCoinGroup = new Group();
  silverCoinGroup = new Group();
  goldCoinGroup = new Group();
  weaponGroup = new Group();
  fuelGroup = new Group();
}

function draw() {
  background(0);

  if(gameState === "0")
    {
      background(backgroundImg);
      
      space.visible = false;
      rocket.visible = false;
      gameOver.visible = false;
      restart.visible = false;
      home.visible = false;
      win.visible = false;
      
      fill(255);
      textSize(30);
      text("Press Space to continue", 40, 470);
      
      if(keyDown("space"))
        {
          gameState = "1";
        }
    }

    if(gameState === "1")
    {
      play.visible = true;
      line1.visible = true;
      line2.visible = true;
      line3.visible = true;
      line4.visible = true;
      space.visible = false;
      rocket.visible = false;

      fill(255);
      textSize(30);
      text("INSTRUCTIONS", 90, 130);

      textSize(15);
      text("These are the different parametres of the game", 40, 90);

      text("1. Use right and left arrow keys for moving your rocket.", 10, 150);
      text("2. Hit coins to collect them, dont touch comets or else", 10, 170);
      text("game will be over.", 27, 185);
      text("3. Use the up arrow key to fire fire-balls, anything that will ", 10, 205);
      text("touch these will get destroyed.", 27, 220);
      text("5. Hit the fuel tanker to get it, every tanker will increse your ", 10, 240);
      text("fuel level by 10%. You are loading fuel for the future ", 27, 255);
      text("when fuel levels are more that 100%.", 27, 270);
      text("6. Reach the distance of 100000m and collect 10000 coins ", 10, 290);
      text("along with it to win the game.", 27, 305);

      if(mousePressedOver(play))
      {
        gameState = "2";
      }
    }

  if (gameState === "2") {
    distance = distance + Math.round(getFrameRate() / 50);

    rocket.visible = true;
    space.visible = true;
    play.visible = false;
    line1.visible = false;
    line2.visible = false;
    line3.visible = false;
    line4.visible = false;
    gameOver.visible = false;
    win.visible = false;

    space.velocityY = 8;

    //Regenerating the background.
    if (space.y > 350) {
      space.y = height / 2;
    }

    //Making rocket move when arrow keys are pressed.
    if (keyDown("right_arrow")) {
      rocket.x = rocket.x + 3;
    }

    if (keyDown("left_arrow")) {
      rocket.x = rocket.x - 3;
    }

    //Making rocket come back from the other side if it goes out from one.
    if (rocket.x > 415) {
      rocket.x = -15;
    }

    if (rocket.x < -15) {
      rocket.x = 415;
    }

    //Function call.
    spawnComets();
    spawnBronzeCoins();
    spawnSilverCoins();
    spawnGoldCoins();
    spawnFuel();

    //Incresing coinCount if rocket Touches coins.
    if (bronzeCoinGroup.isTouching(rocket)) {
      coinCount += 1;
      //to destroy only one touched coin
      bronzeCoinGroup.get(0).destroy();
    }

    if (silverCoinGroup.isTouching(rocket)) {
      coinCount += 5;
      //to destroy only one touched coin
      silverCoinGroup.get(0).destroy();
    }

    if (goldCoinGroup.isTouching(rocket)) {
      coinCount += 10;
      //to destroy only one touched coin
      goldCoinGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(cometGroup)) {
      //To destroy that single coin touched.
      cometGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(bronzeCoinGroup)) {
      //To destroy that single coin touched.
      bronzeCoinGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(silverCoinGroup)) {
      //To destroy that single coin touched.
      silverCoinGroup.get(0).destroy();
    }

    if (weaponGroup.isTouching(goldCoinGroup)) {
      //To destroy that single coin touched.
      goldCoinGroup.get(0).destroy();
    }

    if (keyDown("up_arrow") && weaponCount > 0) {
      spawnWeapons();
      weaponCount -= 1;
    }

    if (frameCount % 500 === 0) {
      fuelCount -= 1;
    }

    if (rocket.isTouching(fuelGroup)) {
      fuelCount += 10;
      //To destroy only the fuel tank touched.
      fuelGroup.get(0).destroy();
    }

    if (cometGroup.isTouching(rocket)) {
      gameState = "3";
      space.velocityY = 0;
      deaths += 1;
    }

    /*if(distance < 100000 && coinCount < 10000)
    {
      gameState = "4";
    }*/
  }

  if (gameState === "3") {
    gameOver.visible = true;
    restart.visible = true;
    home.visible = true;
    rocket.visible = false;

    rocket.x = 200;
    rocket.y = 380;

    space.velocityY = 0;
    cometGroup.destroyEach();
    bronzeCoinGroup.destroyEach();
    goldCoinGroup.destroyEach();
    weaponGroup.destroyEach();
    fuelGroup.destroyEach();

    if (mousePressedOver(restart)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 10;
      gameState = "2";
      restart.visible = false;
    }

    if(mousePressedOver(home))
    {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 10;
      deaths = 0;
      gameState = "0";
    }

  }

  if(gameState === "4")
  {
    win.visible = true;
    restart.visible = true;
    home.visible = true;
    rocket.visible = false;

    rocket.x = 200;
    rocket.y = 380;
    restart.y = 350;
    home.y = 350;

    space.velocityY = 0;
    cometGroup.destroyEach();
    bronzeCoinGroup.destroyEach();
    goldCoinGroup.destroyEach();
    weaponGroup.destroyEach();
    fuelGroup.destroyEach();

    if (mousePressedOver(restart)) {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 10;
      gameState = "2";
      restart.visible = false;
      home.visible = false;
    }

    if(mousePressedOver(home))
    {
      distance = 0;
      coinCount = 0;
      fuelCount = 100;
      weaponCount = 10;
      deaths = 0;
      gameState = "0";
    }

  }

  drawSprites();

  fill(255);
  textSize(15);
  text("Distance: " + distance, 10, 20);
  text("Coins: " + coinCount, 125, 20);
  text("Deaths: " + deaths, 210, 20);
  text("Fireballs left: " + weaponCount, 290, 20);
  text("Fuel left: " + fuelCount + "%", 10, 40);
}

function spawnComets() {
  if (frameCount % 50 === 0) {
    comet = createSprite(200, -20, 10, 10);
    comet.addImage(cometImg);
    comet.x = Math.round(random(-10, 410));
    comet.velocityY = 10;
    comet.lifetime = 60;
    comet.scale = 0.1;

    //comet.debug = true;
    comet.setCollider("rectangle", 0, 0, 300, 800);

    cometGroup.add(comet);
    rocket.depth = comet.depth;
    rocket.depth += 1;
  }
}

function spawnBronzeCoins() {
  if (frameCount % 150 === 0) {
    bronzeCoin = createSprite(200, -20, 10, 10);
    bronzeCoin.addImage(bronzeCoinImg);
    bronzeCoin.x = Math.round(random(-10, 410));
    bronzeCoin.velocityY = 7;
    bronzeCoin.lifetime = 80;
    bronzeCoin.scale = 0.04;

    //bronzeCoin.debug = true;
    bronzeCoin.setCollider("circle", 0, 0, 500);

    bronzeCoinGroup.add(bronzeCoin);
    rocket.depth = bronzeCoin.depth;
    rocket.depth += 1;
  }
}

function spawnSilverCoins() {
  if (frameCount % 715 === 0) {
    silverCoin = createSprite(200, -20, 10, 10);
    silverCoin.addImage(silverCoinImg);
    silverCoin.x = Math.round(random(-50, 450));
    silverCoin.velocityY = 18;
    silverCoin.lifetime = 35;
    silverCoin.scale = 0.05;

    //silverCoin.debug = true;
    silverCoin.setCollider("circle", 0, 0, 300);

    silverCoinGroup.add(silverCoin);
    rocket.depth = silverCoin.depth;
    rocket.depth += 1;
  }
}

function spawnGoldCoins() {
  if (frameCount % 1716 === 0) {
    goldCoin = createSprite(200, -20, 10, 10);
    goldCoin.addImage(goldCoinImg);
    goldCoin.x = Math.round(random(-100, 500));
    goldCoin.velocityY = 30;
    goldCoin.lifetime = 25;
    goldCoin.scale = 0.05;

    //goldCoin.debug = true;
    goldCoin.setCollider("circle", 0, 0, 300);

    goldCoinGroup.add(goldCoin);
    rocket.depth = goldCoin.depth;
    rocket.depth += 1;
  }
}

function spawnWeapons() {
  weapon = createSprite(200, 310, 10, 10);
  weapon.addImage(weaponImg);
  weapon.velocityY = -1;
  weapon.lifetime = 320;
  weaponGroup.add(weapon);
  weapon.x = rocket.x;
  weapon.scale = 0.015;
  //weapon.debug = true;
  weapon.setCollider("circle", 0, 2, 1100);
  weapon.depth = rocket.depth;
  weapon.depth += 1;
}

function spawnFuel() {
  if (frameCount % 7000 === 0) {
    fuel = createSprite(200, -20, 10, 10);
    fuel.addImage(fuelImg);
    fuel.scale = 0.1;
    fuel.x = Math.round(random(-50, 450));
    fuel.velocityY = 3;
    fuel.lifetime = 180;
    fuelGroup.add(fuel);
  }
}