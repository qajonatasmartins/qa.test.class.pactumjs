// const { faker } = require('@faker-js/faker')
// const { _spec, _flow, _reporter, _pf, version } = require('../../../constants')
// const { produtcName } = require('../../../data/productName.data')

// describe(produtcName, () => {

//     let user

//     function addFlowReporter() {
//         _pf.config.url = 'http://localhost:8080'; // pactum flow server url
//         _pf.config.projectId = 'qatestclasspactumjs';
//         _pf.config.projectName = 'qatestclasspactumjs';
//         _pf.config.version = version;
//         _pf.config.username = 'admin';
//         _pf.config.password = 'admin';
//         _pf.config.checkQualityGate = true;
//         _reporter.add(_pf.reporter);
//     }

//     // global before
//     before(async () => {
//         addFlowReporter();
//     });

//     // global after
//     after(async () => {
//         await _reporter.end();
//     });

//     it('Atualizar usuário no Serverest', async () => {

//         user = await _spec()
//             .name('Cadastrar usuário')
//             .post('$M{environments.serverest}/usuarios')
//             .withHeaders({
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json'
//             })
//             .withBody({
//                 '@DATA:TEMPLATE@': 'newUser',
//             })

//         await _flow(`user flow EEE`)
//             .name('Alterar usuário')
//             .put(`$M{environments.serverest}/usuarios/${user.json._id}`)
//             .withBody({
//                 '@DATA:TEMPLATE@': 'changeUser',
//             })
//             .expectStatus(200)
//             .expectJsonLike({
//                 message: "Registro alterado com sucesso"
//             })
//     })
// })