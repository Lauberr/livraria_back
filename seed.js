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

const cursos = [
  'Administração',
  'Engenharia Civil',
  'Ciência da Computação',
  'Direito',
  'Medicina',
  'Enfermagem',
  'Arquitetura',
  'Educação Física',
  'Psicologia',
  'Pedagogia'
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

const cargos = [
  { descricao: 'Bibliotecário, o único que entra no sistema', qt_livro: 3 },
  { descricao: 'Professor, empresta livros por 30 dias', qt_livro: 3 },
  { descricao: 'Aluno, empresta livros por 14 dias', qt_livro: 1 }
];

const livros = [
  {
    isbn: '978-85-01-00001-1',
    titulo: 'Dom Casmurro',
    qt_disponivel: 5,
    disponivel: 1,
    edicao: '3ª',
    capa: 'http://localhost:3000/imagens/1751749069308_dom_casmurro.jpg'
  }
  
];

const locatarios = [
  {
    registro_academico: 'RA12345',
    nome_locatario: 'Lucas Silva',
    data_nascimento: '1995-04-20',
    email_locatario: 'lucas.silva@example.com',
    telefone_locatario: '11999998888',
    id_cargo: 2
  },
  {
    registro_academico: 'RA54321',
    nome_locatario: 'Ana Pereira',
    data_nascimento: '1998-11-10',
    email_locatario: 'ana.pereira@example.com',
    telefone_locatario: '11988887777',
    id_cargo: 3
  },
  {
    registro_academico: 'RA67890',
    nome_locatario: 'Carlos Oliveira',
    data_nascimento: '2000-06-15',
    email_locatario: 'carlos.oliveira@example.com',
    telefone_locatario: '11977776666',
    id_cargo: 4
  }
];

async function popularLocatarios() {
  for (const locatario of locatarios) {
    await db.query(
      `INSERT INTO locatario 
       (registro_academico, nome_locatario, data_nascimento, email_locatario, telefone_locatario, id_cargo)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (registro_academico) DO NOTHING`,
      [
        locatario.registro_academico,
        locatario.nome_locatario,
        locatario.data_nascimento,
        locatario.email_locatario,
        locatario.telefone_locatario,
        locatario.id_cargo
      ]
    );
  }
}


async function popularLivros() {
  for (const livro of livros) {
    await db.query(
      `INSERT INTO livro (isbn, titulo, qt_disponivel, disponivel, edicao, capa)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (isbn) DO NOTHING`,
      [
        livro.isbn,
        livro.titulo,
        livro.qt_disponivel,
        livro.disponivel,
        livro.edicao,
        livro.capa
      ]
    );
  }
}


async function popularAutores() {
  for (const nome of autores) {
    await db.query(
      'INSERT INTO autores (nome_autor) VALUES ($1) ON CONFLICT (nome_autor) DO NOTHING',
      [nome]
    );
  }
}

async function popularCursos() {
  for (const nome of cursos) {
    await db.query(
      'INSERT INTO curso (nome_curso) VALUES ($1) ON CONFLICT (nome_curso) DO NOTHING',
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

// async function popularCargos() {
//   for (const { descricao, qt_livro } of cargos) {
//     await db.query(
//       'INSERT INTO cargo (descricao, qt_livro) VALUES ($1, $2)',
//       [descricao, qt_livro]
//     );
//   }
// }

async function main() {
  try {
    await popularAutores();
    await popularCategoria();
    await popularSubcategoria();
    await popularEditoras();
    await popularLivros();
    await popularLocatarios();
    await popularCursos();
    // await popularCargos();
    console.log('População concluída com sucesso!');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao popular dados:', err);
    process.exit(1);
  }
}


main();
