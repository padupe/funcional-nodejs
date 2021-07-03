const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const { schema, resolvers } = require('./graphQL/account');

app.listen(4444, () => {
  console.log('Server Started! 🚀');
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

module.exports = app;
