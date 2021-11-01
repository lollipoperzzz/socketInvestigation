const express = require("express")

const app = express()
const server = require('http').createServer(app)
const cors = require("cors")
const { Server } = require("socket.io");
app.use(cors())

app.get('/', (req, res) => {
    res.json({isOk: true})
})

const io = new Server(server, {
    cors: {
        origin: 'http://192.168.0.78:3000',
    }
})

io.on('connection', socket => {
    console.log(`New WS connection {${socket.id}`)
    socket.on('joinRoom', (data) => {
        socket.join(data)
        console.log(`User with id {${socket.id} joined room with id {${data}}`)
    })
    socket.on('send_message', (data) => {
        socket.to(data.roomId).emit('receive_message', data)
        console.log(data)
    })
    socket.on('disconnect', () => {
        console.log(`User {${socket.id} disconnected`)
    })
})

const startApp = () => {
    const PORT = 3001
    try {
        server.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}/`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()