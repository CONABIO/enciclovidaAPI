const _ = require("lodash")
const axios = require("axios")
const { porPagina } = require("../config/general.config")

const options = {
  abortEarly: false, // include all errors
  allowUnknown: false, // ignore unknown props
  stripUnknown: true, // remove unknown props
}

// Validate request against joi squema
const validateReq = (req, schema) => {
  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(req, options)

    if (error) reject(error)
    else resolve()
  })
}

// Validate response according to the joi schema and next results
const validateRes = (results, schema) => {
  return new Promise((resolve, reject) => {
    const { error, value } = schema.validate(results, options)

    if (error) reject(error)
    else resolve(value)
  })
}

// Default pagina y por_pagina
const paginadoDefault = (req) => {
  const paginado = {}
  if (_.isEmpty(req.pagina)) paginado.pagina = 1
  else paginado.pagina = req.pagina

  if (_.isEmpty(req.por_pagina)) paginado.por_pagina = porPagina
  else paginado.por_pagina = req.por_pagina

  return paginado
}

// Regresa de una manera directa el offset y el limit
const limitOffset = (req) => {
  const { pagina, por_pagina } = paginadoDefault(req)
  return { limit: por_pagina, offset: (pagina - 1) * por_pagina }
}

// Para hacer peticiones ajax
const ajaxRequest = (url, params) => {
  return axios.get(url, {
    params: params,
  })
}

module.exports = {
  validateReq,
  validateRes,
  paginadoDefault,
  limitOffset,
  ajaxRequest,
}
