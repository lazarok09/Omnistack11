
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('ong_id', ong_id) // onde ong_id da tabela incidents é igual ao ong_id que está requisitando o método
        .select('*');
        
        return response.json(incidents);
    }
}