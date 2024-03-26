const express = require('express');

const LoginController = require('../controllers/LoginController');
const DocesController = require('../controllers/DocesController');

const routes = express.Router();

// criar os usuários
routes.post('/cadastro', LoginController.store);
// mostrar os usuários cadastrados
routes.get('/login/users', LoginController.index);
// verificar o usuário e se ele pode logar
routes.get('/login', LoginController.show);

routes.get(
  '/docesList',
  DocesController.index,
);
routes.get('/docesList/:id', DocesController.show);
routes.delete('/docesList/:id', DocesController.delete);
routes.post('/docesList', DocesController.store);
routes.put('/docesList/:id', DocesController.update);

module.exports = routes;
