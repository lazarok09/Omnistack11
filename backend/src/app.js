const express = require('express'); //importando pacote express
/* --- importar as rotas de routes js ---*/

/* importar modulo de segurança CORS */
const cors = require('cors');
/* importar o módulo de erros do Celebrate */
const { errors } = require('celebrate');
const routes = require('./routes'); //o ponto barra é pra lembrar que é um arquivo e nao um pacote.

const app = express()
app.use(cors())

app.use(express.json());
app.use(routes);
/* tratativa de erros */
app.use(errors());

module.exports = app;