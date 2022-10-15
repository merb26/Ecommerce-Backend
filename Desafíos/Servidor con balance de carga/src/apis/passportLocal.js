const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy

const { loginMongodb } = require("../controllers/login")

passport.use("login", new LocalStrategy(loginMongodb.passportLogin))

passport.use(
  "signup",
  new LocalStrategy({ passReqToCallback: true }, loginMongodb.passportSignup)
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(loginMongodb.deserialize)

module.exports = { passport }
