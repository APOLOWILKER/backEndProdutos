const db = require('../../database');

class LoginsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT * FROM usuarios
      ORDER BY email ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
    SELECT * FROM usuarios
    WHERE id = $1
  `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
    SELECT * FROM usuarios
    WHERE id = $1
  `, [email]);
    return row;
  }

  async create({
    email, senha,
  }) {
    const [row] = await db.query(`
    INSERT INTO usuarios(email, senha)
    VALUES($1, $2)
    RETURNING *
    `, [email, senha]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM usuarios
      WHERE id = $1
    `, [id]);
    return deleteOp;
  }
}

module.exports = new LoginsRepository();
