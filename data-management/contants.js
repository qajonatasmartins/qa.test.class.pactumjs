const { request, stash, spec } = require("pactum"),
  _spec = spec;

/** O '$M{variavel}' refere-se a um mapa de dados que carrega o conteúdo daquela váriavel*/
request.setBaseUrl("$M{Environments.Production}");
request.setDefaultTimeout(10000);
/** loadData - Carrega modelos de dados e mapas de dados do sistema de arquivos */
stash.loadData("./pactumjs-qaculture/data-management/data");

module.exports = {
  _spec,
};
