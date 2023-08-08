// websocket
var url = "ws://localhost:3000";
var ws = new WebSocket(url);

// 웹소켓 셋팅
function settingWebSocket() {

	ws.binaryType = "arraybuffer";
	
	ws.onopen = function () {
	  console.log("Websocket is connected.");
	};
  
	ws.onmessage = function (msg) {
	  console.log(msg.data); //서버로부터 받는 메세지.
	};
  }

settingWebSocket();


// import dgram from 'dgram';

// const server = dgram.createSocket('udp4');

// server.on('error', (err) => {
//   console.log(`server error:\n${err.stack}`);
//   server.close();
// });

// server.on('message', (msg, rinfo) => {
//   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// server.on('listening', () => {
//   const address = server.address();
//   console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind(8888);