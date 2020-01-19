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
