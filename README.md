<div align="center">
  <img 
    alt="Logo Explorer" 
    title="Explorer" 
    src="https://i.imgur.com/jgM1K5Z.png"
  >

  <br>

  <h2 align="center">
    Fundamentos Node.js
  </h2>
</div>
<br>

---

## Fundamentos NODEJS
Módulo introdutório do bootcamp de especialização em Nodejs.

Neste módulo foi criada uma APIRest utilizando apenas módulos internos do NodeJS, sem nenhuma biblioteca terceira.

Tópicos abordados: `ESModule`, `Métodos HTTP`, `Headers de requisições`, `HTTP Statuscode`, `Streams`, `Middlewares`, `Persistência de dados`, `Crypto`, `Requisições - Query params, route params e request body`, `Expressões regulares - RegEX`

## Instalação

```bash
# Faça o clone do repotório
  git clone git@github.com:RenanFachin/RS_IGNITE_FundamentosNodeJS.git
# Executando o projeto no ambiente de desenvolvimento
  npm run dev
# O banco de dados será automaticamente criado na raiz do projeto
```

## Rotas
- Criar novo usuário
```bash
POST /users
```

- Listar todos usuários
```bash
GET /users
```

- Listar todos usuários que tenham nome como valor para name ou email
```bash
GET /users?search=${nome}
```

- Deletar usuário
```bash
DELETE /users/:${id}
```

- Atualizar usuário
```bash
PUT /users/:${id}
```