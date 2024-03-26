const LoginRepository = require('../repositories/LoginRepository');

class LoginController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const usuarios = await LoginController.findAll(orderBy);

    response.json(usuarios);
  }

  async show(request, response) {
    // obter UM registro
    const { id } = request.params;

    const usuario = await LoginRepository.findById(id);

    if (!usuario) {
      return response.status(404).json({ error: 'Usuario não encontrado' });
    }

    response.json(usuario);
  }

  async store(request, response) {
    // criar novo registro
    const { email, senha } = request.body;

    if (!email || !senha) {
      return response.status(400).json({ error: 'Usuário deve ter email e senha' });
    }

    const usuarioExiste = await LoginRepository.findByEmail(email);

    if (usuarioExiste) {
      return response.status(400).json({ error: 'Esse usuario já existe' });
    }

    const doce = await LoginRepository.create({
      email, senha,
    });

    response.json(doce);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    await LoginRepository.delete(id);

    response.sendStatus(204);
  }
}

// singleton
module.exports = new LoginController();
