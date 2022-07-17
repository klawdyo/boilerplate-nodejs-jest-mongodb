const mongoose = require('../../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



const UserSchema = new mongoose.Schema({
  // Defino a forma como os campos desta collection vão se comportar
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // não virá nos resultados
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }
})

// Hooks
// funcção do mongoose que permite executar uma função antes de salvar
// Usa function ao invés de arrow function para ter acesso ao objeto que
// estamos tentando salvar
// async transforma o retorno da função em um retorno assíncrono. Dessa forma
// eu consigo usar o await no código, permitindo esperar pela resposta sem
// usar promises
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  // substitui a senha salva pelo hash
  this.password = hash;

  // continua a execução
  next();
});


const User = mongoose.model('User', UserSchema);


// verifica a senha
// usa a função pois este checkpassword será chamado a partir de um objeto
// User. Ex.: user.checkpassword('1234'). Portanto o this conterá uma
// instância do objeto já com a senha em hash exposta
User.prototype.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

// Gera o token JWT
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.APP_SECRET)
}

module.exports = User;
