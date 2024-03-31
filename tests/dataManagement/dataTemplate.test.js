const { _spec } = require("../../constants")
const { dataManagement } = require("../../data/productName.data")

describe(dataManagement.template, () => {

    it('Deve registrar um usuário usando DATA:TEMPLATE', async () => {
        await _spec()
            .post('$M{environments.reqres}/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'dataTemplate',
            })
            .expectStatus(201)
            .expectJsonLike({
                name: 'morpheus',
                job: 'leader'
            })
    })

    it('Deve registrar um usuário usando OVERRIDES Data-Template', async () => {
        await _spec()
            .post('$M{environments.reqres}/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'dataTemplate',
                '@OVERRIDES@': { /** Usado o '@OVERRIDES@' para definir que aquele template vc quer subistituir somente o atributo job por 'meber' */
                    'job': 'member'
                }
            })
            .expectStatus(201)
            .expectJsonLike({
                name: 'morpheus',
                job: 'member'
            })
    })

    it('Deve registrar um usuário usando REMOVES Data-Template', async () => {

        await _spec()
            .post('$M{environments.reqres}/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'dataTemplateRemove',
                '@REMOVES@': ['job'] /** Apagou o atributo 'Job' no envio do payload */
            })
            .expectStatus(201)
            .expectJsonLike({
                name: 'jonatas'
            })
    })
})