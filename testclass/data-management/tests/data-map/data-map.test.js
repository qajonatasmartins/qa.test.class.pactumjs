const { _spec } = require('../../constants')
// , { stash } = require('pactum')

// stash.addDataMap({
//     'other': {
//         'name': 'jonatas',
//         'job': 'qa lead'
//     }
// })

// stash.addDataTemplate({
//     'Address': {
//         "street": "society road",
//         "pin": 500500
//     }
// })

// stash.addDataTemplate({
//     'User': {
//         "name": "$M{other.name}", /** Pegou o valor de 'jonatas' e atribuiu no lugar de '$M{other.name}' */
//         "job": "$M{other.job}",/** Pegou o valor de 'qa lead' e atribuiu no lugar de '$M{other.job}' */
//         "address": {
//             "@DATA:TEMPLATE@": "Address", /** Adicionou o template de 'Address' */
//         }
//     }
// })

/**
 * Quando um modelo de dados é usado, o objeto atual será substituído.
 * Quando um mapa de dados é usado, o valor da propriedade do objeto atual será substituído.
 */

describe('Data Map PactumJS', () => {

    it('Deve registrar um usuário usando REMOVES Data-Template e Data Map', async () => {
        await _spec()
            .post('/api/users')
            .withJson({
                '@DATA:TEMPLATE@': 'UserDataMap',
                '@REMOVES@': ['job'] /** Apagou o atributo 'Job' no envio do payload */
            })
            .expectStatus(201)
            .expectJsonLike({
                address: { pin: 500500, street: 'society road' },
                name: 'jonatas'
            })
    })
})