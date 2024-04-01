// const { faker } = require('@faker-js/faker')
// const { _spec, _flow, _reporter, version, _pf } = require('../../../constants')
// const { produtcName } = require('../../../data/productName.data')

// describe(produtcName, () => {

//     const user = {
//         nome: `${faker.person.firstName()}`,
//         email: `${faker.internet.email()}`,
//         password: `${faker.internet.password()}`,
//         administrador: "true"
//     }

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

//     it('Buscar usuário por {id} no Serverest', async () => {

//         let { json } = await _spec()
//             .name('Cadastrar usuário')
//             .post('$M{environments.serverest}/usuarios')
//             .withHeaders({
//                 'accept': 'application/json',
//                 'Content-Type': 'application/json'
//             })
//             .withBody({
//                 nome: user.nome,
//                 email: user.email,
//                 password: user.password,
//                 administrador: user.administrador
//             })

//         await _flow(`user flow yyy`)
//             .name('Buscar usuário por id')
//             .get(`$M{environments.serverest}/usuarios/${json._id}`)
//             .expectStatus(200)
//             .expectJsonLike({
//                 nome: user.nome,
//                 email: user.email,
//                 password: user.password,
//                 administrador: user.administrador
//             })
//     })
// })