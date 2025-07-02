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
  'Poesia'
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

const editoras = [
  { nome: 'Companhia das Letras', data: '1986-05-01' },
  { nome: 'Editora Record', data: '1942-10-15' },
  { nome: 'Editora Moderna', data: '1969-03-12' },
  { nome: 'Editora Ática', data: '1970-07-20' }
];

async function popularAutores() {
  for (const nome of autores) {
    await db.query(
      'INSERT INTO autores (nome_autor) VALUES ($1) ON CONFLICT (nome_autor) DO NOTHING',
      [nome]
    );
  }
}

async function popularCategoria() {
  for (const nome_cat of categorias) {
    await db.query(
      'INSERT INTO categoria (nome_cat) VALUES ($1) ON CONFLICT (nome_cat) DO NOTHING',
      [nome_cat]
    );
  }
}

async function popularSubcategoria() {
  for (const nome_subcat of subcategorias) {
    await db.query(
      'INSERT INTO subcategoria (nome_subcat) VALUES ($1) ON CONFLICT (nome_subcat) DO NOTHING',
      [nome_subcat]
    );
  }
}

async function popularEditoras() {
  for (const { nome, data } of editoras) {
    await db.query(
      'INSERT INTO editora (nome_editora, data_publicacao) VALUES ($1, $2) ON CONFLICT (nome_editora) DO NOTHING',
      [nome, data]
    );
  }
}

async function main() {
  try {
    await popularAutores();
    await popularCategoria();
    await popularSubcategoria();
    await popularEditoras();
    console.log('População concluída com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao popular dados:', err);
    process.exit(1);
  }
}

main();
