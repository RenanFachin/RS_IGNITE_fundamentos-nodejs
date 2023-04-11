// importando o módulo de http
// Para importação de módulos internos, a documentação determina que devemos utilizar 'node:'
import http from 'node:http'

// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer((request, response) => {
  return response.end('Hello world!')
})

server.listen(3333) // localhost:3333