const fs = require("fs")

class Container {
  constructor(nameFile) {
    this.nameFile = nameFile
  }

  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    try {
      const contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return this.writeSave(obj, JSON.parse(contents))
    } catch (error) {
      console.log(error)
      try {
        await fs.promises.writeFile(this.nameFile, "")
        return this.writeSave(obj)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async writeSave(obj, contents) {
    try {
      let id

      if (contents) {
        if (contents.length === 0) {
          id = 1
        } else {
          contents.map(element => (id = element.id + 1))
        }

        contents.push({ ...obj, id: id })

        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify(contents, null, 2)
        )
        return { message: "Fue guardado con éxito" }
      } else {
        await fs.promises.writeFile(
          this.nameFile,
          JSON.stringify([{ ...obj, id: 1 }], null, 2)
        )

        id = 1
        return { message: "Fue guardado con éxito" }
      }
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    try {
      let contents = await fs.promises.readFile(this.nameFile, "utf-8")
      return (contents = JSON.parse(contents))
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = { Container }
