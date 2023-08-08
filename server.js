var url = "ws://localhost:3000"
var ws = new WebSocket(url);

ws.onopen = function(){
	console.log("Websocket is connected.");
}
ws.onmessage = function(msg){
	console.log(msg.data);
}