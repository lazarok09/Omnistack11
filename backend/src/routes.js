const express = require('express');

const {celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController')


const routes = express.Router();
/* validação pro corpo da requisição */
routes.post('/sessions',celebrate({
    [Segments.BODY] : Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);

routes.get('/ongs', OngController.index);
// podemos validar querys, routes, body, headers params
routes.post('/ongs', celebrate({
[Segments.BODY] : Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(11).max(12),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),

})
}), OngController.create);

/* validação para logar em profile */
routes.get('/profile', celebrate({
[Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
}).unknown(),
}), ProfileController.index); 

/* validação da paginação */
routes.get('/incidents',celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);

routes.post('/incidents', celebrate({
   [Segments.HEADERS]: Joi.object({
       authorization: Joi.string().required(),
   }).unknown(),
   [Segments.BODY]: Joi.object().keys({
       title: Joi.string().required(),
       description: Joi.string().required(),
       value: Joi.number().required().max(100000)
   })
}), IncidentController.create);

/* validação para deletar um incident */
routes.delete('/incidents/:id', celebrate({
[Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
})
}), IncidentController.delete);


 module.exports = routes; // exportando