const WebSocketServer = require('ws').Server;

let connections = []

const wss = new WebSocketServer({port:8080});
  
wss.on('request', (request) => {

console.log("Websocket request received")
let connection = request.accept(null, request.origin);
connections.push(connection);
let senderId = request.httpRequest.url.split("/")
connection.userId = senderId;
connection.on("open", () => {
  console.log("Server socket Connection opened")
  });
connection.on("close", () => {
  console.log("Server socket Connection closed")
});
connection.on('message', (message) => {
  let msgContent = JSON.parse(message);
  // Create a new id for new chat
  if (msgContent.roomId === undefined) {
    msgContent.roomId = uuid();
  }
  msgContent.messageId = uuid();
  // Send message and senderId to recipient
  WebSockets.connections.map(conn => {
    if (conn.userId == msgContent.receiverId || conn.userId == msgContent.senderId) {
      conn.send(JSON.stringify(msgContent))
    }
  });
});
      
})
module.exports = WebSocketServer;
