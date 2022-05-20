const WebSocket = require('ws');


const wss = new WebSocket.Server({port:8080, clientTracking: true});
  

wss.on('connection', (ws) => {
  console.log("connected");
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log(JSON.parse(message));
        client.send(message);
      }
    });
  });
});

// wss.on('request', (request) => {

// console.log("Websocket request received")
// let connection = request.accept(null, request.origin);
// connections.push(connection);
// let senderId = request.httpRequest.url.split("/")
// connection.userId = senderId;
// connection.on("open", () => {
//   console.log("Connection opened")
//   });
// connection.on("close", () => {
//   console.log("Connection closed")
// });
// connection.on('message', (message) => {
//   let msgContent = JSON.parse(message);
//   console.log(msgContent);
//   // Create a new id for new chat
//   if (msgContent.roomId === undefined) {
//     msgContent.roomId = uuid();
//   }
//   msgContent.messageId = uuid();
//   // Send message and senderId to recipient
//   WebSockets.connections.map(conn => {
//     if (conn.userId == msgContent.receiverId || conn.userId == msgContent.senderId) {
//       conn.send(JSON.stringify(msgContent))
//     }
//   });
// });
      
// })
module.exports = WebSocket;
