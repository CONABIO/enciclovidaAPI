const Joi = require("joi")

const getEstadoReq = Joi.object({
  entid: Joi.number().min(1).max(32).required(),
})

const getEstadoUbicacionReq = Joi.object({
  latitud: Joi.number().required(),
  longitud: Joi.number().required(),
})

module.exports = { getEstadoReq, getEstadoUbicacionReq }
