const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const xl = require("excel4node")
const cors = require("cors")
const axios = require("axios")
const moment = require("moment")
var time = require("express-timestamp")
app.use(bodyParser.json())
app.use(cors())
app.use(time.init)
app.get("/", (req, res) => {
      var wb = new xl.Workbook()
      var ws = wb.addWorksheet("Sheet 1")
      ws.cell(1, 1).number(100)
      wb.write("myfirstexcel.xlsx", res)
})
app.post("/test", async (req, res) => {
      let arrBeacon = []
      let arrDeauth = []
      let arrProbe = []
      try {
            await axios
                  .get("https://finalprojectcoe.firebaseio.com/beacon.json")
                  .then((response) => {
                        for (i in response.data) {
                              if (
                                    moment(response.data[i].time).isAfter(
                                          req.body.startDate
                                    ) &&
                                    moment(response.data[i].time).isBefore(
                                          req.body.endDate
                                    )
                              )
                                    arrBeacon.push(response.data[i])
                        }
                  })
            await axios
                  .get("https://finalprojectcoe.firebaseio.com/deauth.json")
                  .then((response) => {
                        for (i in response.data) {
                              if (
                                    moment(response.data[i].time).isAfter(
                                          req.body.startDate
                                    ) &&
                                    moment(response.data[i].time).isBefore(
                                          req.body.endDate
                                    )
                              )
                                    arrDeauth.push(response.data[i])
                        }
                  })
            await axios
                  .get("https://finalprojectcoe.firebaseio.com/probe.json")
                  .then((response) => {
                        for (i in response.data) {
                              if (
                                    moment(response.data[i].time).isAfter(
                                          req.body.startDate
                                    ) &&
                                    moment(response.data[i].time).isBefore(
                                          req.body.endDate
                                    )
                              )
                                    arrProbe.push(response.data[i])
                        }
                  })
            var wb = new xl.Workbook()

            var wsBeacon = wb.addWorksheet("Beacon")
            let wsBeaconIndex = 2
            wsBeacon.cell(1, 1).string("time")
            wsBeacon.cell(1, 2).string("count")
            wsBeacon.column(1).setWidth(20)
            arrBeacon.forEach((item) => {
                  wsBeacon
                        .cell(wsBeaconIndex, 1)
                        .string(
                              moment(item.time)
                                    .utcOffset("+0700")
                                    .format("DD/MM/YYYY HH:mm")
                                    .toString()
                        )
                  wsBeacon.cell(wsBeaconIndex, 2).string(item.count.toString())
                  wsBeaconIndex++
            })

            var wsDeauth = wb.addWorksheet("Deauth")
            let wsDeauthIndex = 2
            wsDeauth.cell(1, 1).string("time")
            wsDeauth.cell(1, 2).string("count")
            wsDeauth.column(1).setWidth(20)
            arrDeauth.forEach((item) => {
                  wsDeauth
                        .cell(wsDeauthIndex, 1)
                        .string(
                              moment(item.time)
                                    .utcOffset("+0700")
                                    .format("DD/MM/YYYY HH:mm")
                                    .toString()
                        )
                  wsDeauth.cell(wsDeauthIndex, 2).string(item.count.toString())
                  wsDeauthIndex++
            })

            var wsProbe = wb.addWorksheet("Probe")
            let wsProbeIndex = 2
            wsProbe.cell(1, 1).string("time")
            wsProbe.cell(1, 2).string("count")
            wsProbe.column(1).setWidth(20)
            arrProbe.forEach((item) => {
                  wsProbe
                        .cell(wsProbeIndex, 1)
                        .string(
                              moment(item.time)
                                    .utcOffset("+0700")
                                    .format("DD/MM/YYYY HH:mm")
                                    .toString()
                        )
                  wsProbe.cell(wsProbeIndex, 2).string(item.count.toString())
                  wsProbeIndex++
            })
            return wb.write("report.xlsx", res)
      } catch (err) {
            return res.status(401).send("export failed")
      }
})
app.listen(5000, () => {
      console.log("server on port: 5000")
})
