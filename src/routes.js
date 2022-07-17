const routes = require('express').Router()

// Middlewares
const authMiddleware = require('./app/middleware/auth')

// Controllers
const SessionController = require('./app/controllers/SessionController')
const UserController = require('./app/controllers/UserController')

// Validador
const validator = require('./app/validators')

// Loga
routes.post('/sessions', validator('Session/Store'), SessionController.store)

// Cria o usuário
routes.post('/users', validator('User/Store'), UserController.store)

// Aplica necessidade de autenticação a todas as rotas a partir daqui
routes.use(authMiddleware)

// Página de dashboard
routes.get('/dashboard', (req, res) => res.status(200).send())


module.exports = routes;
