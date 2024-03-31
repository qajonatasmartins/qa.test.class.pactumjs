const { stash, handler, e2e, spec, request } = require("pactum")
const { faker } = require('@faker-js/faker')

const _spec = spec
const _e2e = e2e

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
    _spec, _e2e
}

