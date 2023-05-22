//http transmitir um objeto para o usuário
const http = require('http');
// informar o endereço da aplicação
const hostname= '127.0.0.1';
//informar a porta de acesso
const port =3000;
//colocar esse servidor para funcionar
//req requisição / res - resposta
//writeHead - escrever no cabeçalho - código 200 - código indicando se a funçã foi feita com sucesso
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end("Hello Word!")
}).listen(port, hostname, () => {
  console.log(`O servidor está sendo executado em http://${hostname}:{port}/`);
});
