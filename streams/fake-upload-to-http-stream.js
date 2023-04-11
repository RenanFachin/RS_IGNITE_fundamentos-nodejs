import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1

  // Toda stream tem um método obrigatório: _read
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
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


// fetch API
fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half'
}).then(response => {
  response.text().then(data => {
    console.log(data)
  })
})