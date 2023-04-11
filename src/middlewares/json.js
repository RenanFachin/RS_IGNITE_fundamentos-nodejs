// middleware serve como um interceptador 

export async function json(request, response) {
  // Convertendo o corpo da requisição em JSON na entrada
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


  // Devolvendo o cabeçalho
  response.setHeader('Content-type', 'application/json')
}