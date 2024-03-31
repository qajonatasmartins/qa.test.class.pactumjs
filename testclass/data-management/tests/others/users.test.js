const { _spec } = require("../../constants")

describe('Criar usuário', () => {

    it('Deve criar um usuário', async () => {
        await _spec()
            .post('https://reqres.in/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'Users:Admin'
            })
            .expectStatus(201)
    })

    it('Deve criar um usuário com nome', async () => {
        await _spec()
            .post('https://reqres.in/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'Users:Admin',
                '@REMOVES@': ['name']
            })
            .expectStatus(201)
    })

    it('Deve criar um usuário com job vazio', async () => {
        await _spec()
            .post('https://reqres.in/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'Users:Admin',
                '@OVERRIDES@': {
                    'job': ''
                }
            })
            .expectStatus(201)
    })


})

describe('Buscar usuário', () => {

    it('Deve buscar um usuário por id', async () => {
        await _spec()
            .get('/api/users/2')
            .expectStatus(200)
            .expectJson({
                data: {
                    '@DATA:TEMPLATE@': 'Users:Janet'
                },
                support: {
                    "url": "$M{Environments.Production}/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                }
            })
    })

})