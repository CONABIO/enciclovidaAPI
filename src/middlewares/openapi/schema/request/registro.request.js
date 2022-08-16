const Joi = require("joi")

const getRegistroByIdReq = Joi.object({
  id: Joi.number().min(1).max(50000000).required(),
})

const getRegistroByIdEjemplarReq = Joi.object({
  idejemplar: Joi.string().alphanum().length(32).required(),
})

module.exports = { getRegistroByIdReq, getRegistroByIdEjemplarReq }
