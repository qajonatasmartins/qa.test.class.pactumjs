const { faker } = require("@faker-js/faker")
const { request, stash, spec, handler } = require("pactum")
const _spec = spec

/** O '$M{variavel}' refere-se a um mapa de dados que carrega o conteúdo daquela váriavel*/
request.setBaseUrl("$M{Environments.Production}");
request.setDefaultTimeout(10000);
/** loadData - Carrega modelos de dados e mapas de dados do sistema de arquivos */
stash.loadData("./data-management/data");

handler.addDataFuncHandler('GerarNome', () => {
  return faker.person.firstName()
})

module.exports = {
  _spec,
};
