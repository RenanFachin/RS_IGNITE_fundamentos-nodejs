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

  select(table, search) {
    /* 
    Procurando a chave table dentro do objeto database e caso não exista,
    dizer que o array é vazio para que não tenha um undefined como retorno
    */
    let data = this.#database[table] ?? []

    // Filtro de busca
    if (search) {
      data = data.filter(row => {
        // some percorre um array e se pelo menos em uma iteração retornar true, quer dizer que este item deve ser incluido no filter 

        // {name: "renan", email: "renan"}
        // [ ['name', 'renan'] , ['email', 'renan']]
        // [ [key, value] , [key, value]]
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }


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

  delete(table, id) {
    // Percorrendo cada registro e procurando se existe um usuário com id igual ao id recebido pela rota
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    // Caso ele não encontre, o retorno é -1
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist() // persistindo no banco de dados
    }
  }

  update(table, id, data) {
    // Percorrendo cada registro e procurando se existe um usuário com id igual ao id recebido pela rota
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    // Caso ele não encontre, o retorno é -1
    if (rowIndex > -1) {
      // Atualizando apenas a linha desajada [rowIndex], caso não tenha esta info, toda a tabela será atualizada para um único registro
      this.#database[table][rowIndex] = { id, ...data }
      this.#persist() // persistindo no banco de dados
    }
  }
}