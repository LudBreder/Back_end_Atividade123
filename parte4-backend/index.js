const express = require('express');
const bodyparser = require('body-parser');
const app = express();
// middleware server como uma ponte entre a aplicação servidor web e o usuário
//vai ser executado independente da rota que você definir
// next conecta um ou mais middlewares 
const meu_middleware = function(req, res, next){
    console.log("Executando o Middleware");
    next();
}
app.use(meu_middleware);


let get_request_time = function(req, res, next){
    let tempo_atual = Date.now();
    //converter para uma data
    let hoje = new Date(tempo_atual);
    //transforma o tempo em uma string com dia, mês e ano
    req.request_time = hoje.toUTCString();
    next();
}

app.use(get_request_time);

//get vai "lidar" com o acesso dos usuários
app.get('/tempo', (req, res) => {
    res.send("Olá! Você acessou em " + req.request_time);
    console.log("Middleware de tempo chamado");
});
app.get('/', (req, res) => {
    res.send("Estou no endereço raiz");
});
// só será executado para a pasta Raiz
/*app.use('/teste', function(req, res, next){
    console.log("Início");
    next();
});

app.get('/', (req, res, next) => {
    res.send("Meio");
});
app.use('/teste', function(req, res){
    console.log("Fim");
});*/
// bodyparser recebe todo o conteúdo da tag body -extend false body mais enxuto
app.use(bodyparser.urlencoded({extended: false}));
// especificar a pasta com os arquivos públicos
//dirname diretório 
app.use('/login', express.static(__dirname + '/public/login'));
//passa as informações do formulário para o servidor
app.post('/login', (req, res) =>{
console.log("Login:" + req.body.login_campo);
console.log("Senha:" + req.body.senha_campo);

res.redirect('/');
});

app.get('*', (req, res) => {
    res.send("Link inválido: 404");
});

app.listen(3000, () => console.log("Servidor escutando na porta 3000..."));