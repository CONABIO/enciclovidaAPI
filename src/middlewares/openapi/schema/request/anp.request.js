const Joi = require("joi")

const getANPReq = Joi.object({
  anpid: Joi.number().min(1).max(200).required(),
})

module.exports = getANPReq
