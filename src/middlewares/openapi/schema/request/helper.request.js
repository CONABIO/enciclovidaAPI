const Joi = require("joi")

const PaginadoReq = Joi.object().keys({
  pagina: Joi.number().min(1).max(1000000).default(1).required(),
  por_pagina: Joi.number().valid(10, 50, 100, 200).default(50).required(),
})

module.exports = PaginadoReq
