const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const sockets = require('./server.js');
const port = 3000;
const app = express();

//Enable cors
app.use(cors());
//Enable body parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Handle all routes in routes/index.js
app.use('/', routes);
  
//start http and socket server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.on('listening', () => {sockets.wss(app)});


