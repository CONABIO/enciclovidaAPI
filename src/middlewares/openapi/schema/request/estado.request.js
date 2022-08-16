const Joi = require("joi")

const getEstadoReq = Joi.object({
  entid: Joi.number().min(1).max(32).required(),
})

module.exports = getEstadoReq
