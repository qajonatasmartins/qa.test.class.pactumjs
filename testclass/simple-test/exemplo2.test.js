const { handler, spec } = require('pactum')

/** Referência do addSpecHandler: https://pactumjs.github.io/api/handlers/addSpecHandler.html */
handler.addSpecHandler('get random user', (ctx) => {
    const { spec } = ctx
    spec.get('https://randomuser.me/api')
    spec.expectStatus(200)
})

describe('Exemplo 02 - Usando o addSpecHandler', () => {

    before('Before executado antes do it para "obter usuário aleatório"', () => {
        handler.addSpecHandler('obter usuário aleatório', (ctx) => {
            const { spec } = ctx
            spec.get('https://randomuser.me/api')
            spec.expectStatus(200)
        })
    })

    it('Deve obter uma resposta com um usuário aleatório', async () => {

        await spec('obter usuário aleatório')
            .expectJsonLike({
                "results": [
                    {
                        "dob": {
                            "age": '$V > 0' /** Usando o expression para validar se a idade é maior que 0 */
                        }
                    }
                ]
            })
        /** Referência do expression: https://pactumjs.github.io/api/matching/expression.html */
    })
})