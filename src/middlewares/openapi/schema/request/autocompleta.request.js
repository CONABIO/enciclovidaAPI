const Joi = require("joi")

const getEspeciesAutocompletaReq = Joi.object({
  q: Joi.string().min(2).max(50).required(),
  cat_principales: Joi.boolean(),
  cat: Joi.array()
    .items(
      Joi.string().valid(
        "especie",
        "subespecie",
        "variedad",
        "subvariedad",
        "forma",
        "subforma",
        "Reino",
        "subreino",
        "superphylum",
        "division",
        "subdivision",
        "phylum",
        "subphylum",
        "superclase",
        "grado",
        "clase",
        "subclase",
        "infraclase",
        "superorden",
        "orden",
        "suborden",
        "infraorden",
        "superfamilia",
        "familia",
        "subfamilia",
        "supertribu",
        "tribu",
        "subtribu",
        "genero",
        "subgenero",
        "seccion",
        "subseccion",
        "serie",
        "subserie"
      )
    )
    .single(),
  por_pagina: Joi.number().valid(5, 10, 20).default(5),
}).or("cat_principales", "cat")

const getRegionesAutocompletaReq = Joi.object({
  q: Joi.string().min(2).max(50).required(),
  reg: Joi.array()
    .items(Joi.string().valid("estado", "municipio", "anp"))
    .single()
    .required(),
  por_pagina: Joi.number().valid(5, 10, 20).default(5),
})

module.exports = { getEspeciesAutocompletaReq, getRegionesAutocompletaReq }
