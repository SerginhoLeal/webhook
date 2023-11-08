const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const BASE_URL = 'https://api.whatsapp.laks.net.br/';
const API_KEY = 'B6D711FCDE4D4FD5936544120E713976';

io.on('connection', (socket) => {
  console.log('socket connected');
  socket.on('disconnect', (socket) => {
    console.log('socket disconnected');
  });
});

app.use(express.json());

app.use('/webhook-lead', (req, res) => {
  const body = req.body;
  console.log({
    body: JSON.stringify(body, null, 5),
    url: req.originalUrl
  })

  io.emit('message', body)

  return res.status(201).json({ succes: true });
});

server.listen(3001, () => {
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