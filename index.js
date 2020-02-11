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
            convert = JSON.parse(msg)
      } catch (err) {
            console.log(err)
      } finally {
            axios.put(
                  "https://finalprojectcoe.firebaseio.com/time.json",
                  {
                        time: time
                  },
                  { headers: { "Content-Type": "application/json" } }
            )
                  .then(r => console.log(r.status))
                  .catch(e => console.log(e))
            if (_.has(convert, "DEAUTH")) {
                  let sum = 0
                  convert.DEAUTH.forEach((item) => {
                        sum += +Object.values(item)[0] 
                  })
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/deauth.json",
                        {
                              count: sum,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                  convert.DEAUTH.forEach(item => {
                        let url =
                              "/MAC/" +
                              Object.keys(item)[0] +
                              "/" +
                              time +
                              "/DEAUTH.json"
                        axios.put(
                              "https://finalprojectcoe.firebaseio.com" + url,
                              {
                                    count: Object.values(item)[0]
                              },
                              {
                                    headers: {
                                          "Content-Type": "application/json"
                                    }
                              }
                        )
                              .then(r => console.log(r.status))
                              .catch(e => console.log(e))
                  })
            } else if (_.has(convert, "PROBE")) {
                  let sum = 0
                  convert.PROBE.forEach((item) => {
                        sum += +Object.values(item)[0] 
                  })
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/probe.json",
                        {
                              count: sum,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                  convert.PROBE.forEach(item => {
                        let url =
                              "/MAC/" +
                              Object.keys(item)[0] +
                              "/" +
                              time +
                              "/PROBE.json"
                        axios.put(
                              "https://finalprojectcoe.firebaseio.com" + url,
                              {
                                    count: Object.values(item)[0]
                              },
                              {
                                    headers: {
                                          "Content-Type": "application/json"
                                    }
                              }
                        )
                              .then(r => console.log(r.status))
                              .catch(e => console.log(e))
                  })
            } else if (_.has(convert, "BEACON")) {
                  let sum = 0
                  convert.BEACON.forEach((item) => {
                        sum += +Object.values(item)[0] 
                  })
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/beacon.json",
                        {
                              count: sum,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => console.log(r.status))
                        .catch(e => console.log(e))
                  convert.BEACON.forEach(item => {
                        let url =
                              "/MAC/" +
                              Object.keys(item)[0] +
                              "/" +
                              time +
                              "/BEACON.json"
                        axios.put(
                              "https://finalprojectcoe.firebaseio.com" + url,
                              {
                                    count: Object.values(item)[0]
                              },
                              {
                                    headers: {
                                          "Content-Type": "application/json"
                                    }
                              }
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