const { serviceInfo } = require("../services/info")

const controllerInfo = {
  getInfo: (req, res) => {
    const info = serviceInfo.getInfoProcess(req)

    res.render("info", { info })
  },
}

module.exports = { controllerInfo }
