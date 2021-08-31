// viết hàm javascript => phục vụ sự kiện xảy ra khi mình tương , nhận dữ liệu 

var checkjson = false;

var dataND=[0, 0, 0, 0, 0];

var dataMN=[0, 0, 0, 0, 0];

var categories=['0h', '1h', '2h','3h','4h'];

var hostname = "ngoinhaiot.com";

var port = 2222;

var clientId = "Web";

clientId += new Date().getUTCMilliseconds();

var user_mqtt = "hieu45678vip";

var pass_mqtt = "hieu45678vip";

var topicpub = "hieu45678vip/sub";

var topicsub = "hieu45678vip/pub"; 



function myFunction(){
	var time=new Date();
	dataND.shift();
	dataMN.shift();
	categories.shift();
	dataND.push(parseInt(document.getElementById("nhietdo").value));
	dataMN.push(parseInt(document.getElementById("mucnuoc").value));
	categories.push(time.getHours()+":"+time.getMinutes()+":"+time.getSeconds());
	console.log(dataMN);
	console.log(dataND);
	console.log(categories);
	$(function () {
		$('#empcontainerMN').highcharts({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Lượng nước(ml)'
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: 'Lượng nước(ml)'
				}
			},
			credits:{
				enabled: false
			},
			series: [{
				name: 'Lượng nước',
				data: dataMN
			}],
		});
	});
	$(function () {
		$('#empcontainerND').highcharts({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Nhiệt độ(C)'
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: 'Nhiệt độ(C)'
				}
			},
			credits:{
				enabled: false
			},
			series: [{
				name: 'Nhiệt độ',
				data: dataND
			}],
		});
	});    
}

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);  // khai báo kết nối mqtt
mqttClient.onMessageArrived = MessageArrived; // nhận dữ liệu
mqttClient.onConnectionLost = ConnectionLost; // kiểm tra kết nối 
Connect();

function Connect(){
	mqttClient.connect({
		useSSL: false,
		userName: user_mqtt,
		password: pass_mqtt,
		onSuccess: Connected,
		onFailure: ConnectionFailed,
		keepAliveInterval: 10,
	});
}

function Connected() 
{
	console.log("Connected to mqtt.ngoinhaiot.com");
	mqttClient.subscribe(topicsub);
}

function ConnectionFailed(res) 
{
	console.log("Connect failed:" + res.errorMessage);
}

function ConnectionLost(res) 
{
	if (res.errorCode !== 0) 
	{
		console.log("Connection lost:" + res.errorMessage);
		Connect();
	}
}

function MessageArrived(message) 
{
	console.log("Data STM-ESP :" + message.payloadString);
	//{"ND":"1766","MN":"3532","BTcheck":"0"}

	// Kiểm tra JSON đó  lỗi ko ??

	// nếu ko lỗi thì xử lý  => hiển thị đúng vị trí trên giao diện mình thiết kế

	IsJsonString(message.payloadString);

	if(checkjson)
	{
		console.log("JSON OK!!!");
		var DataVDK = message.payloadString;

		var DataJson = JSON.parse(DataVDK); 
		//DataJson {"ND":"1766","MN":"3532","BTcheck":"0"}


		//DataJson.ND
		console.log("Nhiệt độ: " + DataJson.ND);
		console.log("Mức nước: " + DataJson.MN);

		if(DataJson.ND != null)
		{
			document.getElementById("nhietdo").value = DataJson.ND;
		}

		if(DataJson.MN != null)
		{
			document.getElementById("mucnuoc").value = DataJson.MN;
		}

		if(DataJson.BTcheck != null)
		{
			document.getElementById("BTcheck").innerHTML = DataJson.BTcheck;
		} 
			document.getElementById("DateUpdate").innerHTML = new Date().toString();
			myFunction();
		}
		else
		{
			console.log("JSON Error!!!");
		}
	}

		function IsJsonString(str)
		{
			try
			{
				JSON.parse(str);
		} 
		catch (e)
		{
			checkjson = false;
			return false;
		}
		checkjson = true;
		return true;
	}
	function SendMQTT()
	{
		var DataSend = "{\"BTcheck\":\""+1+"\"}"; 

		mqttClient.send(topicpub, DataSend);
		console.log("BTcheck send");
	}
	$(function () {
		$('#empcontainerMN').highcharts({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Lượng nước(ml)'
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: 'Lượng nước(ml)'
				}
			},
			credits:{
				enabled: false
			},
			series: [{
				name: 'Lượng nước',
				data: dataMN
			}],
		});
	});
	$(function () {
		$('#empcontainerND').highcharts({
			chart: {
				type: 'line'
			},
			title: {
				text: 'Nhiệt độ(C)'
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				title: {
					text: 'Nhiệt độ(C)'
				}
			},
			credits:{
				enabled: false
			},
			series: [{
				name: 'Nhiệt độ',
				data: dataND
			}],
		});
	});
//rtsp://admin:Aa123456@192.168.1.214:554/onvif1