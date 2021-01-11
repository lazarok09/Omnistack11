exports.up = function (knex) {
  /* criando tabelas pela documentação do knex */
  return knex.schema.createTable("ongs", function (table) {
    table.string("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("whatsapp").notNullable();
    table.string("city").notNullable();
    table.string("uf", 2).notNullable();
  });
};
// caso der errado apagar a tabela

exports.down = function (knex) {
  return knex.schema.dropTable("ongs");
};
