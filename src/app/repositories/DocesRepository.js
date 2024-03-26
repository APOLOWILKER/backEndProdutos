const { v4 } = require('uuid');

let doces = [
  {
    id: v4(),
    doceName: 'bombom',
    category: 'chocolate',
  },
  {
    id: v4(),
    doceName: 'Paçoca',
    category: 'doce-caseiro',
  },
];

class DocesRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(doces);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      resolve(
        doces.find((doce) => doce.id === id),
      );
    });
  }

  findByName(doceName) {
    return new Promise((resolve) => {
      resolve(
        doces.find((doce) => doce.doceName === doceName),
      );
    });
  }

  create({ doceName, category }) {
    return new Promise((resolve) => {
      const novoDoce = {
        id: v4(),
        doceName,
        category,
      };
      doces.push(novoDoce);
      resolve(novoDoce);
    });
  }

  update(id, { doceName, category }) {
    return new Promise((resolve) => {
      const atualizandoDoce = {
        id,
        doceName,
        category,
      };

      doces = doces.map((doce) => (
        doce.id === id ? atualizandoDoce : doce
      ));

      resolve(atualizandoDoce);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      doces = doces.filter((doce) => doce.id !== id);
      resolve();
    });
  }
}

module.exports = new DocesRepository();
