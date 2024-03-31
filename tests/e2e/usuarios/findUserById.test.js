const { faker } = require('@faker-js/faker')
const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')

describe(produtcName, () => {

    const user = {
        nome: `${faker.person.firstName()}`,
        email: `${faker.internet.email()}`,
        password: `${faker.internet.password()}`,
        administrador: "true"
    }

    it('Buscar usuário por {id} no Serverest', async () => {

        let { json } = await _spec()
            .name('Cadastrar usuário')
            .post('$M{environments.serverest}/usuarios')
            .withHeaders({
                'accept': 'application/json',
                'Content-Type': 'application/json'
            })
            .withBody({
                nome: user.nome,
                email: user.email,
                password: user.password,
                administrador: user.administrador
            })

        await _spec()
            .name('Buscar usuário por id')
            .get(`$M{environments.serverest}/usuarios/${json._id}`)
            .expectStatus(200)
            .expectJsonLike({
                nome: user.nome,
                email: user.email,
                password: user.password,
                administrador: user.administrador
            })
    })
})