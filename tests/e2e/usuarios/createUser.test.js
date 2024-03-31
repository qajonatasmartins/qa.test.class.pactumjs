const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')

describe(produtcName, () => {

    it('Cadastrar usuário no Serverest', async () => {
        await _spec()
            .name('Cadastrar usuário')
            .post('$M{environments.serverest}/usuarios')
            .withHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .withBody({
                '@DATA:TEMPLATE@': 'newUser',
            })
            .expectStatus(201)
            .expectJsonLike({
                message: "Cadastro realizado com sucesso"
            })
    })
})