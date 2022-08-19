const Especie = require("../models/especie")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getEspecieReq,
  getEspeciesBusquedaRegionReq,
} = require("../middlewares/openapi/schema/request/especie.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEspecies = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then((validated) => Especie.getEspecies({ headers: validated }))
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecie = (req, res, next) => {
  validateReq(req.params, getEspecieReq)
    .then((validated) => Especie.getEspecie({ params: validated }))
    .then((especie) => res.send(especie))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

/**
 * Se anidan las promesas para asgurar que al final se concatenen los parametros
 * @param {*} req Es el request que viene desde la ruta
 * @returns Todos los parametros validados con joi ya sea en el header o en el query
 */
const allValidated = (req) => {
  return new Promise((resolve, reject) => {
    validateReq(req.headers, PaginadoReq).then((validatedHeaders) => {
      validateReq(req.query, getEspeciesBusquedaRegionReq).then(
        (validatedQuery) => {
          resolve({ headers: validatedHeaders, query: validatedQuery })
        }
      )
    })
  })
}

const getEspeciesBusquedaRegion = (req, res, next) => {
  allValidated(req)
    .then((validated) => Especie.getEspeciesBusquedaRegion(validated))
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getEspecies, getEspecie, getEspeciesBusquedaRegion }
