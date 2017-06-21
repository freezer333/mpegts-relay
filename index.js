var net = require('net');
var INPUT_PORT = 5000;
var OUTPUT_PORT = 6000;

var source;

var receiver = net.createServer(function (socket) {
    source = socket;
});

var pusher = net.createServer(function (socket) {
    source.pipe(socket);
})

receiver.listen(INPUT_PORT);
pusher.listen(OUTPUT_PORT);
console.log("TCP server for receiving MPEG-TS: " + INPUT_PORT);
console.log("TCP server for pushing MPEG-TS: " + OUTPUT_PORT);