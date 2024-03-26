const express = require('express');

const LoginController = require('../controllers/LoginController');
const DocesController = require('../controllers/DocesController');

const routes = express.Router();

// falta criar
routes.post('/login', LoginController.index);

routes.get(
  '/docesList',
  (request, response, next) => {
    request.appId = 'MeuAppID';
    next();
  },
  DocesController.index,
);
routes.get('/docesList/:id', DocesController.show);
routes.delete('/docesList/:id', DocesController.delete);
routes.post('/docesList', DocesController.store);
routes.put('/docesList/:id', DocesController.update);

module.exports = routes;
