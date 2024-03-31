const { _spec } = require("../../constants")
const { dataManagement } = require("../../data/productName.data")


describe(dataManagement.map, () => {

    it('Deve registrar um usuário usando REMOVES Data-Template e Data Map', async () => {
        await _spec()
            .post('$M{environments.reqres}/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'dataMap',
                '@REMOVES@': ['job'] /** Apagou o atributo 'Job' no envio do payload */
            })
            .expectStatus(201)
            .expectJsonLike({
                address: { pin: 500500, street: 'society road' },
                name: 'jonatas'
            })
    })
})