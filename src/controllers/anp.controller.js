const ANP = require("../models/anp")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getANPReq,
  getANPUbicacionReq,
} = require("../middlewares/openapi/schema/request/anp.request")
const { validateReq, validateRes } = require("../utils/helper.util")

const getANPS = (req, res, next) => {
  validateReq(req.query, PaginadoReq)
    .then((validated) => ANP.getANPS({ query: validated }))
    .then((anps) => {
      // Para poner los totales en el header solo en la primera pagina
      if (req.query.pagina == "1") {
        ANP.getNumANPS()
          .then((num_anps) => {
            res.setHeader("num_anps", num_anps.count)
            res.send(anps)
          })
          .catch(
            (errorHandler = (err) => {
              console.log("ERROR: ", err.message)
              next()
            })
          )
      } else res.send(anps)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getANP = (req, res, next) => {
  validateReq(req.params, getANPReq)
    .then((validated) => ANP.getANP({ params: validated }))
    .then((anp) => res.send(anp))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getANPUbicacion = (req, res, next) => {
  validateReq(req.query, getANPUbicacionReq)
    .then((validated) => ANP.getANPUbicacion({ query: validated }))
    .then((anps) => res.send(anps))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

module.exports = { getANPS, getANP, getANPUbicacion }
