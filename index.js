const express = require('express');
const app = express();

app.listen(5555, () => {
    console.log('Server Started! 🚀');
  });

// app.use('/', routes);

module.exports = app;