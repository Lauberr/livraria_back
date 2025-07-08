const db = require("../config/database");

module.exports = {
  async criar(locatario) {
    const {
      registro_academico,
      nome_locatario,
      data_nascimento,
      email_locatario,
      telefone_locatario,
      id_cargo,
    } = locatario;

    const query = `
      INSERT INTO locatario (registro_academico, nome_locatario, data_nascimento, email_locatario, telefone_locatario, id_cargo)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

    const values = [
      registro_academico,
      nome_locatario,
      data_nascimento,
      email_locatario,
      telefone_locatario,
      id_cargo,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  },

  async listarTodos() {
    const result = await db.query("SELECT * FROM locatario");
    return result.rows;
  },

  async buscarPorId(id) {
    const result = await db.query(
      "SELECT * FROM locatario WHERE id_locatario = $1",
      [id]
    );
    return result.rows[0];
  },

  async atualizar(id, locatario) {
    const {
      registro_academico,
      nome_locatario,
      data_nascimento,
      email_locatario,
      telefone_locatario,
      id_cargo,
    } = locatario;

    const query = `
      UPDATE locatario
      SET registro_academico = $1, nome_locatario = $2, data_nascimento = $3, email_locatario = $4,
          telefone_locatario = $5, id_cargo = $6
      WHERE id_locatario = $7 RETURNING *`;

    const values = [
      registro_academico,
      nome_locatario,
      data_nascimento,
      email_locatario,
      telefone_locatario,
      id_cargo,
      id,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  },

  async deletar(id) {
    const result = await db.query(
      "UPDATE locatario SET status = false WHERE id_locatario = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};
