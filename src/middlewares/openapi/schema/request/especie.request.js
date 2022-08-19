const Joi = require("joi")

const getEspecieReq = Joi.object({
  id: Joi.number().min(1).max(500000).required(),
})

const getEspeciesBusquedaRegionReq = Joi.object({
  region_id: Joi.number().min(1).max(3000),
  tipo_region: Joi.string().valid("estado", "municipio", "anp"),
})

module.exports = { getEspecieReq, getEspeciesBusquedaRegionReq }
