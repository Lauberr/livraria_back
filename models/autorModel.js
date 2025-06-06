const db = require("../config/database");

const Autor = {
    getAll: async () => {
        const result = await db.query('SELECT * FROM autores');
        return result.rows;
    },

    getById: async (id) => {
      const result  = await db.query('SELECT * FROM autores WHERE id = $1', [id]);
      return result.rows[0];
    },
    
    create: async (nome) => {
        const result  = await db.query('INSERT INTO autores (nome_autor) VALUES ($1) RETURNING', [nome]);
        return result.rows[0];
    },
    
    update: async (id, nome) => {
        const result  = await db.query('UPDATE autores SET nome_autor = $1 WHERE id = $2 RETURNING', [nome, id]);
        return result.rows[0];
    },

    delete: async (id) => {
        await db.query('DELETE FROM autores WHRERE id_autor = $1', [id])
    }
};

module.exports = Autor;