// ?search=USUÁRIO&page=2

export function extractQueryParams(query) {

  // .substr(1) => retira o ?
  // split no & vai separar em array => ['search=USUÁRIO', 'page=2']
  return query.substr(1).split('&').reduce((queryParams, param) => {
    /*
    reduce é um método do JS que serve para percorrer um array e transformar em outra coisa qualquer, até mesmo um novo objeto. Por isso, o segundo parâmetro da função reduce é a forma que ficará ao final da função
    */

    // .split('=') => ['search','USUÁRIO', 'page','2']

    // key e value é uma desestruturação
    const [key, value] = param.split('=')

    queryParams[key] = value


    return queryParams
  }, {})
}