function isEmail(email) {
  return /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(email)
}

module.exports = {
  isEmail
}
