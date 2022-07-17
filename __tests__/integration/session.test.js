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

describe('Authentication', () => {

  afterEach(async () => {
    await truncateUser()
  })

  beforeEach(async () => {
    await truncateUser()
  })


  it('should authenticate with valid credentials', async () => {

    const user = await factory.create('User', {
      password: '1234567890'
    })




    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567890'
      })

    console.log('user', user)
    console.log('respose', response.body)


    expect(response.status).toBe(200)
    expect(response.body).not.toHaveProperty('user.password')
    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
  });

  it('should not authenticate with invalid credentials', async () => {

    const user = await factory.create('User', {
      password: '1234567890'
    })

    // console.log('user', user)
    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567890_'
      })


    expect(response.status).toBe(401)
  });

  it('should return jwt token when authenticated', async () => {

    const user = await factory.create('User', {
      password: '1234567890'
    })


    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '1234567890'
      })


    expect(response.body).toHaveProperty('token')
  });


  it('should be able to access private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '1234567890'
    });

    // executando o generateToken() do model users
    const token = await user.generateToken()

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer ${token}`)


    expect(response.status).toBe(200)

  })

  it('should not be able to access private routes without jwt token', async () => {
    const user = await factory.create('User', {
      password: '1234567890'
    });

    // executando o generateToken() do model users
    // const token = await user.generateToken()

    const response = await request(app)
      .get('/dashboard')
    // .set('Authorization', `Bearer ${token}`)


    expect(response.status).toBe(401)

  })

  it('should not be able to access private routes with invalid jwt token', async () => {
    const user = await factory.create('User', {
      password: '1234567890'
    });

    // executando o generateToken() do model users
    // const token = await user.generateToken()

    const response = await request(app)
      .get('/dashboard')
      .set('Authorization', `Bearer 1234`)


    expect(response.status).toBe(401)

  })









  afterAll(async () => {

    await closeConnection()

  })


})

