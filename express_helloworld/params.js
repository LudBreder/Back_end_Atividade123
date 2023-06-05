let express = require('express');
//router cuida do roteamento para trabalhar arquivos separados.
let router = express.Router();

// p substituido por algum parâmetro que o usuário passou.
router.get('/:p', (req, res) => {
    res.send("Você informou o parâmetro " + req.params.p);
});

router.get('/user/:u/nome/:n', (req, res) => {
    res.send("Você acessou informações do usuário " + req.params.u + " de nome " + req.params.n);
});

module.exports = router;