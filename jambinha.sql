-- DROP TABLE IF EXISTS autores
-- DROP TABLE IF EXISTS autor_livro
-- DROP TABLE IF EXISTS editora_livro
-- DROP TABLE IF EXISTS editora
-- DROP TABLE IF EXISTS curso
-- DROP TABLE IF EXISTS dividas
-- DROP TABLE IF EXISTS emprestimo
-- DROP TABLE IF EXISTS locatario
-- DROP TABLE IF EXISTS cargo
-- DROP TABLE IF EXISTS arvore_categoria
-- DROP TABLE IF EXISTS subcategoria
-- DROP TABLE IF EXISTS categoria_subcategoria
-- DROP TABLE IF EXISTS categoria
-- DROP TABLE IF EXISTS categoria_livro	
-- DROP TABLE IF EXISTS livro

-- =============================================================
--                            LIVROS FEITO
-- =============================================================

CREATE TABLE livro(
	id_livro SERIAL PRIMARY KEY,
	isbn VARCHAR(50) UNIQUE,
	titulo VARCHAR(100) NOT NULL,
	qt_disponivel INTEGER,
	disponivel INT CHECK (disponivel IN (0,1)) NOT NULL,
	edicao VARCHAR(100),
	capa VARCHAR(300)
);

-- --------------------------AUTORES FEITO---------------------------

CREATE TABLE autores (
  id_autor SERIAL PRIMARY KEY,
  nome_autor VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE autor_livro(
	id_livro INTEGER REFERENCES livro(id_livro),
	id_autor INTEGER REFERENCES autores(id_autor),
	PRIMARY KEY (id_livro, id_autor)
);
	
-- --------------------------EDITORA FEITO---------------------------

CREATE TABLE editora (
  id_editora SERIAL PRIMARY KEY,
  nome_editora VARCHAR(100) UNIQUE NOT NULL,
  data_publicacao DATE
);


CREATE TABLE editora_livro(
	id_editora INTEGER REFERENCES editora(id_editora),
	id_livro INTEGER REFERENCES livro(id_livro),
	PRIMARY KEY(id_livro, id_editora)
);

-- -------------------------CATEGORIA FEITO--------------------------

CREATE TABLE categoria (
  id_cat SERIAL PRIMARY KEY,
  nome_cat VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE subcategoria (
  id_subcat SERIAL PRIMARY KEY,
  id_cat INTEGER REFERENCES categoria(id_cat),
  nome_subcat VARCHAR(100) UNIQUE NOT NULL
);



CREATE TABLE categoria_livro(
	id_cat INTEGER REFERENCES categoria(id_cat),
	id_livro INTEGER REFERENCES livro(id_livro),
	PRIMARY KEY(id_livro, id_cat)
);



-- =============================================================
--                          LOCATARIO FEITO
-- =============================================================

CREATE TABLE cargo(
	id_cargo SERIAL PRIMARY KEY,
	descricao VARCHAR(100),
	qt_livro INTEGER
);

CREATE TABLE locatario(
	id_locatario SERIAL PRIMARY KEY,
	registro_academico VARCHAR(7) UNIQUE,
	nome_locatario VARCHAR(100) NOT NULL,
	data_nascimento DATE,
	email_locatario VARCHAR(255),
	telefone_locatario VARCHAR(30),
	id_cargo INTEGER,
	status BOOLEAN DEFAULT true,
	FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);

-- ---------------------------CURSO FEITO----------------------------

CREATE TABLE curso(
	id_curso SERIAL PRIMARY KEY,
	nome_curso VARCHAR(50) UNIQUE NOT NULL
);

-- -------------------------EMPRESTIMO FEITO-------------------------

CREATE TABLE emprestimo (
	id_locatario INTEGER REFERENCES locatario(id_locatario),
	id_livro INTEGER REFERENCES livro(id_livro),
	data_hora_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	data_devolucao TIMESTAMP,
	PRIMARY KEY (id_locatario, id_livro, data_hora_emprestimo)
);

-- --------------------------DIVIDAS FEITO--------------------------

CREATE TABLE dividas(
  id_divida SERIAL PRIMARY KEY,
  id_livro INTEGER,
  id_locatario INTEGER,
  data_hora_emprestimo TIMESTAMP,
  valor NUMERIC(15,2) NOT NULL,
  data_hora_divida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado INT CHECK (estado IN (0,1)) NOT NULL,
  FOREIGN KEY (id_locatario, id_livro, data_hora_emprestimo)
	REFERENCES emprestimo(id_locatario, id_livro, data_hora_emprestimo) ON DELETE CASCADE
);


