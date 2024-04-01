const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')
const { allure } = require("allure-mocha/runtime");

describe(produtcName, () => {

    let user

    it('Atualizar usuário no Serverest', async () => {
        allure.epic("Usuários");
        allure.feature("Alterar usuário");
        allure.story("Alterar por ID");
        user = await _spec()
            .name('Cadastrar usuário')
            .post('$M{environments.serverest}/usuarios')
            .withHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .withBody({
                '@DATA:TEMPLATE@': 'newUser',
            })

        await _spec()
            .name('Alterar usuário')
            .put(`$M{environments.serverest}/usuarios/${user.json._id}`)
            .withBody({
                '@DATA:TEMPLATE@': 'changeUser',
            })
            .expectStatus(200)
            .expectJsonLike({
                message: "Registro alterado com sucesso"
            })
    })
})