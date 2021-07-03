const { buildSchema } = require('graphql');

const accountSchema = buildSchema(`
type Account {
    number: Int
    balance_available: Int
    msg: String
}

type Query {
    available(account: Int!) : Account
}

type Mutation {
    withdraw(account: Int!, value: Int!): Account
    deposit(account: Int!, value: Int!): Account
}`);

module.exports = { accountSchema };
