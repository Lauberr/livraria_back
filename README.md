# Livraria_Jambinha

## Título e descrição do projeto:
Sistema para gerenciamento de uma biblioteca escolar, com cadastro de livros, editoras, autores, categorias, subcategorias, locatários e cursos.
No sistema é possível ver a situação de empréstimos, de dívidas e também fazer uma solicitação de reserva.

## Instruções de instalação e execução
• No PgAdmin, um Banco de Dados deve ser criado com essas especificações:
```sh
PORT=3000
CONNECTION_STRING=postgres://postgres:postgres@localhost:5432/livraria
```

• No Backend é preciso executar o comando npm install:
```sh
npm install
```

• Para popular as tabelas estamos usando o seed.js, ele irá popular todas as tabelas que precisa automaticamente apenas com uma linha de código:
```sh
node seed.js
```

• Para rodar o Backend, o seguinte comando deve ser executado:
```sh
node app.js
```

• *No Frontend, a primeira coisa a ser feita é mudar de diretório. O diretório correto para rodar os comandos é o livraria_jambinha.*

• O comando npm install é necessário:
```sh
npm install
```

• Para rodar o front, o seguinte comando deve ser executado:
```sh
npm run dev
```
*Este comando irá renderizar no console um link, que deve ser seguido.*

• E pronto, você está apto para explorar a Livraria Jambinha™ 






