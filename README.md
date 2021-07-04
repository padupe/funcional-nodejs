# Challenge Funcional Health Tech

Desafio proposto no processo de contratação de **Desenvolvedor Backend Jr Nodejs**.

Link para consulta da proposta: [aqui].

## Ferramentas utilizadas

Para a conclusão deste desafio, as ferramentas abaixo foram aplicadas:

- [node.js] - Eventos voltados para o Backend
- [graphql] - Linguagem de Consulta para API
- [graphqlHTTP] - Módulo fornece uma maneira simples de criar um servidor Express que executa uma API GraphQL
- [express] - Framework
- [prisma] - ORM responsável pela Conexão com o Banco de Dados
- [postgresql] - Sistema gerenciador de Banco de Dados
- [prettier] - "Formatador" de Código
- [eslint] - "Corretor" de erros de Código/Sintaxe
- [jest] - Estrutura de teste de JavaScript
- [supertest] - Módulo para testes de Integração
- [docker] - "Contêinirzação"

## MER

Estrtura do Banco de Dados:

![img](https://github.com/padupe/funcional-nodejs/blob/feature/graphql/readmeimg/MER.png)

## Comandos Úteis para uso da Aplicação

### Development Server

Iniciar o Servidor da Aplicação:

```
    $ yarn dev
```

### Docker

Subir as configurações do contêiner:

```
    $ docker-compose up -d
```

### Prisma

Iniciar Migration:

```
    $ yarn migrate
```

Enviar dados de Teste

```
    $ yarn seed
```

### GraphQL

**Exemplos de Query e Mutations**

Consulta de Conta e Saldo:

```graphql
query {
  saldo(conta: 54321) {
    numero
    saldo
  }
}
```

Saque:

```graphql
mutation {
  sacar(conta: 54321, valor: 140) {
    numero
    saldo
    msg
  }
}
```

Depósito:

```graphql
mutation {
  depositar(conta: 54321, valor: 200) {
    numero
    saldo
    msg
  }
}
```

### Testes

Para rodar os testes:

```
    $ yarn test
```

> **Atenção:** Ao rodar os testes, e necessário enviar novamente os dados para o banco com o comando:

```
    $ yarn seed
```

**_Cobertura dos Testes_**

![img](https://github.com/padupe/funcional-nodejs/blob/feature/graphql/readmeimg/coverage.png)

Para validar o _"coverage"_ dos Testes, basta rodar o comando:

```
    $ yarn test --coverage
```

> Para o bom êxito dos testes, certifique-se que o Servidor e o Contêiner estão em pleno funcionamento.

_Aplicação desenvolvida por Paulo Eduardo Peixoto_

[//]: #
[aqui]: https://github.com/funcional-health/challenge/blob/master/node.md
[node.js]: http://nodejs.org
[graphql]: https://graphql.org/
[express]: https://expressjs.com/
[graphqlhttp]: https://github.com/graphql/express-graphql
[prisma]: https://www.prisma.io/
[postgresql]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[eslint]: https://eslint.org/
[jest]: https://jestjs.io/
[supertest]: https://www.npmjs.com/package/supertest
[docker]: https://www.docker.com/
