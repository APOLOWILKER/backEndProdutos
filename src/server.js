const express = require('express');
const routes = require('./app/routes');

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000, () => {
  console.log('Listening on port 3000 in http://localhost:3000');
});
