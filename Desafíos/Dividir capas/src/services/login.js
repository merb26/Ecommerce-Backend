const bcrypt = require("bcrypt")
const { generatorProducts } = require("../apis/generateProductsFaker")

const { loggerCons } = require("../apis/logger")
const { config } = require("../../config")
const { Container } = require("../containers/users")

const container = new Container()

const serviceLogin = {
  visualizeLogin: req => {
    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )
  },
  passportLogin: async (email, password, done) => {
    const users = await container.getAll()

    const user = users.find(user => user.email === email)

    if (!user) {
      console.log(`No existe el email ${email}`)
      return done(null, false, { message: "User not found" })
    }

    const isValide = bcrypt.compareSync(password, user.password)
    if (!isValide) {
      console.log("Password incorrecto")

      return done(null, false, { message: "Password incorrect" })
    }

    done(null, user)
  },
  visualizeIndex: req => {
    const products = generatorProducts(5)

    const { user } = req

    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )

    return { products, user }
  },
  signOff: req => {
    req.logout(err => {
      if (err) return next(err)

      loggerCons.info(
        { level: "info" },
        `${req.hostname}:${config.PORT}${req.url}`
      )
    })
  },
  visualizeRegister: () => {
    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )
  },
  errorSesion: () => {
    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )
  },
  errorRegister: () => {
    loggerCons.info(
      { level: "info" },
      `${req.hostname}:${config.PORT}${req.url}`
    )
  },
}

module.exports = { serviceLogin }
