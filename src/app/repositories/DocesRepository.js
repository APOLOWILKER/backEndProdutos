const db = require('../../database');

class DocesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM doces
      ORDER BY doceName ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT * FROM doces
    WHERE id = $1
  `, [id]);
    return row;
  }

  async findByName(doceName) {
    const [row] = await db.query(`
    SELECT * FROM doces
    WHERE id = $1
  `, [doceName]);
    return row;
  }

  async create({
    doceName, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO doces(doceName, category_id)
    VALUES($1, $2)
    RETURNING *
    `, [doceName, category_id]);

    return row;
  }

  async update(id, { doceName, category_id }) {
    const [row] = await db.query(`
      UPDATE doces
      SET name = $1, category_id = $2
      WHERE id = $3
      RETURNING *
    `, [doceName, category_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM doces
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new DocesRepository();
