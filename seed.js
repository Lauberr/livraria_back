const db = require('./config/database');

async function popularAutores() {
  const autores = [
    'Machado de Assis',
    'Clarice Lispector',
    'Graciliano Ramos',
    'Cecília Meireles',
    'Carlos Drummond de Andrade',
    'Jorge Amado',
    'Paulo Coelho',
    'José de Alencar',
    'Lygia Fagundes Telles',
    'Monteiro Lobato'
  ];

  try {
    for (const nome of autores) {
      await db.query('INSERT INTO autores (nome_autor) VALUES ($1)', [nome]);
    }
    console.log('Autores inseridos com sucesso!');
    process.exit(); 
  } catch (error) {
    console.error('Erro ao inserir autores:', error);
    process.exit(1);
  }
}

popularAutores();

const categoria = [
    'Ficção',
    'Romance',
    'Terror',
    'Suspense',
    'Conto',
    'Histórico',
    'Crônica',
    'Infantil',
    'Fantasia',
    'Ciência',
    'Poesia',
    'Biografia',
    'Científico',
  ];
  
  async function popularCategoria() {
    try {
      for (const nome_cat of categoria) {
        await db.query(
          'INSERT INTO categoria (nome_cat) VALUES ($1) ON CONFLICT DO NOTHING',
          [nome_cat]
        );
        console.log(`Categoria "${nome_cat}" inserida`);
      }
      console.log('População concluída!');
      process.exit(0);
    } catch (err) {
      console.error('Erro ao popular categoria:', err);
      process.exit(1);
    }
  }
  
  popularCategoria();
