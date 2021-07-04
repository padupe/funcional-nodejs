const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

//Account
const { accountSchema } = require('./models/account.schema');
const { accountResolvers } = require('./resolvers/account');

app.listen(process.env.PORT, () => {
  `Server Started on port ${process.env.PORT} with env ${process.env.NODE_ENV}! 🚀`;
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: accountSchema,
    rootValue: { ...accountResolvers },
    graphiql: true,
  })
);

module.exports = app;
