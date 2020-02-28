const dgram = require("dgram")
const server = dgram.createSocket("udp4")
const _ = require("lodash")
const axios = require("axios")
const qs = require("querystring")

// axios.request({
//       method: "POST",
//       url: "https://notify-api.line.me/api/notify",
//       data: qs.stringify({
//             message: "ok"
//       }),
//       headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`
//       }
// })
//       .then(res => console.log(res))
//       .catch(err => console.log(err))

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
                  convert.DEAUTH.forEach(item => {
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
                        .then(r => {
                              axios.get(
                                    "https://finalprojectcoe.firebaseio.com/d.json"
                              )
                                    .then(r => {
                                          if (
                                                r.data &&
                                                r.data !== 0 &&
                                                sum > r.data
                                          ) {
                                                axios.request({
                                                      method: "POST",
                                                      url:
                                                            "https://notify-api.line.me/api/notify",
                                                      data: qs.stringify({
                                                            message: `DEAUTH ATTACK FOUND (${sum} packets)`
                                                      }),
                                                      headers: {
                                                            "Content-Type":
                                                                  "application/x-www-form-urlencoded",
                                                            Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`
                                                      }
                                                })
                                                      .then(res =>
                                                            console.log(res)
                                                      )
                                                      .catch(err =>
                                                            console.log(err)
                                                      )
                                          }
                                    })
                                    .catch(err => console.log(err))
                        })
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
                  convert.PROBE.forEach(item => {
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
                        .then(r => {
                              axios.get(
                                    "https://finalprojectcoe.firebaseio.com/d.json"
                              )
                                    .then(r => {
                                          if (
                                                r.data &&
                                                r.data !== 0 &&
                                                sum > r.data
                                          ) {
                                                axios.request({
                                                      method: "POST",
                                                      url:
                                                            "https://notify-api.line.me/api/notify",
                                                      data: qs.stringify({
                                                            message: `PROBE ATTACK FOUND (${sum} packets)`
                                                      }),
                                                      headers: {
                                                            "Content-Type":
                                                                  "application/x-www-form-urlencoded",
                                                            Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`
                                                      }
                                                })
                                                      .then(res =>
                                                            console.log(res)
                                                      )
                                                      .catch(err =>
                                                            console.log(err)
                                                      )
                                          }
                                    })
                                    .catch(err => console.log(err))
                        })
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
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/beacon.json",
                        {
                              count: convert.BEACON,
                              time: time
                        },
                        { headers: { "Content-Type": "application/json" } }
                  )
                        .then(r => {
                              axios.get(
                                    "https://finalprojectcoe.firebaseio.com/d.json"
                              )
                                    .then(r => {
                                          if (
                                                r.data &&
                                                r.data !== 0 &&
                                                convert.BEACON > r.data
                                          ) {
                                                axios.request({
                                                      method: "POST",
                                                      url:
                                                            "https://notify-api.line.me/api/notify",
                                                      data: qs.stringify({
                                                            message: `DEAUTH ATTACK FOUND (${convert.BEACON} packets)`
                                                      }),
                                                      headers: {
                                                            "Content-Type":
                                                                  "application/x-www-form-urlencoded",
                                                            Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`
                                                      }
                                                })
                                                      .then(res =>
                                                            console.log(res)
                                                      )
                                                      .catch(err =>
                                                            console.log(err)
                                                      )
                                          }
                                    })
                                    .catch(err => console.log(err))
                        })
                        .catch(e => console.log(e))
            }
      }
})

server.on("listening", () => {
      const address = server.address()
      console.log(`server listening ${address.address}:${address.port}`)
})

server.bind(3000)
