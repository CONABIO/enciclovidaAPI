const Autocompleta = require("../models/autocompleta")
const getAutocompletaReq = require("../middlewares/openapi/schema/request/autocompleta.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getEspeciesAutocompleta = (req, res, next) => {
  validateReq(req.query, getAutocompletaReq)
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

module.exports = getEspeciesAutocompleta
