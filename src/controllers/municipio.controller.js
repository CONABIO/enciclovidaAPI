const Municipio = require("../models/municipio")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const getMunicipioReq = require("../middlewares/openapi/schema/request/municipio.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getMunicipios = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then((validated) => Municipio.getMunicipios({ headers: validated }))
    .then((municipios) => res.send(municipios))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getMunicipio = (req, res, next) => {
  validateReq(req.params, getMunicipioReq)
    .then((validated) => Municipio.getMunicipio({ params: validated }))
    .then((municipio) => res.send(municipio))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getMunicipios, getMunicipio }
