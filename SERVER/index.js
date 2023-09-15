//librerias
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

//generar instancia
const app = express();
const server = http.createServer(app);
const io = socketIO(server);


//envio estatico de contenido de public
app.use(express.static(__dirname + '/public'));


//conexion de cliente
io.on('connect', (socket) => {
    //HOLA
    console.log('Usuario conectado');

    //detectar recepción de mensaje tag: send-element
    socket.on('send-element', (element) => {
        io.emit('element-received', element)
    })

    //detectar recepción de mensaje tag: send-cursor
    socket.on('send-cursor', (element) => {
        io.emit('cursor-received', element);
    })

    //desconexion
    socket.on('disconnect', () => {
        console.log('Usuario conectado');
    })
})

server.listen(3000, () => {
    console.log('LISTENING PORT 3000')
})