// biblioteca que faz os tests usando http
const request = require('supertest');

// Biblioteca inicial do app. não usa o listen() por isso o listen
// só foi colocado dentro do server.js e não dentro do app.js. O
// supertest receberá esta constante app como parâmetro e ele será
// responsável por criar o seu próprio servidor para rodar os testes
const app = require('../../src/app');

// Model de usuários
const User = require('../../src/app/models/User');

// Factory
const factory = require('../factories')

// 
const { truncateUser, closeConnection } = require('../utils/hooks')

describe('Users', () => {

  beforeEach(async () => {
    await truncateUser()
  })


  it('should store a user', async () => {

    const response = await request(app)
      .post('/users')
      .send({
        email: 'klawdyo@gmail.com',
        password: '1234567890',
        password_confirmation: '1234567890',
        name: 'Claudio Medeiros'
      })

    expect(response.status).toBe(200)
    // não mostrar password
    expect(response.body).not.toHaveProperty('password')
    // mostrar os campos name e email
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('_id')
  })


  it('should not store a user with invalid email', async () => {

    const response = await request(app)
      .post('/users')
      .send({
        email: 'klawdyogmail.com',
        password: '1234567890',
        password_confirmation: '1234567890',
        name: 'Claudio Medeiros'
      })

    console.log(response.body)

    expect(response.status).toBe(401)
    // mostrar os campos error e messages
    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('messages')
  })


  it('should not store a user with different passwords', async () => {

    const response = await request(app)
      .post('/users')
      .send({
        email: 'klawdyo@gmail.com',
        password: '1234567890',
        password_confirmation: '1234567890_',
        name: 'Claudio Medeiros'
      })

    console.log(response.body)

    expect(response.status).toBe(401)
    // mostrar os campos error e messages
    expect(response.body).toHaveProperty('error')
    expect(response.body).toHaveProperty('messages')
  })











  afterAll(async () => {

    await closeConnection()

  })


})

