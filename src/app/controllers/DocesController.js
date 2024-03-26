const DocesRepository = require('../repositories/DocesRepository');

class DocesController {
  async index(request, response) {
    // Listar todos os registros
    const { orderBy } = request.query;
    const doces = await DocesRepository.findAll(orderBy);

    response.json(doces);
  }

  async show(request, response) {
    // obter UM registro
    const { id } = request.params;

    const doce = await DocesRepository.findById(id);

    if (!doce) {
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(doce);
  }

  async store(request, response) {
    // criar novo registro
    const { doceName, category_id } = request.body;

    if (!doceName) {
      return response.status(400).json({ error: 'doceName é necessário' });
    }

    const doceExists = await DocesRepository.findByName(doceName);

    if (doceExists) {
      return response.status(400).json({ error: 'Esse doce já existe' });
    }

    const doce = await DocesRepository.create({
      doceName, category_id,
    });

    response.json(doce);
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params;

    const {
      doceName, category_id,
    } = request.body;

    const docesExists = await DocesRepository.findById(id);

    if (!docesExists) {
      return response.status(404).json({ error: 'Doce Não encontrado' });
    }

    if (!doceName) {
      return response.status(400).json({ error: 'doceName e necessários' });
    }

    const doce = await DocesRepository.update(id, {
      doceName, category_id,
    });

    response.json(doce);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    await DocesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new DocesController();
