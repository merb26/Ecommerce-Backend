const { mongoDB, firebase } = require("./connections")
const { controllerMessagesFile } = require("../controllers/file")
const { controllerMessagesMongodb } = require("../controllers/mongoDB")

let controller
const db = ["file", "mongodb", "firebase"]

switch (db[0]) {
  case "file":
    controller = controllerMessagesFile
    break
  case "mongodb":
    mongoDB(
      "mongodb+srv://merb:XcKp9WciORH5TlCS@cluster0.4ryuos8.mongodb.net/ecommerce"
    )
    controller = controllerMessagesMongodb
    break
  case "firebase":
    firebase()
    const { controllerMessagesFirebase } = require("../controllers/firebase")
    controller = controllerMessagesFirebase
    break
}

module.exports = { controller }
