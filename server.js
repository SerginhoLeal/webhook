var express = require('express');
var http = require('http');
var Server = require('socket.io').Server;
var app = express();
var server = http.createServer(app);
var io = new Server(server);
var BASE_URL = 'https://api.whatsapp.laks.net.br/';
var API_KEY = 'B6D711FCDE4D4FD5936544120E713976';
io.on('connection', function (socket) {
    console.log('socket connected');
    socket.on('disconnect', function (socket) {
        console.log('socket disconnected');
    });
});
app.use(express.json());
app.use('/webhook-lead', function (req, res) {
    var body = req.body;
    console.log({
        body: JSON.stringify(body, null, 5),
        url: req.originalUrl
    });
    io.emit('message', body);
    return res.status(201).json({ succes: true });
});
server.listen(3001, function () {
    console.log('server running at http://localhost:3001');
});
/**
 * @whatsapp
 *    |
 *    |     connecting
 *    |
 * @webhook
 *    |
 *    |     socket.emit('QRCode_Scanned', ()=>{})
 *    |
 * @front
 *    |
 *    |     socket.on('QRCode_Scanned', ()=>{})
 *    |
 * @screen
 *    |
 *    |     show the button
 *    x
 */ 
