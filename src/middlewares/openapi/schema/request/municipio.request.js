const Joi = require("joi")

const getMunicipioReq = Joi.object({
  munid: Joi.number().min(1).max(3000).required(),
})

const getMunicipioUbicacionReq = Joi.object({
  latitud: Joi.number().required(),
  longitud: Joi.number().required(),
})

module.exports = { getMunicipioReq, getMunicipioUbicacionReq }
