let socket = io(); //opens and connects to the socket

//listen for confirmation of socket
socket.on('connect', () => {
    console.log("client connected via sockets");
})

//////////////////p5 code//////////////////

//global variables
let r,g,b;

function setup() {
    createCanvas(400, 400);
    background(220);
    r = random(0,255);
    g = random(0,255);
    b = random(0,255);
    shape = floor(random(0,2));
    socket.on('mouseDataFromServer', (data)=>{ //send to all clients
        drawEllipseWithData(data);
    })
}

//emit information of mouse positon everytime i move mouse
function mouseDragged() {
    //anything here is used below
    let mousePos = {x: mouseX, y:round(mouseY), r:10, red:r, green:g, blue:b, shape:shape};
    //emit this information to the server
    socket.emit('mousePositionData', mousePos);//send to all the connected clients
}

function drawEllipseWithData(data){
    fill(data.red,data.green,data.blue);
    if(data.shape == 0){
        ellipse(data.x, data.y, data.r, data.r);
    }
    else{
        rect(data.x, data.y, data.r, data.r);
    }
}