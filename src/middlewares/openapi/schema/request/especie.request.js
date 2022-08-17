const Joi = require("joi")

const getEspecieReq = Joi.object({
  id: Joi.number().min(1).max(500000).required(),
})

module.exports = getEspecieReq
