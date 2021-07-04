const { buildSchema } = require('graphql');

const accountSchema = buildSchema(`
type Conta {
    numero: Int
    saldo: Int
    msg: String
}

type Query {
    saldo(conta: Int!) : Conta
}

type Mutation {
    sacar(conta: Int!, valor: Int!): Conta
    depositar(conta: Int!, valor: Int!): Conta
}`);

module.exports = { accountSchema };
