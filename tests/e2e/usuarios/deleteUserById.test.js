const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')
const { allure } = require("allure-mocha/runtime");
describe(produtcName, () => {

    let user

    it('Deletar usuário no Serverest', async () => {
        allure.epic("Usuários");
        allure.feature("Deleção de usuário");
        allure.story("deletar usuário por ID");
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
            .name('Deletar usuário por id')
            .delete(`$M{environments.serverest}/usuarios/${user.json._id}`)
            .expectStatus(200)
            .expectJsonLike({
                message: "Registro excluído com sucesso"
            })
    })
})