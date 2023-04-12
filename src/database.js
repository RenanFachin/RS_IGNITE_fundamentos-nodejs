import fs from 'node:fs/promises'

// lidando com caminhos
const databasePath = new URL('../db.json', import.meta.url)

// O database é um objeto que pode aceitar diferentes dados
// {"users": [...]}

export class Database {
  // # serve para definir que database é uma propriedade privada
  #database = {}

  constructor() {
    // Fazendo a leitura do arquivo db.json e sua conversão
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      // caso ele não exista, chamar o método persist para criar mesmo que vazio
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    // escrevendo o arquivo db.json, na pasta src,  e convertendo o database para json
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    /* 
    Procurando a chave table dentro do objeto database e caso não exista,
    dizer que o array é vazio para que não tenha um undefined como retorno
    */
    const data = this.#database[table] ?? []


    return data
  }

  insert(table, data) {
    // Verificando se existe um registro
    if (Array.isArray(this.#database[table])) {
      // Apenas adicionando o novo item(data) ao array já existente
      this.#database[table].push(data)
    } else {
      // Caso não exista, será criado o array com o item inserido
      this.#database[table] = [data]
    }

    this.#persist();

    // retornando o item inserido
    return data
  }
}