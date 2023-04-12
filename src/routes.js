import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"

const database = new Database()

// Cada objeto do array routes é uma rota. E dentro dentro desde objeto precisa ter o método, o caminho e o que vai ser feito

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (request, response) => {
      const users = database.select('users')

      return response.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path: '/users',
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
  }
]