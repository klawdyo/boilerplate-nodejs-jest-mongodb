const User = require('../../models/User')

const { validateAll } = require('indicative/validator')

// Extend o e-mail único
require('../extend')

module.exports = async function (req, res, next) {
  try {

    const rules = {
      password: 'required|confirmed',
      name: 'required',
      email: 'required|email|email_unique'
    }

    const messages = {
      required: (field) => `${field} é obrigatório`,
      email: 'E-mail inválido',
      emailUnique: 'E-mail já cadastrado',
      confirmed: 'As senhas não conferem',
    }

    return validateAll(req.body, rules, messages)
      .then(() => next())
      .catch(error => res.status(401).json({ error: true, messages: error }))

  } catch (error) {
    return res.status(401).json({ error: true, message: error.message })
  }
}
