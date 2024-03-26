const DocesRepository = require('../repositories/DocesRepository');

class DocesController {
  async index(request, response) {
    // Listar todos os registros
    const doces = await DocesRepository.findAll();

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
    const { doceName, category } = request.body;

    if (!doceName || !category) {
      return response.status(400).json({ error: 'doceName e category são necessários' });
    }

    const doceExists = await DocesRepository.findByName(doceName);

    if (doceExists) {
      return response.status(400).json({ error: 'Esse doce já existe' });
    }

    const doce = await DocesRepository.create({
      doceName, category,
    });

    response.json(doce);
  }

  async update(request, response) {
    // editar um registro
    const { id } = request.params;

    const {
      doceName, category,
    } = request.body;

    const docesExists = await DocesRepository.findById(id);
    const doceNameExists = await DocesRepository.findByName(doceName);

    if (!docesExists) {
      return response.status(404).json({ error: 'Doce Não encontrado' });
    }

    if (!doceName || !category) {
      return response.status(400).json({ error: 'doceName e category são necessários' });
    }

    if (docesExists && doceNameExists) {
      return response.status(400).json({ error: 'Esse doce já existe, não precisa atualizar' });
    }

    const doce = await DocesRepository.update(id, {
      doceName, category,
    });

    response.json(doce);
  }

  async delete(request, response) {
    // deletar um registro
    const { id } = request.params;

    const doce = await DocesRepository.findById(id);

    if (!doce) {
      return response.status(404).json({ error: 'User not found' });
    }

    await DocesRepository.delete(id);

    response.sendStatus(204);
  }
}

module.exports = new DocesController();
