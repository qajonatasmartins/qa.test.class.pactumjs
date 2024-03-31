const { e2e, mock, settings } = require('pactum')

function mockAPI() {
    mock.addInteraction({
        request: {
            method: 'POST',
            path: '/api/users',
            body: {
                name: "snow"
            }
        },
        response: {
            status: 200,
            body: {
                name: "snow"
            }
        }
    })

    mock.addInteraction({
        request: {
            method: 'GET',
            path: '/api/users/snow'
        },
        response: {
            status: 200,
            body: {
                name: "snow"
            }
        }
    })

    mock.addInteraction({
        request: {
            method: 'DELETE',
            path: '/api/users',
            body: {
                name: "snow"
            }
        },
        response: {
            status: 200
        }
    })
}

describe('Exemplo 03 - Teste end-2-End usando todas etapas dentro de um "it"', () => {

    let test_case = e2e('Adicionar Usuario (IT UNICO)')

    mockAPI()

    before(async () => {
        settings.setLogLevel('ERROR')
        await mock.start(9878)
    })

    it('E2E - Usando todas etapas dentro de um "it"', async () => {
        await test_case.step('Criar Usuario')
            .spec()
            .post('http://localhost:9878/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)
            .clean()
            .delete('http://localhost:9878/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)

        await test_case.step('Buscar Usuario')
            .spec()
            .get('http://localhost:9878/api/users/snow')
            .expectStatus(200)
            .expectJson({
                "name": "snow"
            })
        await test_case.cleanup()
    })

    after(async () => {
        await mock.stop()
    })

})