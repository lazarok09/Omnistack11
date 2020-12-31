
const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
      const { page = 1 } = request.query; 

      const [count] = await connection('incidents').count()
      

      const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select( ['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'] );

      
      response.header('X-Total-Count', count['count(*)'])

      return response.json(incidents);    

    },
    async create(request, response) {
        const { title, description, value} = request.body
        /*-- a informação de ID é uma autenticação, algo que necessit de uma segurança a mais por isso,
        não deve ser passada por rotas nem recebida pelo request body */
        
        /*-- portanto informações importante de autenticação são recebidas pelo request.headers não body */
        const ong_id = request.headers.authorization;
        /*--- segundo o Diego o primeiro valor de incidents é o ID, e incidents vem em array por isso ele
        usa o [] pra desestruturar e salvar na variável ID o id da ong que está acessando o banco */
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        
        return response.json({ id })
    },
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first(); // vai retornar só o primeiro
        /* criada validação se o id que quer ser deletado não é da ONG que criou não é possível deletar */
        if (incident.ong_id != ong_id) {
        return response.status(401).json({error: 'Operation not permitted.'}) // mensagem de erro
        }
        await connection('incidents').where('id', id).delete();
        return response.status(204).send(); // resposta de sucesso sem conteudo
    },
};