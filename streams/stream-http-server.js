import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    console.log(transformed)

    callback(null, Buffer.from(String(transformed)))
    // O primeiro parâmetro de um callback é o erro
    // o segundo parâmetro é o dado transformado
  }
}


// req => readableStream
// res => writableStream

const server = http.createServer(async (req, res) => {
  const buffers = []

  // percorrer cada pedaço da stream de requisição e adicionar ao array de buffers
  for await (const chunk of req) {
    buffers.push(chunk)
  }

  // o await não permite que nada execute enquanto o carregamento da stream não finalizar
  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)


  // lendo os dados de entrada com o req
  // return req
  //   .pipe(new InverseNumberStream())
  //   .pipe(res) // escrevendo os dados de saida com o res
})

server.listen(3334)