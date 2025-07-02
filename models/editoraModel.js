const db = require('../config/database');

const Editora = {
  listar: async () => {
    const result = await db.query('SELECT * FROM editora');
    return result.rows;
  },

  obterPorId: async (id) => {
    const result = await db.query('SELECT * FROM editora WHERE id_editora = $1', [id]);
    return result.rows[0];
  },

  criar: async (nome_editora, data_publicacao) => {
    const result = await db.query(
      'INSERT INTO editora (nome_editora, data_publicacao) VALUES ($1, $2) RETURNING *',
      [nome_editora, data_publicacao]
    );
    return result.rows[0];
  },

  atualizar: async (id, nome_editora, data_publicacao) => {
    const result = await db.query(
      'UPDATE editora SET nome_editora = $1, data_publicacao = $2 WHERE id_editora = $3 RETURNING *',
      [nome_editora, data_publicacao, id]
    );
    return result.rows[0];
  },

  deletar: async (id) => {
    await db.query('DELETE FROM editora WHERE id_editora = $1', [id]);
  }
};

module.exports = Editora;
