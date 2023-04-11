// Streams permite obter/ler pequenas partes de algo e já permitir trabalhar com os dados

// Importação de clienbtes via CSV (Excel)
// ex: 1gb de dados
// O usuário vai subir o csv e será enviado através de uma rota POST
// O node vai ler o arquivo inteiro, depois ele vai percorrer o arquivo e fazer cada uma das operações descritas pelo back-end

// Sem utilizar o conceito de streams, o usuário terá que esperar o upload ser totalmente realizado para então o node começar a ler e executar o que está projetado
// Com streams, as operações de ler e executar vai sendo feito enquanto o upload vai sendo realizado

// Readable streams (upload de um arquivo pelo usuário) / writable streams (netflix e spotify)


// process.stdin
//   .pipe(process.stdout)


// Criando uma stream de leitura do zero
import { Readable, Writable, Transform } from 'node:stream'

// stream de leitura
class OneToHundredStream extends Readable {
  index = 1

  // Toda stream tem um método obrigatório: _read
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 100) {
        // .push é maneira de fornecer dados para quem estiver consumindo a stream
        this.push(null)
      } else {
        // não aceita dados no formato primitivo, será necessário trabalhar com buffers
        const buff = Buffer.from(String(i)) // convertendo i para um buffer

        this.push(buff)
      }
    }, 1000)
  }
}

// stream de transformação
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1

    callback(null, Buffer.from(String(transformed)))
    // O primeiro parâmetro de um callback é o erro
    // o segundo parâmetro é o dado transformado
  }
}

// stream de escrita
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    // chunk é o pedaço
    // enconding é como a informação está codificada
    // callback é uma função que a stream de escrita precisa chamar ao finalizar

    console.log(Number(chunk.toString() * 10))

    callback()
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream())