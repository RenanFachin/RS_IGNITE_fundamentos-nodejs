// Representação de um espaço da memória do computador feito para transitar dados de forma rápida
// Maneira performática, de forma binária, de como os dados são armazenados, lidos e "esquecidos"

const buf = Buffer.from("ok")

console.log(buf) // retorna um hexadecimal que representa um dado

// hexadecimal = 0123456789ABCDEF


console.log(buf.toJSON()) // decimal