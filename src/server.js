
const { WebSocketServer } = require("ws")
const dotenv = require("dotenv")
const { WSAEWOULDBLOCK } = require("constants")
const { connected } = require("process")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT || 8085 })

wss.on("connection", (ws) => {
ws.on("error", console.error)

ws.on("message", (data) => {
    wss.clients.forEach((client) => client.send(data.toString()))
  
})
    console.log("client connected")
})
