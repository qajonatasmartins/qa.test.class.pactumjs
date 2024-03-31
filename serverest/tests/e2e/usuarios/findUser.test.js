const { _spec } = require('../../../constants')
const { produtcName } = require('../../../data/productName.data')

describe(produtcName, () => {

    let user

    it('Buscar todos os usuários no Serverest', async () => {

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
            .name('Buscar todos usuário')
            .get('/usuarios')
            .withQueryParams({
                '_id': `${user}`,
                'nome': ``,
                'email': ``,
                'password': ``,
                'administrador': ``
            })
    })
})