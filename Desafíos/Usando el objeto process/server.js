const { config } = require("./config")

const listenerServer = app => {
  app.listen(config.PORT, () => {
    console.log(`Running on port ${config.PORT}`)
  })
}

module.exports = { listenerServer }
