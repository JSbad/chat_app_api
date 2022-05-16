const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const sockets = require('./server.js');
const port = 3000;
const app = express();

//enable cors
app.use(cors());
//Handle all routes in routes/index.js
app.use('/', routes);
  
//start http and socket server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.on('listening', () => {sockets.wss(app)});


