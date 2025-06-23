const db = require('./config/database');

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

const categorias = [
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
];

const subcategorias = [
  'Ficção - Científica',
  'Ficção - Distópica',
  'Romance - Contemporâneo',
  'Romance - Histórico',
  'Terror - Psicológico',
  'Terror - Sobrenatural',
  'Suspense - Policial',
  'Suspense - Thriller Psicológico',
  'Conto - Fantástico',
  'Conto - Realista',
  'Histórico - Biográfico',
  'Histórico - Ficção Histórica',
  'Crônica - Cotidiana',
  'Crônica - Humorística',
  'Infantil - Educativo',
  'Infantil - História com Moral',
  'Fantasia - Alta Fantasia',
  'Fantasia - Baixa Fantasia',
  'Ciência - Física',
  'Ciência - Biologia',
  'Poesia - Lírica',
  'Poesia - Épica'
];

async function popularAutores() {
  for (const nome of autores) {
    await db.query(
      'INSERT INTO autores (nome_autor) VALUES ($1) ON CONFLICT DO NOTHING',
      [nome]
    );
  }
}

async function popularCategoria() {
  for (const nome_cat of categorias) {
    await db.query(
      'INSERT INTO categoria (nome_cat) VALUES ($1) ON CONFLICT DO NOTHING',
      [nome_cat]
    );
  }
}

async function popularSubcategoria() {
  for (const nome_subcat of subcategorias) {
    await db.query(
      'INSERT INTO subcategoria (nome_subcat) VALUES ($1) ON CONFLICT DO NOTHING',
      [nome_subcat]
    );
  }
}

async function main() {
  try {
    await popularAutores();
    await popularCategoria();
    await popularSubcategoria();
    console.log('População concluída com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao popular dados:', err);
    process.exit(1);
  }
}

main();
