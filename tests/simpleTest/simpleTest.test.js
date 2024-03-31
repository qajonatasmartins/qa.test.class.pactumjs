const { spec } = require('pactum')

it('should get a response with status code 200', async () => {
    await spec()
        .get('http://httpbin.org/status/200')
        .expectStatus(200)
})