const { reporter, flow } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'qatestclasspactumjs';
    pf.config.projectName = 'qatestclasspactumjs';
    pf.config.version = '1.0.18';
    pf.config.username = 'admin';
    pf.config.password = 'admin';
    pf.config.checkQualityGate = true;
    reporter.add(pf.reporter);
}

// global before
before(async () => {
    addFlowReporter();
});

// global after
after(async () => {
    await reporter.end();
});

it('should get a response with status code 200', async () => {
    await flow('get status 200')
        .get('http://httpbin.org/status/200')
        .expectStatus(200)
})

// it('get a product in-stock from inventory-service', async () => {
//     await flow('get a product in-stock')
//         .get('http://localhost:8080/api/inventory-service/products')
//         .withQueryParams('product', 'iPhone')
//         .expectJson({
//             "InStock": true
//         })
//         .expectStatus(200);
// });