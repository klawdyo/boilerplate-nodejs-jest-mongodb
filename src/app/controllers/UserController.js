// const { User } = require('../models')
const User = require('../models/User')


class UserController {
  async store(req, res) {
    try {

      const { name, email, password, password_confirmation } = req.body;


      const user = await User.create({ name, email, password });

      user.password = undefined

      return res.status(200).json(user);

    } catch (error) {
      return res.status(401).json({ error: true, message: error.message })
    }
  }
}

module.exports = new UserController();
