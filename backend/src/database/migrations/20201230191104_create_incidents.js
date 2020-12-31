
exports.up = function(knex) {
  /* criando tabelas pela documentação do knex */
  return knex.schema.createTable('incidents', function(table) {
      table.increments(); // cada vez que eu crio um novo incident ele atribui um novo id
      
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      // criando um relacionamento = qual coluna esta armazenando esses dados ?
      table.string('ong_id').notNullable();

      // criar chave estrangeira (uma forma de ligar essa tabela ao id de ongs  )
      table.foreign('ong_id').references('id').inTable('ongs') // é assim que criamos uma chave estrangeira


  })
};


exports.down = function(knex) {
// caso der errado apagar a tabela
return knex.schema.dropTable('incidents')  
};
