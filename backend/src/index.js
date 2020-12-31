const express = require('express'); //importando pacote express
/* --- importar as rotas de routes js ---*/

/* importar modulo de segurança CORS */
const cors = require('cors');

const routes = require('./routes'); //o ponto barra é pra lembrar que é um arquivo e nao um pacote.

const app = express()
app.use(cors())

app.use(express.json());
app.use(routes);
app.listen(3333);