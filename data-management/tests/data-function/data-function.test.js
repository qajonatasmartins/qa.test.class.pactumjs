const { /* stash, */ handler } = require('pactum'),
    { faker } = require('@faker-js/faker'),
    { expression } = require('pactum-matchers'),
    { _spec } = require('../../constants')



// stash.addDataTemplate({
//     'Users:dataFuntion': {
//         "name": "$F{GerarNome}", /** Criei uma função para retornar um nome */
//         "job": "leader"
//     }
// })

describe('Data-Function PactumJS', () => {

    it('Deve registrar um usuário usando Data-Function', async () => {
        await _spec()
            .post('/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'Users:dataFuntion',
            })
            .expectStatus(201)
            .expectJsonMatch({ /** Usa o expectJsonMatch para poder usar os Matchs */
                name: expression('$V.length > 0'), /** Depois de usar expectJsonMatch ai é possivel usar os matchs como o expression */
                job: 'leader'
            })
    })
})