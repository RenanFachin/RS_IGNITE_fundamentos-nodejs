// O database é um objeto que pode aceitar diferentes dados
// {"users": [...]}

export class Database {
  // # serve para definir que database é uma propriedade privada
  #database = {}

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
    if(Array.isArray(this.#database[table])){
      // Apenas adicionando o novo item(data) ao array já existente
      this.#database[table].push(data)
    } else {
      // Caso não exista, será criado o array com o item inserido
      this.#database[table] = [data]
    }

    // retornando o item inserido
    return data
  }
}