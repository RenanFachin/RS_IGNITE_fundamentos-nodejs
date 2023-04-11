// importando o módulo de http
// Para importação de módulos internos, a documentação determina que devemos utilizar 'node:'
import http from 'node:http'

// Aplicação em stateful -> os dados sao guardados em memória e são apagados assim que a aplicação for derrubada

// Cabeçalhos (Requisição/Resposnse) => metadados

const users = []


// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer(async (request, response) => {
  const { method, url } = request

  const buffers = []

  // percorrer cada pedaço da stream de requisição e adicionar ao array de buffers
  for await (const chunk of request) {
    buffers.push(chunk)
  }

  // o await não permite que nada execute enquanto o carregamento da stream não finalizar
  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    request.body = null
  }


  // Exemplo de uma mesma url com diferentes métodos e diferentes retornos
  if (method === 'GET' && url === '/users') {

    // Transformando o retorno em JSON - Javascript Object Notation
    return response
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    // Buscando da request o name e o email do novo usuário
    const { name, email } = request.body


    users.push({
      id: 1,
      name: name,
      email: email
    })

    return response.writeHead(201).end()
  }

  return response.writeHead(404).end('Not found')
})

server.listen(3333) // localhost:3333