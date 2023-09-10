const  server = require('../server')
    , should = require('chai').should()
    , request = require('supertest')(server);


describe('/api/usuario', function () {
    it('deve retornar status 200 ao fazer GET /api/usuarios', async  () => {
        const res = await request.get("/api/usuarios");
        res.status.should.equal(200);
    });

    it('deve retornar status 200 ao fazer GET /api/usuario/1', async  () => {
        const res = await request.get("/api/usuario/1");
        res.status.should.equal(200);
    });

    it('deve retornar um token o fazer POST /api/login', async () => {
        let login = { email: "teste@teste",senha: "Teste"};
        const res = await request.post('/api/login')
        .send(login);
        console.log('object :>> ', res.dat);
        should.exist(res.data.token);
        })


});


