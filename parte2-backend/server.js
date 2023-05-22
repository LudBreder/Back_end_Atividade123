const http = require('http');
const url = require('url'); // permite "resolver" e fazer o parser de uma aplicação
const fs = require('fs'); // interação com sistemas de arquivos
const path = require('path'); //lidar com caminho de arquivos, extensões  - juntar nomes da pasta do servidor

const hostname = '127.0.0.1';
const port = 3000;
//media type, multipurpose internet mail extension é um padrão que indica a natureta
//e o formato de um arquivo
//definir que tipos de arquivo a minha aplicação vai poder acessar e manipular
const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  png: "image/png",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  woff: "font/woof"
};
//requisição e resposta que daremos ao usuário
http.createServer((req, res) =>{
  //guarda o acesso da url que foi feito.
  //uri endereço para qualquer recursos que vc queira acessar.
  let acesso_uri = url.parse(req.url).pathname;
// o caminho até a pasta onde está a execução do projeto node
//decodeURI formata o caractere impedindo que torne um endereço inválido.
let caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri));
console.log(caminho_completo_recurso);

let recurso_carregado;
try{
  recurso_carregado = fs.lstatSync(caminho_completo_recurso);
} catch (error){
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('404: Arquivo não encontrado!');
  res.end();
}
if (recurso_carregado.isFile()){
  let mimeType = mimeTypes[path.extname(caminho_completo_recurso).substring(1)];

  res.writeHead(200, {'Content-Type': mimeType});
  //metodo vai carregar o arquivo
  let fluxo_arquivo = fs.createReadStream(caminho_completo_recurso);
  //transmite o arquivo para o cliente
  fluxo_arquivo.pipe(res);
}else if(recurso_carregado.isDirectory()){
  res.writeHead(302, {'Location': 'index.html'});
  res.end();
} else{
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.write("500: Erro interno do servidor!")
  res.end();
}
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Ok!');
  res.end();
}).listen(port, hostname, () => {
  console.log(`Server is running at https://${hostname}:${port}`);
});
