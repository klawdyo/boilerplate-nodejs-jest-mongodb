const { validateAll } = require('indicative/validator')

module.exports = async function (req, res, next) {
  try {

    const rules = {
      password: 'required',
      email: 'required|email'
    }

    const messages = {
      required: (field) => `${field} é obrigatório`,
      email: 'E-mail inválido',
    }

    return validateAll(req.body, rules, messages)
      .then(() => next())
      .catch(error => res.status(401).json({ error: true, messages: error }))

  } catch (error) {
    return res.status(401).json({ error: true, message: error.message })
  }
}
