// const express = require("express")
// const cors = require("cors")
// const app = express()

// app.use(cors())

// app.get("/", (req, res) => {
//       res.send({
//             hello: "there"
//       })
// })

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//       console.log("server on port:", PORT)
// })

const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 3000 })

wss.on("connection", function connection(ws) {
      ws.on("message", function incoming(message) {
            console.log("received: %s", message)
      })
})

wss.on("close", function close() {
      console.log("disconnected")
})

// const dgram = require("dgram")
// const server = dgram.createSocket("udp4")

// server.on("error", err => {
//       console.log(`server error:\n${err.stack}`)
//       server.close()
// })

// server.on("message", (msg, rinfo) => {
//       console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
// })

// server.on("listening", () => {
//       const address = server.address()
//       console.log(`server listening ${address.address}:${address.port}`)
// })

// server.bind(80)
