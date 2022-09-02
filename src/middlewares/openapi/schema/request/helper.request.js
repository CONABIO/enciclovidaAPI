const Joi = require("joi")

const PaginadoReq = Joi.object().keys({
  pagina: Joi.number().min(1).max(1000000).default(1),
  por_pagina: Joi.number().valid(50, 100, 200).default(50),
})

module.exports = PaginadoReq
