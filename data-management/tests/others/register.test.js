const { _spec } = require('../../constants'),
    { like } = require('pactum-matchers') /** Matching */

describe('Registrar usuário', () => {

    it('Deve registrar um usuário', async () => {
        await _spec()
            .post('/api/register')
            .withJson({
                '@DATA:TEMPLATE@': 'Credentials:Eve'
            })
            .expectStatus(200)
            .expectJsonMatch({
                "id": like(4),
                "token": like("some-token")
            })
    })
})