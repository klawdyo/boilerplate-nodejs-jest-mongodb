// importação de todos os controllers
const fs = require('fs');
const path = require('path');

module.exports = app => {

  // Importo o fs e leio o diretório atual para que ele exporte todos os arquivos de uma vez, 
  // excluindo apenas os arquivos que iniciam com "." para eliminar os arquivos de configuração
  // e o próprio arquivo index.js
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.js')))
    .forEach(file => require(path.resolve(__dirname, file))(app));
}
