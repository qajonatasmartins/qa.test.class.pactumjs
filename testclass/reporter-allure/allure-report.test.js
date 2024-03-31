const { spec } = require('pactum')

describe('Relatório Allure-Reports', () => {
    it('should successfully pass the test for single user GET API', async () => {
        await spec()
            .get('https://reqres.in/api/users/2')
            .expectStatus(200)
            .expectJsonMatch('data.id', 2)
            .expectJsonMatch('data.first_name', 'Janet')
    })
})