const admin = require("firebase-admin")

class Container {
  constructor(nameCollection) {
    this.db = admin.firestore()
    this.query = this.db.collection(nameCollection)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    save                                    */
  /* -------------------------------------------------------------------------- */
  async save(obj) {
    try {
      const doc = this.query.doc()
      await doc.create(obj)
    } catch (error) {
      console.log(error)
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                   getAll                                   */
  /* -------------------------------------------------------------------------- */
  async getAll() {
    const querySnapshot = await this.query.get()
    const docs = querySnapshot.docs
    return docs
  }
}

module.exports = { Container }
