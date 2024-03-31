const { expression } = require('pactum-matchers')
const { _spec } = require('../../constants')
const { dataManagement } = require('../../data/productName.data')

describe(dataManagement.function, () => {

    it('Deve registrar um usuário usando Data-Function', async () => {
        await _spec()
            .post('$M{environments.reqres}/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'dataFunction',
            })
            .expectStatus(201)
            .expectJsonMatch({ /** Usa o expectJsonMatch para poder usar os Matchs */
                name: expression('$V.length > 0'), /** Depois de usar expectJsonMatch ai é possivel usar os matchs como o expression */
                job: 'leader'
            })
    })
})