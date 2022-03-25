console.log("this is index.js")

//to serve public folder
let express = require('express');
let http = require('http'); //include http server
let io = require('socket.io'); //include the sockets 

//in the following order
let app = express();
let server = http.createServer(app); //wrap express app with http 
io = new io.Server(server); // use socket.io on the http app

app.use('/', express.static('public'));

////////////////////////////sockets////////////////////////////
//socket connection
io.sockets.on('connect', (socket) => {
    console.log("we have a new client: ", socket.id);
    //if this particular socket disconnects
    socket.on('disconnect', ()=>{
        console.log("socket has been disconnected ", socket.id);
    })

    //listen for a message from this client
    socket.on('mousePositionData', (data) => {
        console.log(data);
        io.sockets.emit('mouseDataFromServer', data); //send the same data back to all clients
    })
})

//listen on port 8800
server.listen(8800, () => {
    console.log("server is up and running on port 8800")
})