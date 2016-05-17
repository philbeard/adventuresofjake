var load;
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 640;
document.body.appendChild(canvas);
 
// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
        bgReady = true;
};
bgImage.src = "images/map.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
        heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
        monsterReady = true;
};
monsterImage.src = "images/monster.png";

//sword image
var swordReady = false;
var swordImage = new Image();
swordImage.onload = function(){
		swordReady = true;
}
swordImage.src = "images/sword.png";

// weapon image
var weaponReady = false;
var weaponImage = new Image();
weaponImage.onload = function () {
        weaponReady = true;
};
weaponImage.src = "images/atkRight.png";

// Game objects
var hero = {
		level: 1,
        speed: 105, // movement in pixels per second
		attack: 22,
		dmg: 20,
		hp: 100,
		life:5
};

var monster = {
		speed: 50,
		hp: 50 + (hero.level * 5),
		dmg: 10 +(hero.level * 5),
		sight: false
};

var score = 0;
var weapon = {};
var sword = {};
var bg = 0;
var bg2 = 4480;
var travel = 0;
var multi = 1;
var collision = {
 u: false,
 d: false,
 l: false,
 r: false
 };

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;
		hero.hp = 100;
		monster.hp = 50;

        // Throw the monster somewhere on the screen randomly
        monster.x = 32 + (Math.random() * (canvas.width - 64));
        monster.y = 32 + (Math.random() * (canvas.height - 64));
		
		sword.x = 32 + (Math.random() * (canvas.width - 64));
		sword.y = 32 + (Math.random() * (canvas.height - 64));
		
		//weapon.x = hero.x + hero.attack;
		//weapon.y = hero.y + hero.attack;
		
		heroImage.src = "images/hero.png";
		weaponImage.src = "images/atkRight.png";
		hero.attack = 22 + hero.level;
		hero.dmg = 20 + (hero.level * 2); 

};

// Update game objects
var update = function (modifier) {
++travel;


// xp level calculator
hero.level = 1 * Math.sqrt(score);
monster.sight = false;
        if (38 in keysDown) { // Player holding up
		if (hero.y + 32 >= 60)
		{
                hero.y -= hero.speed * modifier;
        }
		}
        if (40 in keysDown) { // Player holding down
		if (hero.y + 32 <= 600)
		{
                hero.y += hero.speed * modifier;
        }
		}
        if (37 in keysDown) { // Player holding left
				if (hero.x + 32 >= 30)
		{
                hero.x -= hero.speed * modifier;
        }
		}
        if (39 in keysDown) { // Player holding right
			if (hero.x + 32 <= 800 )
			{
                hero.x += hero.speed * modifier;
			}
        }
		
		//collect sword
		if (
                hero.x <= (sword.x + 32)
                && sword.x <= (hero.x + 32)
                && hero.y <= (sword.y + 32)
                && sword.y <= (hero.y + 32)
        ) {
		heroImage.src = "images/hero-sword.png";
		weaponImage.src = "images/special.png";
		hero.attack += 70;
		
		}
		
		// can the monster see you?
		if (hero.x <= monster.x + 200 && monster.x <= hero.x+200 && hero.y <= monster.y + 200 && monster.y <= hero.y + 200){
		
			if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32)
			{
			collision.r = true;
			}
			else {
			collision.r = false;
			}

			if (monster.x <= hero.x+32 && monster.x <= hero.x + 32)
			{
			collision.l = true;
			}
			else {
			collision.l = false;
			}
			if (hero.y <= monster.y +32)
			{
			collision.u = true;
			}
			else {
			collision.u = false;
			}
			if(monster.y <= hero.y +32)
			{
			collision.d = true;
			}
			else {
			collision.d = false;
			}
			
		monster.sight = true;
			if (hero.x <= monster.x+32)
			{
			monster.x -= monster.speed * modifier;
			}
			if (monster.x <= hero.x-32)
			{
			monster.x += monster.speed * modifier;
			}
			if (hero.y <= monster.y-32)
			{
			monster.y -= monster.speed * modifier;
			}
			if (monster.y <= hero.y+32)
			{
			monster.y += monster.speed * modifier;
			}
		}
		// if not
		if (monster.sight == false){
		monster.x -= monster.speed * modifier;
		}
		
        // Are they touching?
        if (
                hero.x <= (monster.x + 32)
                && monster.x <= (hero.x + 32)
                && hero.y <= (monster.y + 32)
                && monster.y <= (hero.y + 32)
        ) {
				hero.hp = hero.hp - monster.dmg;
				if (hero.life == 0){
				alert("Game Over!");
				}
				if (hero.hp <= 0){
				--hero.life;
                reset();
				}
				
        }
		
		// attack hits monster
		if (
                weapon.x <= (monster.x + hero.attack)
                && monster.x <= (weapon.x + hero.attack)
                && weapon.y <= (monster.y + hero.attack)
                && monster.y <= (weapon.y + hero.attack)
        ) {
				monster.hp = monster.hp - hero.dmg;
				if (monster.hp <= 0){
                ++score;
                reset();
				}
        }
};

// Draw everything
var render = function () {

//Screen Movement
if (hero.x > 500)
	{
	bg -= .5;
	bg2-= .5;
	sword.x -=.5;
	monster.x -=.1;
	hero.x -=.1;
	}
if (hero.x > 600)
	{
	bg -= 1;
	bg2-= 1;
	sword.x -= 1;
	monster.x -=.5;
	hero.x -=.5;
	}
	
    if (bgReady) {
		if (bg == -4480){
		bg = 4480;
		}
		if (bg2 == -4480){
		bg2 = 4480
		}
		//bg -= 1;
		//bg2 -= 1;
                ctx.drawImage(bgImage, bg, 0);
				ctx.drawImage(bgImage, bg2, 0);
        }

        if (heroReady) {
                ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if (monsterReady) {
                ctx.drawImage(monsterImage, monster.x, monster.y);
				
				//ctx.drawImage(monsterImage, monster.x, monster.y);
        }
		
		if (swordReady) {
                ctx.drawImage(swordImage, sword.x, sword.y);
        }
		
		if (weaponReady){
		if (32 in keysDown){
		weapon.x = hero.x+32;
		weapon.y = hero.y;
				ctx.drawImage(weaponImage, hero.x+32, hero.y);
				}
		}

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Score: " + score + "   level:" + hero.level.toFixed(0), 32, 32);
		ctx.fillText("Life: " + hero.life, 662, 528);
		ctx.fillText("attack: " + hero.attack.toFixed(0), 662, 558);
		ctx.fillText("Damage: " + hero.dmg.toFixed(0), 662, 588);
		ctx.fillText("HP: " + hero.hp, 662, 618);
		
		
};


// The main game loop
var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible  */