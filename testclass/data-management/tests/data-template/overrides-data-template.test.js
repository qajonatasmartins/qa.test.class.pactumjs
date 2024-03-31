const { _spec } = require('../../constants')
// ,{ stash } = require('pactum')

// stash.addDataTemplate({
//     'User:morpheus': {
//         "name": "morpheus",
//         "job": "leader"
//     }
// })

describe('Data-Template PactumJS', () => {

    it('Deve registrar um usuário usando OVERRIDES Data-Template', async () => {
        await _spec()
            .post('/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'User:morpheus',
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
})