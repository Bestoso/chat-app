require('dotenv').config();
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 8080;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + '/public')));
app.use(cors());
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// routes

app.use(require('./router/app.router'));

// listen

const httpServer = app.listen(port, () => {
    console.log('Server running on http://localhost:' + port);
})

const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log('Nuevo usuario conectado: ' + socket.id)

    // socket.on recibira los datos que obtenemos del front, es decir los datos que enviamos desde la linea 12 en socket.js
    socket.on('chat:message', data => {
        console.log(data)
        socketServer.emit('chat:message', data);
    })

    socket.on('chat:typing', data => {
        socket.broadcast.emit('chat:typing', data);
    })
    // podemos enviar los datos a todos los usuarios incluyendome y hay otra que lo envia a todos excepto a mi.
    // la primera opcion es socket.emit, emite datos desde el servidor.
})