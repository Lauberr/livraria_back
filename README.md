# Livraria_Jambinha 

## Descrição do Projeto

**Livraria Jambinha** é um sistema completo de gerenciamento de biblioteca escolar, desenvolvido com foco em bibliotecários e usuários acadêmicos.

Permite o **cadastro e controle de livros, autores, editoras, categorias, subcategorias, cursos e locatários**, além de funcionalidades como:

- Empréstimo e devolução de livros  
- Cálculo de dívidas por atraso  
- Consulta de histórico  
- Vinculação de autores aos livros  
- Acesso restrito por tipo de usuário (bibliotecário, professor, aluno)

O sistema possui um **frontend em React** e um **backend em Node.js com Express e PostgreSQL**.

---

## Instruções de Instalação e Execução

### Banco de Dados

1. No **PgAdmin**, crie um banco de dados com o nome `livraria`.
2. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
O banco deve ter as seguintes especificações postgres:postgres@localhost:5432/livraria
```

---

### Backend (Node.js)


1. Instale as dependências:

```
npm install
```

2. Popule o banco de dados com dados iniciais:

```
node seed.js
```

3. Inicie o servidor:

```
node app.js
```

> O backend estará rodando em: http://localhost:3000

---

### Frontend (React)

1. Acesse o diretório do frontend:

```
cd livraria_jambinha
```

2. Instale as dependências:

```
npm install
```

3. Inicie o frontend:

```
npm run dev
```

> Será exibido um link no terminal, em `http://localhost:5173`

---

## Estrutura do Projeto
O projeto está dividido em duas partes principais: **backend** e **frontend**.

- **Backend**:  
  Contém as rotas da API, os controladores (`controllers/`) com a lógica de cada funcionalidade, os modelos de banco de dados (`models/`), as configurações de conexão com o PostgreSQL (`config/`), e o script `seed.js` para popular o banco.

- **Frontend **:  
  Desenvolvido em React, está organizado com componentes reutilizáveis na pasta `components/` e páginas principais na pasta `pages/`.

---

## Exemplos de Uso

### Rota da API

**GET /livros**  
Retorna todos os livros cadastrados:

```json
[
  {
    "id_livro": 1,
    "titulo": "Dom Casmurro",
    "edicao": "3ª",
    "disponivel": 1,
    "qt_disponivel": 5
  }
]
```

### Funcionalidade: Registro de Dívidas

Se um locatário devolve um livro com atraso, o sistema permite registrar uma dívida manualmente:

- Basta informar o `id_locatario` e `id_livro` 
- A multa será calculada automaticamente: **R$1 por dia de atraso**

---

## Autores e Responsabilidades

| Nome             | Responsabilidade principal                  |
|------------------|---------------------------------------------|
| Otávio Paulino   | Backend, banco de dados, lógica de negócio |
| Bárbara Lauber   | Frontend (React), layout, integração visual |

---

## Considerações Finais


Esse projeto foi desenvolvido como parte da disciplina de Projeto Integrador em conjunto com Desenvolvimento Web.

 **Livraria Jambinha™** 
