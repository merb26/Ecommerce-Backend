const fs = require("fs")

class ContainerChat {
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
    }
  }

  async writeSave(obj, contents) {
    try {
      contents.push(obj)
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(contents, null, 2)
      )

      console.log("Fue guardado con éxito el mensaje")
    } catch (error) {
      console.log(error)

      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(contents, null, 2)
      )
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
      console.log("No hay productos, debe agregar un producto")
    }
  }
}

module.exports = ContainerChat
