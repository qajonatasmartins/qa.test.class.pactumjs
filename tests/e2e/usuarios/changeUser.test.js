const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')

describe(produtcName, () => {

    let user

    it('Atualizar usuário no Serverest', async () => {

        user = await _spec()
            .name('Cadastrar usuário')
            .post('/usuarios')
            .withHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .withBody({
                '@DATA:TEMPLATE@': 'newUser',
            })

        await _spec()
            .name('Alterar usuário')
            .put(`/usuarios/${user.json._id}`)
            .withBody({
                '@DATA:TEMPLATE@': 'changeUser',
            })
            .expectStatus(200)
            .expectJsonLike({
                message: "Registro alterado com sucesso"
            })
    })
})