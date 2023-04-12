import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

// Cada objeto do array routes é uma rota. E dentro dentro desde objeto precisa ter o método, o caminho e o que vai ser feito

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const users = database.select('users')

      return response.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (request, response) => {
      const { name, email } = request.body


      const user = {
        id: randomUUID(),
        name,
        email,
      }

      database.insert('users', user);


      return response.writeHead(201).end()
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const id = request.params.id


      database.delete('users', id)

      return response.writeHead(204).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (request, response) => {
      const id = request.params.id
      const { name, email } = request.body

      database.update('users', id, {
        name,
        email
      })

      return response.writeHead(204).end()
    }
  }]