import { createServer } from 'http'
import { Server } from 'socket.io'
import app from './app'
import { env } from './env'

const httpServer = createServer(app)
const PORT = env.PORT

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`)

  socket.on('message', (data) => {
    console.log(`Message received: ${data}`)
    socket.broadcast.emit('message', data)
  })

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
