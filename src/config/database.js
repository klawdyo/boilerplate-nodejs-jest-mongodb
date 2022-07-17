require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const mongoose = require('mongoose');
const { getConnectionString } = require('../lib/connectionString')



const connectionString = getConnectionString({
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
  host: process.env.MONGO_HOST,
  base: process.env.MONGO_BASE,
  port: process.env.MONGO_PORT,
})

mongoose.connect(connectionString, { useNewUrlParser: true });

// Define a classe de promise que o mongoose irá utilizar, que é a classe global
//de promise do node
mongoose.Promise = global.Promise;

module.exports = mongoose;
