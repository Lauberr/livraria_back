const db = require('../config/database');

module.exports = {
  async criar(curso) {
    const { nome_curso } = curso;
    const result = await db.query(
      'INSERT INTO curso (nome_curso) VALUES ($1) RETURNING *',
      [nome_curso]
    );
    return result.rows[0];
  },

  async listarTodos() {
    const result = await db.query('SELECT * FROM curso ORDER BY id_curso');
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await db.query('SELECT * FROM curso WHERE id_curso = $1', [id]);
    return result.rows[0];
  },

  async atualizar(id, curso) {
    const { nome_curso } = curso;
    const result = await db.query(
      'UPDATE curso SET nome_curso = $1 WHERE id_curso = $2 RETURNING *',
      [nome_curso, id]
    );
    return result.rows[0];
  },

  async deletar(id) {
    const result = await db.query('DELETE FROM curso WHERE id_curso = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};
