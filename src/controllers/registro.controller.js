const Registro = require("../models/registro")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getRegistroByIdReq,
  getRegistroByIdEjemplarReq,
} = require("../middlewares/openapi/schema/request/registro.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getRegistros = (req, res, next) => {
  validateReq(req.query, PaginadoReq)
    .then((validated) => Registro.getRegistros({ query: validated }))
    .then((registros) => res.send(registros))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getRegistroById = (req, res, next) => {
  validateReq(req.params, getRegistroByIdReq)
    .then((validated) => Registro.getRegistroById({ params: validated }))
    .then((registro) => res.send(registro))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getRegistroByIdEjemplar = (req, res, next) => {
  validateReq(req.params, getRegistroByIdEjemplarReq)
    .then(() => Registro.getRegistroByIdEjemplar(req))
    .then((registro) => res.send(registro))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getRegistros, getRegistroById, getRegistroByIdEjemplar }
