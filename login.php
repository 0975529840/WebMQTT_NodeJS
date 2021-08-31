<?php 
	require 'database/database.php'
 ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<link rel="icon" type="image/x-icon" href="img/II&IL.ico">
	<title>Login</title>
	<link rel="stylesheet" href="css/login.css">
</head>
<body>
	<div class="center">
		<h1><a href="Web.html" title="">Login</a></h1>
		<form action="" method="post" accept-charset="utf-8">
			<div class="txt_field">
				<input type="text" name="username" required>
				<span></span>
				<label>Username</label>
			</div>
			<div class="txt_field">
				<input type="password" name="password" required>
				<span></span>
				<label>Password</label>
			</div>
			<!-- <div class="pass">Forgot Password?</div> -->
			<input type="submit" value="Login" name="ok">
			<!-- <div class="signup_link">
				Not a member?<a href="#">Signup</a>
			</div> -->
		</form>
	</div>
</body>
</html>
<?php
	function base64url_encode($plainText) {
		$base64 = base64_encode($plainText);
		$base64url = strtr($base64, '+/=', '-_,');
		return $base64url;
	}
	if(isset($_POST['ok'])){
			$username = $_POST['username'];
			$password = $_POST['password'];
			$password = base64url_encode($password);
			$query = "SELECT * FROM `admin` WHERE (`username`='{$username}') AND `password`='{$password}'";
			$sql = mysqli_query($connection, $query);

		if(mysqli_num_rows($sql) == 1){
				setcookie('username',$username,time()+3600);
				header('location: Web.php');
			}
		else{
			//dang nhập sai thì load lại trang
			header('localtion: login.php');
		}
	}
?>