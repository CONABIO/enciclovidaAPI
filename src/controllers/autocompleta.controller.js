const Autocompleta = require("../models/autocompleta")
const {
  getEspeciesAutocompletaReq,
  getRegionesAutocompletaReq,
} = require("../middlewares/openapi/schema/request/autocompleta.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEspeciesAutocompleta = (req, res, next) => {
  validateReq(req.query, getEspeciesAutocompletaReq)
    .then((validated) =>
      Autocompleta.getEspeciesAutocompleta({ query: validated })
    )
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getRegionesAutocompleta = (req, res, next) => {
  validateReq(req.query, getRegionesAutocompletaReq)
    .then((validated) =>
      Autocompleta.getRegionesAutocompleta({ query: validated })
    )
    .then((regiones) => res.send(regiones))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getEspeciesAutocompleta, getRegionesAutocompleta }
