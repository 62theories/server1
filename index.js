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
            if (convert.DEAUTH || convert.DEAUTH === 0) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/deauth.json",
                        {
                              count: +convert.DEAUTH,
                              time: time,
                        },
                        { headers: { "Content-Type": "application/json" } }
                  ).then(() =>
                        console.log(
                              "SENT to https://finalprojectcoe.firebaseio.com/deauth.json"
                        )
                  )
                  axios.get(
                        "https://finalprojectcoe.firebaseio.com/alert/deauth.json"
                  ).then((alertFetch) => {
                        const { data } = alertFetch
                        if (data && +convert.DEAUTH > data) {
                              axios.request({
                                    method: "POST",
                                    url:
                                          "https://notify-api.line.me/api/notify",
                                    data: qs.stringify({
                                          message: `DEAUTH ATTACK FOUND (${+convert.DEAUTH} packets)`,
                                    }),
                                    headers: {
                                          "Content-Type":
                                                "application/x-www-form-urlencoded",
                                          Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`,
                                    },
                              })
                        }
                  })
            }
            if (convert.PROBE || convert.PROBE === 0) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/probe.json",
                        {
                              count: +convert.PROBE,
                              time: time,
                        },
                        { headers: { "Content-Type": "application/json" } }
                  ).then(() =>
                        console.log(
                              "SENT to https://finalprojectcoe.firebaseio.com/probe.json"
                        )
                  )
                  axios.get(
                        "https://finalprojectcoe.firebaseio.com/alert/probe.json"
                  ).then((alertFetch) => {
                        const { data } = alertFetch
                        if (data && +convert.PROBE > data) {
                              axios.request({
                                    method: "POST",
                                    url:
                                          "https://notify-api.line.me/api/notify",
                                    data: qs.stringify({
                                          message: `PROBE ATTACK FOUND (${+convert.PROBE} packets)`,
                                    }),
                                    headers: {
                                          "Content-Type":
                                                "application/x-www-form-urlencoded",
                                          Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`,
                                    },
                              })
                        }
                  })
            }
            if (convert.BEACON || convert.BEACON === 0) {
                  axios.post(
                        "https://finalprojectcoe.firebaseio.com/beacon.json",
                        {
                              count: +convert.BEACON,
                              time: time,
                        },
                        { headers: { "Content-Type": "application/json" } }
                  ).then(() =>
                        console.log(
                              "SENT to https://finalprojectcoe.firebaseio.com/beacon.json"
                        )
                  )
                  axios.get(
                        "https://finalprojectcoe.firebaseio.com/alert/beacon.json"
                  ).then((alertFetch) => {
                        const { data } = alertFetch
                        if (data && +convert.BEACON > data) {
                              axios.request({
                                    method: "POST",
                                    url:
                                          "https://notify-api.line.me/api/notify",
                                    data: qs.stringify({
                                          message: `beacon ATTACK FOUND (${+convert.BEACON} packets)`,
                                    }),
                                    headers: {
                                          "Content-Type":
                                                "application/x-www-form-urlencoded",
                                          Authorization: `Bearer S5V1TfvbIQxTCaSLF0KyIJPNS8FndGyi6goUwrI6Evs`,
                                    },
                              })
                        }
                  })
            }
      }
})

server.on("listening", () => {
      const address = server.address()
      console.log(`server listening ${address.address}:${address.port}`)
      console.log("this is test 4/5/2020")
})

server.bind(3000)
