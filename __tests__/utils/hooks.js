const mongoose = require('../../src/config/database')
const User = require('../../src/app/models/User')


module.exports = {

  truncateUser: async () => {
    await User.deleteMany()
  },


  closeConnection: async () => {
    try {
      await mongoose.disconnect()
      for await (conn of mongoose.connections) {
        await conn.close()
      }
    } catch (error) {
      console.log("erro no catch de closeconectio", error)
    }
  }


}
