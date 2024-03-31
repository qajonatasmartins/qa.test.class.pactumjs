const { _spec } = require('../../constants')
// ,{ stash } = require('pactum')


// stash.addDataTemplate({
//     'User:morpheus': {
//         "name": "morpheus",
//         "job": "leader"
//     }
// })

describe('Data-Template PactumJS', () => {

    it('Deve registrar um usuário usando DATA:TEMPLATE', async () => {
        await _spec()
            .post('/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'User:morpheus',
            })
            .expectStatus(201)
            .expectJsonLike({
                name: 'morpheus',
                job: 'leader'
            })
    })
})