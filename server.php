<?PHP session_start(); 

function connect($database)
{
	#-------------------------------------------------#
	#   set up parameters to access server / database #
	#-------------------------------------------------#
	$host="localhost";
	$user="root";
	$password="root";
	#------------------------------------#
	#   connect to MySQL server          #
	#------------------------------------#
	//$con = mysql_connect($host,$user,$password);
	//check_mysql();
	//	or die ("Didn't connect to server"); 
	#------------------------------------#
	#   connect to Database              #
	#------------------------------------#
	//$db = mysql_select_db($database)
	
	mysql_connect("localhost","root","root") or die ("Could not connect to mysql server.");
	mysql_select_db('game')	or die ("Couldn't find database game");
	
	
	//mysql_select_db("DATABASE_NAME") or die ("Could not connect to database.");
}

if (isset($_POST['save'])){
	connect();
	save();
	}
	
function save()
{
	$query = "INSERT INTO player(name,score,level,speed,attack,damage,hitpoints,life) VALUES('$_SESSION[name]','$_POST[score]', '$_POST[level]', '$_POST[speed]',
	'$_POST[attack]','$_POST[dmg]','$_POST[hp]','$_POST[life]')";
	mysql_query($query); 
	//check_mysql();  display_query($query);
	//redirect($page);
	
if(mysql_errno()){
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
}
}

if (isset($_GET['t'])){
	connect();
	load();
	}

function load()
{
	$query = "SELECT * FROM player WHERE name = '$_SESSION[name]'";
	$result = mysql_query($query); 
	$info = mysql_fetch_array($result)
	or die(mysql_error());
	
	$data = array('name' => $info['name'], 'score' => $info['score'], 'level' => $info['level'],'speed' => $info['speed'],
	'attack' => $info['attack'],'damage' => $info['damage'],'hitpoints' => $info['hitpoints'],'life' => $info['life']);
	echo "<script> delete data; </script>";
	echo json_encode(array($data));
	
	
if(mysql_errno()){
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
}

}

if(isset($_POST['create']))
{
	connect("");
	register(); 
}

function register()
{
	$name = $_POST['username'];
	$password = $_POST['password'];
	//$query = "INSERT INTO user(name,password) VALUES('test','test')";
	$query = "INSERT INTO user(name,password) VALUES('$name','$password')";
	mysql_query($query); 
	if(mysql_errno()){
    echo "MySQL error ".mysql_errno().": "
         .mysql_error()."\n<br>When executing <br>\n$query\n<br>";
}
header('Location: index.html');


}

if(isset($_POST['Log']))
{
	connect("");
	login(); 

}

function login()
{
	#----------------------------------#
	# Sets up all variables to compare #
	#----------------------------------#
	$name = $_POST['username'];
	$password = $_POST['password'];
	$query = "SELECT *        
	FROM user       
	WHERE name = '$name' AND password = '$password';";
	$result = mysql_query($query);
	#-----------------------------------#
	# 		no such user exists 		#
	#-----------------------------------#
	if(mysql_num_rows($result) < 1)
	{    
		header('Location: index.html');    
		die();
	}
	else
	{
	$_SESSION[name] = $name;
	header('Location: menu.html');    
	}
}

?>