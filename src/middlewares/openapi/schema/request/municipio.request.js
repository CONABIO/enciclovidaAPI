const Joi = require("joi")

const getMunicipioReq = Joi.object({
  munid: Joi.number().min(1).max(3000).required(),
})

module.exports = getMunicipioReq
