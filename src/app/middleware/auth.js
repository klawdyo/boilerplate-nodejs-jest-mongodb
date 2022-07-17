const jwt = require('jsonwebtoken');
// const authConfig = require('../../config/auth.json');


module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  // Verificando o formato do token
  // começa com a palavra Bearer 21312h3i1u2h312h3123iu12i3uy1i2u3yi1y3
  const parts = authHeader.split(' ');
  // Após divir o token, verifica se contém duas parts
  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error' });
  }

  const [scheme, token] = parts;

  // Verifica se existe o bearer 
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token malformatted' });
  }


  // Verificando o token
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    // Ele pode até ter enviado um token, mas não bateu com o que foi definido
    if (err) {
      return res.status(401).send({ error: 'Token invalid' });
    }

    // Crio na requisição um campo userId que contém o valor do id que existe 
    // na variável para transformar em um campo da requisição
    req.userId = decoded.id;

    return next();


  });

};
// const jwt = require('jsonwebtoken')
// const { promisify } = require('util')


// module.exports = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ message: 'token not provided' })
//   }

//   const [, token] = authHeader.split(' ')

//   try {
//     const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
//     req.userId = decoded.id;
//     return next()
//   } catch (error) {
//     return res.status(401).json({ message: 'invalid token' })
//   }
// }
