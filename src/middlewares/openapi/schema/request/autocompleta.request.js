const Joi = require("joi")

const getAutocompletaReq = Joi.object({
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

module.exports = getAutocompletaReq
