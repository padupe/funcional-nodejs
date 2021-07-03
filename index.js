const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

//Account
const { accountSchema } = require('./graphQL/account');
const { accountResolvers } = require('./resolvers/account');

if (process.env.NODE_ENV !== 'test') {
  app.listen(4444, () => {
    console.log('Server Started! 🚀');
  });

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: { ...accountSchema },
      rootValue: { ...accountResolvers },
      graphiql: true,
    })
  );
}

module.exports = app;
