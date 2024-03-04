import { urlstandart } from "./url"

const url = `${urlstandart}/api/v1/operador`

export default function pad(toPad, padChar, length) {
  return String(toPad).length < length
    ? new Array(length - String(toPad).length + 1).join(padChar) + String(toPad)
    : toPad
}

export async function direccionOperador(rifParam) {
    try {
      const data = await fetch(url)
      const operadores = await data.json()
      const direccion = operadores.find((element) => element.rif === rifParam)
      return await direccion
    } catch (error) {
      console.debug(error)
      return error
    }
}

/*
  FUNCION QUE PERMITE DETERMINAR SI UN INPUT ES STRING

 function isString(value) { return value.constructor === String }

  FUNCION PARA BLOQUEAR TECLADO SEGUN CARACTERES

 function handleKeyPress(e){
    if (e.target.value.length === 12) {
      e.preventDefault()
    }
  }

*/