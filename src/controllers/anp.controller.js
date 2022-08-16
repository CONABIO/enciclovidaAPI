const ANP = require("../models/anp")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const getANPReq = require("../middlewares/openapi/schema/request/anp.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getANPS = (req, res, next) => {
  validateReq(req.headers, PaginadoReq)
    .then(() => ANP.getANPS(req))
    .then((anps) => res.send(anps))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getANP = (req, res, next) => {
  validateReq(req.params, getANPReq)
    .then(() => ANP.getANP(req))
    .then((anp) => res.send(anp))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getANPS, getANP }
