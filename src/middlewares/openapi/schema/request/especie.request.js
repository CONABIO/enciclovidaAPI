const Joi = require("joi")
const { getEspecieDescripcionPorNombre } = require("../../../../models/especie")
const PaginadoReq = require("./helper.request")

const getEspecieReq = Joi.object({
  id: Joi.number().min(1).max(500000).required(),
})

const getEspecieDescripcionReq = Joi.object({
  fuente: Joi.string().valid(
    "conabio_dgcc",
    "conabio_inat",
    "conabio",
    "wikipedia_es",
    "wikipedia_en",
    "iucn"
  ),
  sin_fuente: Joi.boolean().default(true),
})

const getEspeciesReq = PaginadoReq.keys({
  especie_id: Joi.number().min(1).max(500000),
  dist: Joi.array().items(Joi.string().valid("3", "7", "10", "6")).single(),
  nom_ids: Joi.array()
    .items(Joi.string().valid("16", "14", "15", "17"))
    .single(),
  iucn_ids: Joi.array()
    .items(Joi.string().valid("25", "26", "27", "28", "29"))
    .single(),
  cites_ids: Joi.array().items(Joi.string().valid("22", "23", "24")).single(),
  ev_conabio_ids: Joi.array()
    .items(Joi.string().valid("1102", "1103", "1104"))
    .single(),
  uso: Joi.array()
    .items(
      Joi.string().valid(
        "11-4-0-0-0-0-0",
        "11-16-0-0-0-0-0",
        "11-5-0-0-0-0-0",
        "11-40-1-0-0-0-0",
        "11-40-2-0-0-0-0",
        "11-8-0-0-0-0-0",
        "11-47-0-0-0-0-0",
        "11-9-0-0-0-0-0",
        "11-10-0-0-0-0-0",
        "11-11-0-0-0-0-0",
        "11-13-0-0-0-0-0",
        "11-15-0-0-0-0-0",
        "11-14-0-0-0-0-0"
      )
    )
    .single(),
  forma: Joi.array()
    .items(
      Joi.string().valid(
        "18-14-0-0-0-0-0",
        "18-2-0-0-0-0-0",
        "18-15-0-0-0-0-0",
        "18-6-0-0-0-0-0",
        "18-9-0-0-0-0-0",
        "18-7-0-0-0-0-0",
        "18-16-0-0-0-0-0",
        "18-3-0-0-0-0-0",
        "18-5-0-0-0-0-0",
        "18-18-0-0-0-0-0",
        "18-10-0-0-0-0-0",
        "18-11-0-0-0-0-0",
        "18-8-0-0-0-0-0",
        "18-12-0-0-0-0-0",
        "18-4-0-0-0-0-0",
        "18-13-0-0-0-0-0",
        "18-17-0-0-0-0-0",
        "18-1-0-0-0-0-0"
      )
    )
    .single(),
  ambiente: Joi.array()
    .items(
      Joi.string().valid(
        "1024",
        "1025",
        "1026",
        "1027",
        "1207",
        "1208",
        "1209",
        "1210"
      )
    )
    .single(),
})

const getEspeciesBusquedaRegionReq = PaginadoReq.keys({
  region_id: Joi.number().min(1).max(3000),
  tipo_region: Joi.string().valid("estado", "municipio", "anp"),
  especie_id: Joi.number().min(1).max(500000),
  dist: Joi.array().items(Joi.string().valid("3", "7", "10", "6")).single(),
  nom_ids: Joi.array()
    .items(Joi.string().valid("16", "14", "15", "17"))
    .single(),
  iucn_ids: Joi.array()
    .items(Joi.string().valid("25", "26", "27", "28", "29"))
    .single(),
  cites_ids: Joi.array().items(Joi.string().valid("22", "23", "24")).single(),
  ev_conabio_ids: Joi.array()
    .items(Joi.string().valid("1102", "1103", "1104"))
    .single(),
  uso: Joi.array()
    .items(
      Joi.string().valid(
        "11-4-0-0-0-0-0",
        "11-16-0-0-0-0-0",
        "11-5-0-0-0-0-0",
        "11-40-1-0-0-0-0",
        "11-40-2-0-0-0-0",
        "11-8-0-0-0-0-0",
        "11-47-0-0-0-0-0",
        "11-9-0-0-0-0-0",
        "11-10-0-0-0-0-0",
        "11-11-0-0-0-0-0",
        "11-13-0-0-0-0-0",
        "11-15-0-0-0-0-0",
        "11-14-0-0-0-0-0"
      )
    )
    .single(),
  forma: Joi.array()
    .items(
      Joi.string().valid(
        "18-14-0-0-0-0-0",
        "18-2-0-0-0-0-0",
        "18-15-0-0-0-0-0",
        "18-6-0-0-0-0-0",
        "18-9-0-0-0-0-0",
        "18-7-0-0-0-0-0",
        "18-16-0-0-0-0-0",
        "18-3-0-0-0-0-0",
        "18-5-0-0-0-0-0",
        "18-18-0-0-0-0-0",
        "18-10-0-0-0-0-0",
        "18-11-0-0-0-0-0",
        "18-8-0-0-0-0-0",
        "18-12-0-0-0-0-0",
        "18-4-0-0-0-0-0",
        "18-13-0-0-0-0-0",
        "18-17-0-0-0-0-0",
        "18-1-0-0-0-0-0"
      )
    )
    .single(),
  ambiente: Joi.array()
    .items(
      Joi.string().valid(
        "1024",
        "1025",
        "1026",
        "1027",
        "1207",
        "1208",
        "1209",
        "1210"
      )
    )
    .single(),
  guia: Joi.boolean(),
  correo: Joi.string().email(),
})

const getEncuentraPorNombreReq = Joi.object({
  nombre: Joi.string()
    .min(3)
    .max(50)
    .description("Nombre científico")
    .required(),
})

const getEspecieDescripcionPorNombreReq = getEspecieDescripcionReq.append({
  nombre: Joi.string()
    .min(3)
    .max(50)
    .description("Nombre científico")
    .required(),
})

const getEspecieRegistrosReq = Joi.object({
  formato: Joi.string().valid("json", "kml", "kmz", "mapa-app").required(),
  coleccion: Joi.string().valid("naturalista", "snib").required(),
})

module.exports = {
  getEspecieReq,
  getEspecieDescripcionReq,
  getEspeciesReq,
  getEspeciesBusquedaRegionReq,
  getEncuentraPorNombreReq,
  getEspecieDescripcionPorNombreReq,
  getEspecieRegistrosReq,
}
