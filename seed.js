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
