const { mongoose } = require("mongoose")

const { loggerCons } = require("../apis/logger")
const { config } = require("../../config")

class Connection {
  async connection() {
    connDB.mongodb()
  }

  async desconnection() {}
}

const connDB = {
  mongodb: () => {
    try {
      mongoose.connect(config.URL_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      loggerCons.info("Connected database Products MongoDB")
    } catch (error) {
      console.log(error)
    }
  },
}

const desconnDB = {
  otroDB: () => {},
}

module.exports = { Connection }
