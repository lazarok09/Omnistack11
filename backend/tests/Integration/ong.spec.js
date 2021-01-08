const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");
/* testando rota de criação de uma ONG */
describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });

  it("should be ablle to create a new ONG and login in that ONG", async () => {
    const response = await request(app).post("/ongs").send({
      name: "JEST",
      email: "contatoJester@gmail.com",
      whatsapp: "08197856548",
      city: "Brasil",
      uf: "BR",
    });
    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);

    const response_login = await request(app).post("/sessions").send({
      id: response.body.id,
    });
    expect(response_login.body).toHaveProperty("name");
  });
  /* fim do teste de da rota de criação de uma ong */
});
