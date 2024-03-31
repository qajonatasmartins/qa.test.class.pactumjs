const { spec } = require('pactum');

describe('Posts', () => {

    const _spec = spec();

    it('should make a request to json-placeholder', async () => {
        _spec.get('http://jsonplaceholder.typicode.com/posts/{id}');
    });

    it('should get first post', async () => {
        _spec.withPathParams('id', '1');
    });

    it('should receive a response', async () => {
        await _spec.toss();
    });

    it('should have a status code of 200', async () => {
        _spec.response().to.have.status(200);
    });

    it('should have a user id of 1', async () => {
        _spec.response().to.have.json('userId', 1);
    });
})

// Gherkin style
describe('should have a user with name bolt', () => {

    before(async () => {
        this.spec = spec()
    })

    it('given that I make a request to json-placeholder', async () => {
        await this.spec
            .get('http://jsonplaceholder.typicode.com/posts/{id}')
            .withPathParams('id', '1')
    })

    it('when return a response', async () => {
        await this.spec.toss()
    })

    it('then return a status 200', async () => {
        await this.spec.response().to.have.status(200)
    })

    after(async () => {
        this.spec.end();
    })
})