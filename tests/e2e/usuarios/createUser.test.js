const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')
const { allure } = require("allure-mocha/runtime");
describe(produtcName, () => {

    it('Cadastrar usuário no Serverest', async () => {
        allure.epic("Usuários");
        allure.feature("Cadastro de usuário");
        allure.story("Cadastrar usuário");
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