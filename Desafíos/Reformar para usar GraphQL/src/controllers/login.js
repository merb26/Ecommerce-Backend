const bcrypt = require("bcrypt")

const { Container } = require("../dao/users")
const { serviceLogin } = require("../services/login")

const container = new Container()

const loginMongodb = {
  authentic: async (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/")
    }
  },
  passportSignup: async (req, username, password, done) => {
    const users = await container.getAll()

    let user = users.find(user => user.email === username)

    if (user) {
      console.log(`El usuario ${username} ya existe`)
      return done(null, false, { message: "User already exists" })
    }

    let newUser = {
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      email: username,
    }

    const userMongoDB = await container.save(newUser)

    return done(null, userMongoDB)
  },
  deserialize: async (id, done) => {
    const users = await container.getAll()
    let user = users.find(user => user.id === id)

    done(null, user)
  },
  getLogin: async (req, res) => {
    serviceLogin.visualizeLogin(req)

    res.render("login")
  },
  getIndex: (req, res) => {
    const service = serviceLogin.visualizeIndex(req)

    const { user, products } = service

    res.render("index", { user, products })
  },
  getLogout: async (req, res, next) => {
    const { user } = req

    serviceLogin.signOff(req)

    res.render("logout", { user })
  },
  getRegister: async (req, res) => {
    serviceLogin.visualizeRegister

    res.render("register")
  },
  getErrorSesion: (req, res) => {
    serviceLogin.errorSesion

    res.render("errorSesion")
  },
  getErrorRegister: (req, res) => {
    serviceLogin.errorRegister

    res.render("errorRegister")
  },
}

module.exports = { loginMongodb }
