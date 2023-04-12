// importando o módulo de http
// Para importação de módulos internos, a documentação determina que devemos utilizar 'node:'
import http from 'node:http'

// Importando o database
import { Database } from './database.js'

// é necessário colocar a extensão do arquivo no ESMODULE
import { json } from './middlewares/json.js'

import { randomUUID } from 'node:crypto'

// Aplicação em stateful -> os dados sao guardados em memória e são apagados assim que a aplicação for derrubada

// Cabeçalhos (Requisição/Resposnse) => metadados

const database = new Database()

// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer(async (request, response) => {
  const { method, url } = request

  // chamando o middleware
  await json(request, response)


  // Exemplo de uma mesma url com diferentes métodos e diferentes retornos
  if (method === 'GET' && url === '/users') {

    const users = database.select('users')

    // Transformando o retorno em JSON - Javascript Object Notation
    return response.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    // Buscando da request o name e o email do novo usuário
    const { name, email } = request.body


    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user);


    return response.writeHead(201).end()
  }

  return response.writeHead(404).end('Not found')
})

server.listen(3333) // localhost:3333