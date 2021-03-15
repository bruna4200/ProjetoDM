const app = require('../index');
const request = require('supertest');
const { uuid, isUuid } = require('uuidv4');
const { response } = require('express');

//nome que descreve o meu teste
//acao que vou fazer do teste
describe("Teste 1 - Criar novo estudante", () => {
    it("POST - teste metodo POST estudante", async () => {
        //chamada da API no metodo POST
        const response = await request(app)
            .post("/")
            .send({
                "name": "Luiza",
                "email": "luiza@gmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                "name": "Luiza",
                "email": "luiza@gmail.com"
            }
        });
    });
});


describe("Teste 2 - deletar um estudante que não existe", () => {
    it("DELETE - estudante 123 que não existe", async () => {
        await request(app).delete('/123')
            .expect(404);
    });
});


describe("Teste 3 - atualização de um estudante", () => {
    //2 passos cadastrar um estudante e depois eu vou atualizar ele
    it("POST e PUT - teste metodo atualizar estudante", async () => {
        //chamada da API no metodo POST
        const response = await request(app)
            .post("/")
            .send({
                "name": "Bruna",
                "email": "brunaradin@hotmail.com"
            })
            .expect(200);
        expect(isUuid(response.body.newStudent.id)).toBe(true);
        expect(response.body).toMatchObject({
            "newStudent": {
                "name": "Bruna",
                "email": "brunaradin@hotmail.com"
            }
        });
        //atualizar esse aluno

        const responseUpd = await request(app)
            .put(`/${response.body.newStudent.id}`)
            .send({
                "name": "Bruna Rodrigues Radin",
                "email": "brunaradin@hotmail.com"
            })
            .expect(200);
        expect(responseUpd.body).toMatchObject({
            "name": "Bruna Rodrigues Radin",
            "email": "brunaradin@hotmail.com"
        });
    });
});

afterAll(done => {
    app.close();
    done();
});