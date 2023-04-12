// '/users/:id',
export function buildRoutePath(path) {
  // Texto que começa com :
  // letras de a até z tanto maiúsculas quanto minúsculas e podem repetir uma ou mais vezes
  // o g no final sinaliza que é uma regex global, que não vai parar no primeiro match da operação
  const routeParametersRegex = /:([a-zA-Z]+)/g

  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  const pathRegex = new RegExp(`^${pathWithParams}`)


  return pathRegex
}