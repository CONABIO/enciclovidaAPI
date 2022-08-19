const Especie = require("../models/especie")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getEspecieReq,
  getEspeciesBusquedaRegionReq,
} = require("../middlewares/openapi/schema/request/especie.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEspecies = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then(() => Especie.getEspecies(req))
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
    .then(() => Especie.getEspecie(req))
    .then((especie) => res.send(especie))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspeciesBusquedaRegion = (req, res, next) => {
  console.log(req.query)
  validateReq(req.query, getEspeciesBusquedaRegionReq)
    .then(() => validateReq(req.headers, PaginadoReq))
    .then(() => Especie.getEspeciesBusquedaRegion(req))
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getEspecies, getEspecie, getEspeciesBusquedaRegion }
