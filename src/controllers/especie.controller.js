const Especie = require("../models/especie")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getEspecieReq,
  getEspecieDescripcionReq,
  getEspeciesBusquedaRegionReq,
} = require("../middlewares/openapi/schema/request/especie.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEspecies = (req, res, next) => {
  validateReq(req.query, PaginadoReq)
    .then((validated) => Especie.getEspecies({ query: validated }))
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

const EspecieDescripcionVal = (req) => {
  return new Promise((resolve, reject) => {
    validateReq(req.params, getEspecieReq).then((validatedParams) => {
      validateReq(req.query, getEspecieDescripcionReq).then(
        (validatedQuery) => {
          resolve({ params: validatedParams, query: validatedQuery })
        }
      )
    })
  })
}

const getEspecieDescripcion = (req, res, next) => {
  EspecieDescripcionVal(req)
    .then((validated) => Especie.getEspecieDescripcion(validated))
    .then((especie) => res.send(especie))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspeciesBusquedaRegion = (req, res, next) => {
  //EspeciesBusquedaRegionVal(req)
  validateReq(req.query, getEspeciesBusquedaRegionReq)
    .then((validated) =>
      Especie.getEspeciesBusquedaRegion({ query: validated })
    )
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err)
        next()
      })
    )
}

module.exports = {
  getEspecies,
  getEspecie,
  getEspecieDescripcion,
  getEspeciesBusquedaRegion,
}
