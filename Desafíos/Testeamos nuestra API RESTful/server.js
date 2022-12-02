const { config } = require("./config")

const listenerServer = app => {
  app.listen(config.PORT, () => {
    console.log(`***** RUNNING ON PORT ${config.PORT} *****`)
  })
}

module.exports = { listenerServer }
