// importando o módulo de http
// Para importação de módulos internos, a documentação determina que devemos utilizar 'node:'
import http from 'node:http'

// Aplicação em stateful -> os dados sao guardados em memória e são apagados assim que a aplicação for derrubada

// Cabeçalhos (Requisição/Resposnse) => metadados

const users = []


// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer((request, response) => {
  const { method, url } = request


  // Exemplo de uma mesma url com diferentes métodos e diferentes retornos
  if (method === 'GET' && url === '/users') {

    // Transformando o retorno em JSON - Javascript Object Notation
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push({
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com'
    })

    return response.end('Criação de usuário')
  }

  return response.end('Hello world!')
})

server.listen(3333) // localhost:3333