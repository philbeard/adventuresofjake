
var savegame = function()
{

     //Get selected node to send to PHP function
     //Define php info, specify name of PHP file NOT PHP function
     //Note that by loading the PHP file you will probably execute any code in that file
     //that does not require a function call
     //Send PHP variables in the data item, and make ajax call
     //On success perform any action that you want, such as load a div here called thenode
	 
	$.ajax({
		 type: "POST",
         url: "server.php",
         
         //data: { level: 'test', score: 500 },
		 data: { 
				save : 1,
				score: score,
		 		level: hero.level,
				speed: hero.speed, 
				attack: hero.attack,
				dmg: hero.dmg,
				hp: hero.hp,
				life: hero.life
		 },
         success: function() {
             alert("Game saved");
         }
     });
	 //alert("save game");
	 

}

var loadgame = function()
{

     //Get selected node to send to PHP function
     //Define php info, specify name of PHP file NOT PHP function
     //Note that by loading the PHP file you will probably execute any code in that file
     //that does not require a function call
     //Send PHP variables in the data item, and make ajax call
     //On success perform any action that you want, such as load a div here called thenode
	$.ajax({
		 type: "GET",
         url: "server.php",
         //data: { level: 'test', score: 500 },
		 data: { t:1
		 },
		 //dataType: "json",
         success: function(data) {
		 var obj = data.split("[").pop();
		 obj = obj.replace("]",'');
		 obj = jQuery.parseJSON(obj);		 
             //alert(obj.score);
			 score = obj.score;
			 hero.level = obj.level;
			 hero.speed = obj.speed *  modifier;
			 hero.attack = obj.attack;
			 hero.dmg = obj.damage;
			 hero.hp = obj.hitpoints;
			 hero.life = obj.life;
			 alert("Game Loaded");
         }
     });
}

var register = function()
{
		$.ajax({
		 type: "POST",
         url: "server.php",
         
         //data: { level: 'test', score: 500 },
		 data: { 
				name : 1,
				password: score,
		 },
         success: function() {
             alert("account created");
         }
     });
}