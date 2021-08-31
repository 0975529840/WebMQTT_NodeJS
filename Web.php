<?php 
	session_start();
    if(isset($_SESSION['username']) || isset($_COOKIE['username'])){
        
    }else{
        echo "<meta http-equiv='refresh' content='0.1;url=login.php'>";
    }
 ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>DoAnThietKe</title>
	<link rel="icon" type="image/x-icon" href="img/II&IL.ico">
	<link rel="stylesheet" href="css/Web.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="http://code.highcharts.com/highcharts.js"></script>
	<script src="js/Web.js" type="text/javascript"></script>
</head>
<body>
	<a href="logout.php" title=""><img src="img/3.png" alt=""></a>
	<div class="container">
		<img src="img/II&IL.png" alt="">
		<h2>Đồ án Thiết kế</h2>
		<h3>Sensor</h3>
		<div id="">
			<form name="myfrom"  accept-charset="utf-8">
				<span>Mức nước(ml): </span>
				<input type="text" class="inputcss" name="mucnuoc" id="mucnuoc" readonly>	
				<span>Nhiệt độ(C):</span>
				<input type="text" class="inputcss" name="nhietdo" id="nhietdo" readonly>	
				<input type="button" name="" onclick="SendMQTT()"value="Update">
				<input type="hidden" name="BTcheck" id="BTcheck">
				<p>Date Update: <span id="DateUpdate"></span></p>	
			</form>
		</div>	
		<div id="empcontainerMN" class ="empcontainer"></div>	
		<div id="empcontainerND" class ="empcontainer"></div>	
	</div>	
</body>

</html>