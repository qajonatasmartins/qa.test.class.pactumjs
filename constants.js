const { stash, handler, e2e, spec, request, flow, reporter } = require("pactum")
const { faker } = require('@faker-js/faker')
const pf = require('pactum-flow-plugin');

const _spec = spec
const _flow = flow
const _reporter = reporter
const _pf = pf
const _e2e = e2e
const version = `1.0.6`

request.setDefaultTimeout(50000)

handler.addDataFuncHandler('getName', () => {
    return faker.person.firstName()
})

handler.addDataFuncHandler('getEmail', () => {
    return faker.internet.email()
})

handler.addDataFuncHandler('getPassword', () => {
    return faker.internet.password()
})

/** loadData - Carrega modelos de dados e mapas de dados do sistema de arquivos */
stash.loadData("./data")

module.exports = {
    _spec, _e2e, _flow, _reporter, _pf, version
}

