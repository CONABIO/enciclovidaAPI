const Registro = require("../models/registro")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getRegistroByIdReq,
  getRegistroByIdEjemplarReq,
} = require("../middlewares/openapi/schema/request/registro.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getRegistros = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then(() => Registro.getRegistros(req))
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
    .then(() => Registro.getRegistroById(req))
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
