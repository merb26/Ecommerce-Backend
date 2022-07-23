const fs = require('fs')

class Container {

    constructor(nameFile) {
        this.nameFile = nameFile
    }
/* -------------------------------------------------------------------------- */
/*                                    save                                    */
/* -------------------------------------------------------------------------- */
    async save(obj) {
        try {
            const contents = await fs.promises.readFile(this.nameFile, 'utf-8')
            return this.writeSave(obj, JSON.parse(contents))
        } catch (error) {
            console.log(error)
            try {
                await fs.promises.writeFile(this.nameFile, '')
                return this.writeSave(obj)
            } catch (error) {
                console.log(error)
            }
        }
    }

    async writeSave(obj, contents) {
        try {
            if (contents) {
                let id
                contents.map(element => id = element.id + 1)
                contents.push({...obj,id: id})
                await fs.promises.writeFile(this.nameFile, JSON.stringify(contents, null, 2))
                console.log("Fue guardado con éxito, el id del producto es: " + id)
            } else {
                await fs.promises.writeFile(this.nameFile, JSON.stringify([{...obj,id: 1}], null, 2))
                console.log("Fue guardado con éxito, el id del producto es: " + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   getById                                  */
    /* -------------------------------------------------------------------------- */
    async getById(number) {
        try {
            let contents = await fs.promises.readFile(this.nameFile, 'utf-8')
            contents = JSON.parse(contents)
            let isFind = false
            for (const iterator of contents) {
                if(iterator.id === number){
                    console.log(iterator)
                    isFind = true
                    break
                }
            }
            !isFind && console.log("No se pudo encontrar el producto")
        } catch (error) {
            console.log(error)
            console.log("No hay productos, debe agregar un producto")
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   getByRandom                                  */
    /* -------------------------------------------------------------------------- */
    async getByRandom() {
        try {
            let contents = await fs.promises.readFile(this.nameFile, 'utf-8')
            contents = JSON.parse(contents)
            const number = Math.ceil(Math.random()*contents.length)
            let isFind = false
            for (const iterator of contents) {
                if(iterator.id === number){
                    isFind = true
                    return iterator
                }
            }
            if(!isFind) return "No se pudo encontrar el producto"
        } catch (error) {
            console.log(error)
            console.log("No hay productos, debe agregar un producto")
        }
    }
    
    /* -------------------------------------------------------------------------- */
    /*                                   getAll                                   */
    /* -------------------------------------------------------------------------- */
    async getAll() {
        try {
            let contents = await fs.promises.readFile(this.nameFile, 'utf-8')
            return contents = JSON.parse(contents)
            // for (const iterator of contents) console.log(iterator)
        } catch (error) {
            console.log(error)
            console.log("No hay productos, debe agregar un producto")
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 deleteById                                 */
    /* -------------------------------------------------------------------------- */
    async deleteById(number) {
        try {
            const contents = await fs.promises.readFile(this.nameFile, 'utf-8')
            this.writeDeleteById(number, JSON.parse(contents))
        } catch (error) {
            console.log(error)
            console.log("No hay productos almacenados")
        }
    }

    async writeDeleteById(number, contents) {
        try {
            let isFind = false
            for (let index = 0; index < contents.length; index++) {
                if(contents[index].id === number){
                    contents.splice(index, 1)
                    isFind = true
                    await fs.promises.writeFile(this.nameFile, JSON.stringify(contents, null, 2))
                    console.log("El producto fue eliminado con éxito");
                    break
                }
            }
            !isFind && console.log("No existe el producto")
        } catch (error) {
            console.log(error)
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                  deleteAll                                 */
    /* -------------------------------------------------------------------------- */
    async deleteAll() {
        try {
            await fs.promises.unlink(this.nameFile)
            console.log("Eliminó todos los productos con éxito")
        } catch (error) {
            console.log(error)
            console.log("No hay productos");
        }
    }

}

module.exports = Container;