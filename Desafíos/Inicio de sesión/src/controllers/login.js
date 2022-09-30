const bcrypt = require("bcrypt")

const { Container } = require("../containers/users")

const container = new Container()

const loginMongodb = {
  startSesion: (req, res) => {
    const { name } = req.body

    req.session.email = name.toLowerCase()

    res.json("{user: ok}")
  },
  authentic: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect("/login")
    }
  },
  saveRegister: (req, res) => {
    const { email, password } = req.body

    const user = {
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
    }

    container.save(user)

    res.render("login")
  },
  passportLogin: (email, password, done) => {
    console.log("passportLogin")
    const users = container.getAll()

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
  deserialize: (id, done) => {
    const users = container.getAll()
    let user = users.find(user => user.id === id)

    done(null, user)
  },
}

module.exports = { loginMongodb }
