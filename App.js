const express = require("express");
const routes = require('./routes');
const http = require("http");
const ws = require("websocket").server;
const port = 3000;
const app = express();
const server = http.createServer(app);

class webSockets{
  
  static connections = []
  constructor(server){
  }
  static wss = new ws({"httpServer": server}).wss.on('request', (request) => {

    console.log("Websocket request received.")
    let connection = request.accept(null, request.origin)
    webSockets.connections.push(connection)
    let senderid = request.httpRequest.url.split("/")[2]
    connection.userID = senderid;
    connection.on("open", () => {
      console.log("Server socket Connection opened.")

    })
  })

}


app.use(
  express.urlencoded({
    extended: false,
  })
);

//Handle all routes in routes/index.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});