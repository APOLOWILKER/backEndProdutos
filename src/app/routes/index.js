const express = require('express');

const LoginController = require('../controllers/LoginController');
const DocesController = require('../controllers/DocesController');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

// USUARIOS

// criar os usuários
router.post('/cadastro', LoginController.store);
// mostrar os usuários cadastrados
router.get('/login/users', LoginController.index);
// verificar o usuário e se ele pode logar
router.get('/login/:id', LoginController.show);
router.delete('/login/users/:id', LoginController.delete);

// DOCES
router.get('/docesList', DocesController.index);
router.get('/docesList/:id', DocesController.show);
router.delete('/docesList/:id', DocesController.delete);
router.post('/docesList', DocesController.store);
router.put('/docesList/:id', DocesController.update);

// CATEGORIAS
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.post('/categories', CategoryController.store);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
