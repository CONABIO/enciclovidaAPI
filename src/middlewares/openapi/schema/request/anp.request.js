const Joi = require("joi")

const getANPReq = Joi.object({
  anpid: Joi.number().min(1).max(200).required(),
})

const getANPUbicacionReq = Joi.object({
  latitud: Joi.number().required(),
  longitud: Joi.number().required(),
})

module.exports = { getANPReq, getANPUbicacionReq }
