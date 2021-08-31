//////////Khai báo module mqtt
var mqtt = require('mqtt');
var checkjson=false;
//Khai báo tham số kết nối đến Broker
var options = { clientId: 'ESP32', port: 1111,username:"hieu45678vip",password:"hieu45678vip", clean:true,keepalive:60};

//Kết nối đến MQTT Broker với tham số biến option đã khai báo
var client = mqtt.connect('mqtt://ngoinhaiot.com', options);

//Khai báo Connect callback handler (nếu kết nối thành công sẽ thực thi hàm này)
client.on('connect', function () {
	console.log("Connected MQTT");
	//Subscribe đến topic sensor/update để nhận dữ liệu cảm biến
	client.subscribe('hieu45678vip/pub', function (err) {
		console.log("Subscribed to hieu45678vip/pub topic");
		if (err) {console.log(err);}
	})
//Subscribe đến topic relay/state để nhận dữ liệu cập nhật trạng thái relay
})

//Khai báo Subscribe Callback Handler (Khi nhận được dữ liệu từ các topic đã subscribe sẽ thực thi
//hàm này)
client.on('message', function (topic, message) {
	//Nhận dữ liệu và lưu vào biến msg_str
	var msg_str = message.toString();
	//In ra console để debug
	console.log("[Topic arrived] " + topic);
	console.log("[Message arrived] " + msg_str);

	if(topic == "hieu45678vip/pub") {
		//Xử lý dữ liệu
		console.log("Data STM-ESP :" + msg_str);
		//{"ND":"1766","MN":"3532","BTcheck":"0"}
		IsJsonString(msg_str);	
		// Kiểm tra JSON đó  lỗi ko ??
		if(checkjson){
			// nếu ko lỗi thì xử lý  => hiển thị đúng vị trí trên giao diện mình thiết kế
			
			//IsJsonString(msg_str.payloadString);
			console.log("JSON OK!!!");
			var DataJson = JSON.parse(msg_str); 
			//DataJson {"ND":"1766","MN":"3532","BTcheck":"0"}
			console.log("Nhiet do: " + DataJson.ND);
			console.log("Muc nuoc: " + DataJson.MN);
			console.log("BTcheck: "+ DataJson.BTcheck)

			//Lưu trữ vào MySQL
			INSERT_SENSOR_DATA(DataJson.ND, DataJson.MN,DataJson.BTcheck);
		}
		
	}
})

//Khai báo module
var dateTime = require('node-datetime');
var mysql = require('mysql');

//Định nghĩa tham số CSDL
var db_config = {
	host: "localhost",
	user: "root",
	password: "",
	database: "sensor"
}

//Tạo kết nối và xử lý kết nối lại nếu bị mất kết nối đến CSDL
var sql_con;

function handleMySQLDisconnect() {
	sql_con = mysql.createConnection(db_config);

	sql_con.connect(function(err) {
		if (err) {
			console.log('Error when connecting to database:', err);
			setTimeout(handleMySQLDisconnect, 2000);
		}
		console.log("Connected to database!");
	});

	sql_con.on('error', function(err) {
		console.log('db error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleMySQLDisconnect(); 
		} else { 
			throw err; 
		}
	});
}

handleMySQLDisconnect(); //Thực thi lần đầu tiên


//Viết hàm truy vấn INSERT dữ liệu vào CSDL
function INSERT_SENSOR_DATA(nhietdo, mucnuoc,BTcheck) { //Hàm Insert giá trị cảm biến
	var dt = dateTime.create();
	var time_formatted = dt.format('Y-m-d H:M:S');
	var sql = "INSERT INTO sensor (datetime, nhietdo, mucnuoc,btcheck) VALUES ('" + time_formatted + "', '" + nhietdo +"', '" + mucnuoc + "','" + BTcheck + "')";

	sql_con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Insert sensor data successfull!");
	});
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
/*
//Khai báo module
const express = require('express');
var cors = require('cors');

//Tạo HTTP server listening ở port 3001
const server = app.listen(3001, () => {
	console.log(`Express running → PORT ${server.address().port}`);
});

//Xử lý route phương thức GET khi nhận dữ liệu điều khiển từ website với URL
//có dạng là: http://localhost:3001/control?RL={relay}&val={state}
//với {relay} là số thứ tự hoặc tên relay và {state} là trạng thái relay
app.get('/control', function (req, res) {
	var rl = req.query.RL;
	var val = req.query.VAL;

//Tạo chuỗi dữ liệu
var cmd_str = "RL" + rl + val;

//Publish đến thiết bị
client.publish('relay/command', cmd_str, function(err) {
	if (err) {
		res.send("FAILED");
	}
	else {
		res.send("OK");
	}
});
})

*/