const { e2e, mock, settings, handler } = require('pactum')
const { _flow, _reporter, version, _pf } = require('../../../constants')
const { faker } = require('@faker-js/faker')

function mockAPI() {
    mock.addInteraction({
        provider: 'eee',
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
        provider: 'ccc',
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
        provider: 'bbb',
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

function addFlowReporter() {
    _pf.config.url = 'http://localhost:8080'; // pactum flow server url
    _pf.config.projectId = 'qatestclasspactumjs';
    _pf.config.projectName = 'qatestclasspactumjs';
    _pf.config.version = version;
    _pf.config.username = 'admin';
    _pf.config.password = 'admin';
    _pf.config.checkQualityGate = true;
    _reporter.add(_pf.reporter);
}

describe('Exemplo 03 - Teste end-2-End', () => {

    /** 
     * e2e(<name>)
     * O método cria uma nova instância do caso de teste de e2e. 
     * Use esta instância para criar etapas de teste e etapas de limpeza. 
     * */
    // let test_case = e2e('Adicionar Usuario') /** Aqui é criado o caso de teste 'Adicionar Usuario' */

    mockAPI() /** Mock da API */

    before(async () => {
        /** Define o nível de log interno do PactumJS. 
         * Níveis de log disponíveis: VERBOSE, TRACE, DEBUG, INFO, WARN, ERROR, SILENT*/
        addFlowReporter();
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
        // await test_case.step('Criar Usuario')
        await _flow(`user flow CCC`)
            // .spec()
            .post('http://localhost:9877/api/users')
            .withJson({
                "name": "snow"
            })
            .expectStatus(200)
        // .clean() /** Etapa para ser executada no final quando chamar o cleanup */
        // .delete('http://localhost:9877/api/users')
        // .withJson({
        //     "name": "snow"
        // })
        // .expectStatus(200)

        await _flow(`user flow DDD`)
            .get('http://httpbin.org/status/200')
            .expectStatus(200)
    })

    it('Buscar Usuario', async () => {
        // await test_case.step('Buscar Usuario')
        //     .spec()
        await _flow(`user flow BBB`)
            .get('http://localhost:9877/api/users/snow')
            .expectStatus(200)
            .expectJson({
                "name": "snoww"
            })
    })

    after(async () => {
        await _reporter.end();
        // await test_case.cleanup() /** Executa a limpeza do usuário */
        /** Finaliza a execução do mock */
        await mock.stop()
    })
})