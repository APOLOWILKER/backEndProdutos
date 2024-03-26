const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const categorias = await CategoryRepository.findAll(orderBy);

    response.json(categorias);
  }

  async show(request, response) {
    // obter UM registro
    const { id } = request.params;

    const categoria = await CategoryRepository.findById(id);

    if (!categoria) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(categoria);
  }

  async store(request, response) {
    // criar novo registro
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Categoria não pode ser vazia' });
    }

    const categorias = await CategoryRepository.create({ name });

    response.json(categorias);
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params;

    const { name } = request.body;

    const categoriaExiste = await CategoryRepository.findById(id);

    if (!categoriaExiste) {
      return response.status(404).json({ error: 'Doce Não encontrado' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Para atualizar categoria não pode ser vazia' });
    }

    const categoria = await CategoryRepository.update(id, {
      name,
    });

    response.json(categoria);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    await CategoryRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
