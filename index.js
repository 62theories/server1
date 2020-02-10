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

// const WebSocket = require("ws")
// const wss = new WebSocket.Server({ port: 3000 })

// wss.on("connection", function connection(ws) {
//       ws.on("message", function incoming(message) {
//             console.log("received: %s", message)
//       })
// })

// wss.on("close", function close() {
//       console.log("disconnected")
// })

const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const _ = require("lodash")
const axios = require("axios")

server.on("error", err => {
      console.log(`server error:\n${err.stack}`)
      server.close()
})

server.on("message", (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
      let time = new Date()
      let convert = ""
      try {
            convert = JSON.parse(a)
      } catch {
      } finally {
            if (_.has(convert, "DEAUTH")) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/deauth.json",
                        {
                              count: convert.DEAUTH.length,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                  convert.DEAUTH.forEach((item) => {
                        let url = "/MAC/" + Object.keys(item)[0] + "/" + time + "/DEAUTH.json"  
                        axios.put(
                              "https://finalprojectcoe.firebaseio.com" + url,
                              {
                                    test:"test"
                              },
                              { headers: { "Content-Type": "application/json" } }
                        )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                  })
            } else if(_.has(convert, "PROBE")) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/probe.json",
                        {
                              count: convert.PROBE.length,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                        convert.PROBE.forEach((item) => {
                              let url = "/MAC/" + Object.keys(item)[0] + "/" + time + "/PROBE.json"  
                              axios.put(
                                    "https://finalprojectcoe.firebaseio.com" + url,
                                    {
                                          test:"test"
                                    },
                                    { headers: { "Content-Type": "application/json" } }
                              )
                              .then(r => console.log(r.status))
                              .catch(e => console.log(e))
                        })
            } else if(_.has(convert, "BEACON")) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/beacon.json",
                        {
                              count: convert.BEACON.length,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                        convert.BEACON.forEach((item) => {
                              let url = "/MAC/" + Object.keys(item)[0] + "/" + time + "/BEACON.json"  
                              axios.put(
                                    "https://finalprojectcoe.firebaseio.com" + url,
                                    {
                                          test:"test"
                                    },
                                    { headers: { "Content-Type": "application/json" } }
                              )
                              .then(r => console.log(r.status))
                              .catch(e => console.log(e))
                        })
            }
      }
})

server.on("listening", () => {
      const address = server.address()
      console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(3000)

// var udp = require("dgram")

// // --------------------creating a udp server --------------------

// // creating a udp server
// var server = udp.createSocket("udp4")

// // emits when any error occurs
// server.on("error", function(error) {
//       console.log("Error: " + error)
//       server.close()
// })

// // emits on new datagram msg
// server.on("message", function(msg, info) {
//       console.log("Data received from client : " + msg.toString())
//       console.log(
//             "Received %d bytes from %s:%d\n",
//             msg.length,
//             info.address,
//             info.port
//       )

//       //sending msg
//       // server.send(msg, info.port, "localhost", function(error) {
//       //       if (error) {
//       //             client.close()
//       //       } else {
//       //             console.log("Data sent !!!")
//       //       }
//       // })
// })

// //emits when socket is ready and listening for datagram msgs
// server.on("listening", function() {
//       var address = server.address()
//       var port = address.port
//       var family = address.family
//       var ipaddr = address.address
//       console.log("Server is listening at port" + port)
//       console.log("Server ip :" + ipaddr)
//       console.log("Server is IP4/IP6 : " + family)
// })

// //emits after the socket is closed using socket.close();
// server.on("close", function() {
//       console.log("Socket is closed !")
// })

// server.bind(3080)
