function getConnectionString(options = {}) {

  const { user, pass, host, base, port } = options;

  if (port)
    return `mongodb://${user}:${pass}@${host}:${port}/${base}`

  return `mongodb+srv://${user}:${pass}@${host}/${base}`
}


module.exports = {
  getConnectionString
}
