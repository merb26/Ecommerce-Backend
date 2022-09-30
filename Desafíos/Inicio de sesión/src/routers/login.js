const Router = require("express")
const session = require("express-session")

const { generatorProducts } = require("../apis/generateProductsFaker")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const { loginMongodb } = require("../controllers/login")

const routeLogin = Router()

/* -------------------------------------------------------------------------- */
/*                             Passport                                       */
/* -------------------------------------------------------------------------- */
routeLogin.use(
  session({
    secret: process.env.SESSION_SECRET || "123@456",
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 60,
    },
  })
)
routeLogin.use(passport.initialize())
routeLogin.use(passport.session())

passport.use(
  "login",
  new LocalStrategy((email, password, done) => {
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
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(loginMongodb.deserialize)

/* -------------------------------------------------------------------------- */
/*                                Inicio sesión                               */
/* -------------------------------------------------------------------------- */
routeLogin.get("/", (req, res) => {
  res.render("login")
})

routeLogin.post(
  "/index",
  passport.authenticate("login", {
    successRedirect: "/index",
    failureRedirect: "/",
  })
)

routeLogin.get("/index", loginMongodb.authentic, (req, res) => {
  const products = generatorProducts(5)
  const { user } = req

  res.render("index", { user, products })
})

/* -------------------------------------------------------------------------- */
/*                                Cierra sesión                               */
/* -------------------------------------------------------------------------- */
routeLogin.get("/logout", loginMongodb.authentic, async (req, res) => {
  const { name } = req.session
  try {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).send(`{message: No se pudo cerrar sesion}`)
      }
    })
    res.status(200).render("logout", { name })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

/* -------------------------------------------------------------------------- */
/*                                  Registro                                  */
/* -------------------------------------------------------------------------- */
routeLogin.get("/register", (req, res) => {
  res.render("register")
})

routeLogin.post("/register", loginMongodb.saveRegister)

module.exports = { routeLogin }
