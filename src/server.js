import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

// Criando servidor http
// createServer recebe 2 parâmetros: request e response
const server = http.createServer(async (request, response) => {
  const { method, url } = request

  // chamando o middleware
  await json(request, response)

  // Procurando no array routes, um objeto que contenha mesmo método e path
  const route = routes.find(route => {
    return route.method === method && route.path === url
  })

  // console.log(route) -> validando a chamada pra rota

  // Caso a rota exista, fazer a chamada para a função
  if (route) {
    return route.handler(request, response)
  }

  return response.writeHead(404).end('Not found')
})

server.listen(3333) // localhost:3333