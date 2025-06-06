const Autor = require('../models/autorModel');

const autorController = {
    getAll: async (req, res) => {
        try {
            const autores = await Autor.getAll();
            res.json(autores);
        } catch (err){
            res.status(500).json({ error: 'Erro ao buscar autores'});
        }
    },

    getById: async (req, res) => {
        try {
            const autor = await Autor.getById(req.params.id);
            if (!autor) return res.status(404).json({ error: 'Autor não escontrado'});
        } catch (err){
            res.status(500).json({error: 'Erro ao encontrar autor'})
        }
    },

    
}