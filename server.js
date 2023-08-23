// b/node_modules/@miniflare/http-server/dist/src/index.js
import { WebSocketServer } from './node_modules/ws/wrapper.mjs';

const wss = new WebSocketServer({ port: 8765 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
