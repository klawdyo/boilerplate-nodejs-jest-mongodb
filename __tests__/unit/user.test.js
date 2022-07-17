// Model de usuários
const User = require('../../src/app/models/User');


// 
const mongoose = require('../../src/config/database')

// Factory
const factory = require('../factories')


const bcrypt = require('bcryptjs');
const { truncateUser, closeConnection } = require('../utils/hooks')

describe('User', () => {

  beforeEach(async () => {
    await truncateUser()
  })


  afterAll(async () => {
    await closeConnection()
  })


  it('should encypt user password ', async () => {
    const user = await factory.create('User', {
      password: '1234567890'
    })

    const hash = await bcrypt.hash('1234567890', 10)
    const compareHash = await bcrypt.compare('1234567890', user.password);
    expect(compareHash).toBe(true)
  })

})
