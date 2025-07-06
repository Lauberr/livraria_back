const db = require('../config/database');

module.exports = {
  async criar({ id_locatario, id_livro, data_hora_emprestimo, data_devolucao }) {
    const emprestimo = await db.query(
      `SELECT data_devolucao
       FROM emprestimo
       WHERE id_locatario = $1 AND id_livro = $2 AND data_hora_emprestimo = $3`,
      [id_locatario, id_livro, data_hora_emprestimo]
    );

    if (emprestimo.rows.length === 0) {
      throw new Error('Empréstimo não encontrado.');
    }

    const dataPrevista = emprestimo.rows[0].data_devolucao;
    const dataReal = new Date(data_devolucao);
    const diasAtraso = Math.floor((dataReal - dataPrevista) / (1000 * 60 * 60 * 24));

    if (diasAtraso <= 0) {
      throw new Error('Sem multa para registrar.');
    }

    const valor = diasAtraso * 1.00;

    const result = await db.query(
      `INSERT INTO dividas
        (id_locatario, id_livro, data_hora_emprestimo, valor, estado)
       VALUES ($1, $2, $3, $4, 0)
       RETURNING *`,
      [id_locatario, id_livro, data_hora_emprestimo, valor]
    );

    return result.rows[0];
  },

  async listarTodas() {
    const result = await db.query(
      `SELECT d.*, l.nome_locatario, lv.titulo
       FROM dividas d
       JOIN locatario l ON d.id_locatario = l.id_locatario
       JOIN livro lv ON d.id_livro = lv.id_livro
       ORDER BY d.data_hora_divida DESC`
    );
    return result.rows;
  },

  async quitar(id_divida) {
    const result = await db.query(
      `UPDATE dividas
       SET estado = 1
       WHERE id_divida = $1
       RETURNING *`,
      [id_divida]
    );

    return result.rows[0];
  },

  async listarNaoQuitadas() {
  const result = await db.query(
    'SELECT * FROM dividas WHERE estado = 0 ORDER BY data_hora_divida DESC'
    );
    return result.rows;
}

};
