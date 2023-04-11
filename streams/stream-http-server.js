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

const server = http.createServer((req, res) => {
  // lendo os dados de entrada com o req
  return req
    .pipe(new InverseNumberStream())
    .pipe(res) // escrevendo os dados de saida com o res
})

server.listen(3334)