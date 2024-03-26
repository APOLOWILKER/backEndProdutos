const db = require('../../database');

class CategoryRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT DISTINCT ON (categories.id) categories.id, categories.name,
      COUNT(doces.id) OVER(PARTITION BY categories.id) as doce_count
      FROM categories
      LEFT JOIN doces ON doces.category_id = categories.id
      ORDER BY categories.id, categories.name
    `);
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);
    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT DISTINCT ON (categories.id) categories.id, categories.name,
    COUNT(doces.id) OVER(PARTITION BY categories.id) as doce_count
      FROM categories
      LEFT JOIN doces ON doces.category_id = categories.id
    WHERE categories.id = $1
  `, [id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM categories
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new CategoryRepository();
