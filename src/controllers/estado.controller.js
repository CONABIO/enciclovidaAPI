const Estado = require("../models/estado")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getEstadoReq,
  getEstadoUbicacionReq,
} = require("../middlewares/openapi/schema/request/estado.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEstados = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then((validated) => Estado.getEstados({ headers: validated }))
    .then((estados) => res.send(estados))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEstado = (req, res, next) => {
  validateReq(req.params, getEstadoReq)
    .then((validated) => Estado.getEstado({ params: validated }))
    .then((estado) => res.send(estado))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEstadoUbicacion = (req, res, next) => {
  validateReq(req.query, getEstadoUbicacionReq)
    .then((validated) => Estado.getEstadoUbicacion({ query: validated }))
    .then((estado) => res.send(estado))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getEstados, getEstado, getEstadoUbicacion }
