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

describe('Exemplo 03 - Teste end-2-End', () => {

    /** 
     * e2e(<name>)
     * O método cria uma nova instância do caso de teste de e2e. 
     * Use esta instância para criar etapas de teste e etapas de limpeza. 
     * */
    let test_case = e2e('Adicionar Usuario') /** Aqui é criado o caso de teste 'Adicionar Usuario' */

    mockAPI() /** Mock da API */

    before(async () => {
        /** Define o nível de log interno do PactumJS. 
         * Níveis de log disponíveis: VERBOSE, TRACE, DEBUG, INFO, WARN, ERROR, SILENT*/
        settings.setLogLevel('ERROR')
        await mock.start(9877) /** Definindo a porta que o mock vai ser executado localhost:9877 */
    })

    it('Criar Usuario', async () => {
        /**
         * step(<name>) O método cria uma nova instância da etapa de teste e2e. 
         * Ele contém spec() método para executar a solicitação e validar a resposta.
         * Ele é um passo do caso de teste, podendo ter vários passos para testar 
         * aquele caso de teste caso queira deixar ele visualmente mais bonito.
         */
        await test_case.step('Criar Usuario')
            .spec()
            .post('http://localhost:9877/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)
            .clean() /** Etapa para ser executada no final quando chamar o cleanup */
            .delete('http://localhost:9877/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)
    })

    it('Buscar Usuario', async () => {
        await test_case.step('Buscar Usuario')
            .spec()
            .get('http://localhost:9877/api/users/snow')
            .expectStatus(200)
            .expectJson({
                "name": "snow"
            })
    })

    it('Excluir Usuario', async () => {
        await test_case.cleanup() /** Executa a limpeza do usuário */
    })

    after(async () => {
        /** Finaliza a execução do mock */
        await mock.stop()
    })
})