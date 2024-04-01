---
runme:
  id: 01HTAMVFC97RYGPSVVVVBE2B0Z
  version: v3
---

# Test Class

## Quick Start

```bash {"id":"01HTAMVFC97RYGPSVVTT7MQ1ZV"}
npm install -D pactum
```

```bash {"id":"01HTAMVFC97RYGPSVVTWXD6KVQ"}
npm install -D mocha
```

```bash {"id":"01HTAMVFC97RYGPSVVTYSD4WM9"}
npx pactum-init
```

## Running the tests

- Para executar os testes simples

```bash {"id":"01HTAMVFC97RYGPSVVTYYJS33E"}
npm run simple
```

- Para executar os testes com data management (gerenciamento de dados)

```bash {"id":"01HTAMVFC97RYGPSVVV1PHSW3Y"}
npm run dataManagement
```

- Para executar os testes e2e

```bash {"id":"01HTAMVFC97RYGPSVVV57EG412"}
npm run e2e
```

## Open Allure Reports

```bash {"id":"01HTAMVFC97RYGPSVVV8FB7NDA"}
npm run allure
```

## Data Management

### [Loading Data](https://pactumjs.github.io/guides/data-management.html#loading-data)

#### How to use

```javascript {"id":"01HTAMVFC97RYGPSVVV9B9K7PX"}
const { stash } = require('pactum')

stash.loadData(); // Diretório default `./data`

// ou

stash.loadData('diretório desejado') // Exemplo: stash.loadData('./nome_minha_pasta')

```

#### Structure Folder

Carregue o template e maps diretamente do diretório de arquivos usando a função loadData. Você pode agrupar seus templates e maps dentro de pastas de `tamplate` e `maps` ou colocá-los no diretório raiz adicionando o sufixo `.template` ou `.map` aos arquivos json.

- **Exemplo 1**

```yaml {"id":"01HTAMVFC97RYGPSVVV9G6QMH4"}
- data/
  - maps/
    - User.json
  - templates/
    - Address.json
```

- **Exemplo 2**

```yaml {"id":"01HTAMVFC97RYGPSVVVAHMW36V"}
- data/
  - Bank.template.json
  - Army.map.json
```

### [Data Template](https://pactumjs.github.io/guides/data-management.html#data-template)

#### How to use

##### Folder 'template'

```json {"id":"01HTAMVFC97RYGPSVVVASD0AEE"}
{
    "template_name": {
        "attributeA": "value",
        "attributeB": "value"
  }
}
```

##### Folder 'tests'

```javascript {"id":"01HTAMVFC97RYGPSVVVE3CMK6N"}
await spec()
  .post('https://reqres.in/api/users')
  .withJson({
    '@DATA:TEMPLATE@': 'template_name',
  });
```

### [Data Map](https://pactumjs.github.io/guides/data-management.html#data-map)

#### How to use

##### Folder 'maps'

```json {"id":"01HTAMVFC97RYGPSVVVGNPVFG7"}
{
    "map_name":{
        attributeA: "value",
        attributeB: "value",
    }
}
```

##### Folder 'template'

```json {"id":"01HTAMVFC97RYGPSVVVKY8DFGH"}
{
    "dataMap": {
        "name": "$M{map_name.attributeA}",
        "job": "$M{map_name.attributeB}"
  }
}
```

### [Data Function](https://pactumjs.github.io/guides/data-management.html#data-function)

#### How to use

##### Folder 'tests'

```javascript {"id":"01HTAMVFC97RYGPSVVVNSNY67R"}

const { handler, spec } = require('pactum');

handler.addDataFuncHandler('GetTimeStamp', () => {
  return Date.now()
});
handler.addDataFuncHandler('GetAuthToken', () => {
  return 'Basic some-token'
})

await spec()
  .post('/api/order')
  .withHeaders('Authorization', '$F{GetAuthToken}')
  .withJson({
    'Item': 'Sword',
    'CreatedAt': '$F{GetTimeStamp}'
  })

handler.addDataFuncHandler('GetFormattedDate', (ctx) => {
  const fmt = ctx.args[0]
  return moment.format(fmt)
});

handler.addDataFuncHandler('GetSum', (ctx) => {
  const a = parseInt(ctx.args[0])
  const b = parseInt(ctx.args[1])
  return a + b
})

  await spec()
  .post('/api/order')
  .withJson({
    'Item': 'Sword',
    'CreatedAt': '$F{GetFormattedDate:dddd}',
    'Qty': '$F{GetSum:5,10}'
  })
```

### [Data Store](https://pactumjs.github.io/guides/data-management.html#data-store)

#### How to use

##### Folder 'tests'

```javascript {"id":"01HTAMVFC97RYGPSVVVQVWBDE7"}
const { spec } = require('pactum');

it('should return all posts and first post should have comments', async () => {
  await spec()
    .get('http://jsonplaceholder.typicode.com/posts')
    .expectStatus(200)
    .stores('FirstPostId', '[0].id')
    .stores('SecondPostId', '[1].id')
  
  await spec()
    .get(`http://jsonplaceholder.typicode.com/posts/{id}/comments`)
    .withPathParams('id', '$S{FirstPostId}')
    .expectStatus(200)
})
```

## Comando para usar no codespace do github

- [how-preview-a-html-file-github-codespaces](https://stackoverflow.com/questions/74452866/how-preview-a-html-file-github-codespaces)