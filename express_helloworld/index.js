const express = require('express');
const app = express();

let port = 3000;

//get vai "lidar" com o acesso dos usuários
app.get('/', (req, res) => {
    res.send("Olá! Seja bem-vindo!");
});

app.get('/sobre', (req, res) => {
    res.send("<h1>Você está em uma página Sobre!<h1><br/><p> Aqui é um parágrafo </p>");
    });

app.get('/json', (req, res) =>{
//resposta retornar algo no status 200 OK
//json irá retornar 2 atributos: usuário e o id
res.status(200).json({usuario: "ludmila", id: 123456})
});

app.get('/ab[0-9]cd', (req, res) => {
    res.send("Essa é uma expressão regular!");
});

let params_module= require('./params.js');
app.use('/',  params_module);

app.post('/post/teste_post', (req, res) => {
    res.send("Você acessou uma página via método POST");
});


//* vai servir para qualquer coisa
app.get('*', (req, res) => {
    res.send("Link inválido: 404");
});

//esperando uma resposta do cliente
app.listen(port, () => console.log(`Escutando na porta ${port}`));