const express = require('express');
const router = require('./app/routes');
const { errorHandler } = require('./app/middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ROTAS
app.use(errorHandler);
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port 3000 in http://localhost:${PORT}`);
});
