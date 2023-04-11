// importando o módulo de http
// Para importação de módulos internos, a documentação determina que devemos utilizar 'node:'
import http from 'node:http'

// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer((request, response) => {
  const { method, url } = request


  // Exemplo de uma mesma url com diferentes métodos e diferentes retornos
  if(method === 'GET' && url === '/users'){
    return response.end('Listagem de usuários')
  }

  if(method === 'POST' && url === '/users'){
    return response.end('Criação de usuário')
  }

  return response.end('Hello world!')
})

server.listen(3333) // localhost:3333