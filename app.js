const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const db = require('./config/database');
const autorRoutes = require('./routes/autorRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const subcategoriaRoutes = require('./routes/subcategoriaRoutes');
const editoraRoutes = require('./routes/editoraRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const livroRoutes = require('./routes/livroRoutes');
const locatarioRoutes = require('./routes/locatarioRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const emprestimoRoutes = require('./routes/emprestimoRoutes');
const dividaRoutes = require('./routes/dividaRoutes');
const autorLivroRoutes = require('./routes/autorLivroRoutes');
const categoriaLivroRoutes = require('./routes/categoriaLivroRoutes');






const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use(fileUpload());

app.use('/imagens', express.static('imagens'));

app.use('/api/autores', autorRoutes);
app.use('/api/categoria', categoriaRoutes);
app.use('/api/subcategorias', subcategoriaRoutes);
app.use('/api/editoras', editoraRoutes);
app.use('/api/cargo', cargoRoutes);
app.use('/livros', livroRoutes);
app.use('/locatarios', locatarioRoutes);
app.use('/cursos', cursoRoutes);
app.use('/emprestimos', emprestimoRoutes);
app.use('/dividas', dividaRoutes);
app.use('/autor-livro', autorLivroRoutes);
app.use('/categoria-livro', categoriaLivroRoutes);




app.get('/', (req, res) => {
  res.send('API da Livraria funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
