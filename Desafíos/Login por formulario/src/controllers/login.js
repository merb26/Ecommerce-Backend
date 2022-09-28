const loginMongodb = {
  startSesion: (req, res) => {
    const { name } = req.body

    req.session.name = name.toUpperCase()

    res.json("{user: ok}")
  },
  authentic: (req, res, next) => {
    const { name } = req.session

    if (name) {
      return next()
    }
    return res.render(`login`)
  },
}

module.exports = { loginMongodb }
