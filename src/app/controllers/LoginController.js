class LoginController {
  index(request, response) {
    // Listar todos os registros
    response.send('Send from Login Controller');
  }

  show() {
    // obter UM registro
  }

  store() {
    // criar novo registro
  }

  update() {
    // editar um registro
  }

  delete() {
    // deletar um registro
  }
}

// singleton
module.exports = new LoginController();
