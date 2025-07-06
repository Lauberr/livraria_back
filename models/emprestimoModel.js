const db = require('../config/database');

module.exports = {
  async criar({ id_locatario, id_livro }) {
  const locResult = await db.query(
    'SELECT id_cargo FROM locatario WHERE id_locatario = $1',
    [id_locatario]
  );

  if (locResult.rows.length === 0) {
    throw new Error('Locatário não encontrado');
  }

  const id_cargo = locResult.rows[0].id_cargo;

  let diasEmprestimo;
  if (id_cargo === 2 || id_cargo === 3) {
    diasEmprestimo = 30;
  } else if (id_cargo === 4) {
    diasEmprestimo = 14;
  } else {
    throw new Error('Cargo inválido para empréstimo');
  }

  const result = await db.query(
    `INSERT INTO emprestimo (id_locatario, id_livro, data_devolucao)
     VALUES ($1, $2, NOW() + INTERVAL '${diasEmprestimo} days')
     RETURNING *`,
    [id_locatario, id_livro]
  );

  return result.rows[0];
},


  async listarTodos() {
    const result = await db.query('SELECT * FROM emprestimo ORDER BY data_hora_emprestimo DESC');
    return result.rows;
  },

  async buscarUltimo(id_locatario, id_livro) {
  const result = await db.query(
    `SELECT * FROM emprestimo 
     WHERE id_locatario = $1 AND id_livro = $2
     ORDER BY data_hora_emprestimo DESC
     LIMIT 1`,
    [id_locatario, id_livro]
  );
  return result.rows[0];
},


  async buscarPorChave(id_locatario, id_livro, data_hora_emprestimo) {
    const result = await db.query(
      `SELECT * FROM emprestimo 
       WHERE id_locatario = $1 AND id_livro = $2 AND data_hora_emprestimo = $3`,
      [id_locatario, id_livro, data_hora_emprestimo]
    );
    return result.rows[0];
  },

  async atualizarDataDevolucao(id_locatario, id_livro, data_hora_emprestimo, nova_data) {
    const result = await db.query(
      `UPDATE emprestimo
       SET data_devolucao = $1
       WHERE id_locatario = $2 AND id_livro = $3 AND data_hora_emprestimo = $4
       RETURNING *`,
      [nova_data, id_locatario, id_livro, data_hora_emprestimo]
    );
    return result.rows[0];
  },

  async deletar(id_locatario, id_livro, data_hora_emprestimo) {
    const result = await db.query(
      `DELETE FROM emprestimo
       WHERE id_locatario = $1 AND id_livro = $2 AND data_hora_emprestimo = $3
       RETURNING *`,
      [id_locatario, id_livro, data_hora_emprestimo]
    );
    return result.rows[0];
  }
};
