const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const _ = require("lodash")
const axios = require("axios")
const qs = require("querystring")

server.on("error", (err) => {
      console.log(`server error:\n${err.stack}`)
      server.close()
})

server.on("message", (msg, rinfo) => {
      console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
      let time = new Date()
      let convert = ""
      try {
            convert = JSON.parse(msg)
      } catch (err) {
            console.log(err)
      } finally {
            axios.post(
                  "https://finalprojectcoe.firebaseio.com/time.json",
                  {
                        [time]: convert,
                  },
                  { headers: { "Content-Type": "application/json" } }
            )
                  .then((r) =>
                        console.log(
                              `SENT to https://finalprojectcoe.firebaseio.com/time.json`
                        )
                  )
                  .catch((e) => console.log(e))
            if (_.has(convert, "DEAUTH")) {
            } else if (_.has(convert, "PROBE")) {
            } else if (_.has(convert, "BEACON")) {
            }
      }
})

server.on("listening", () => {
      const address = server.address()
      console.log(`server listening ${address.address}:${address.port}`)
      console.log("this is test 4/5/2020")
})

server.bind(3000)
