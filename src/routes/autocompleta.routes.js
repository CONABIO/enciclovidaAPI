const router = require("express").Router()
const {
  getEspeciesAutocompleta,
  getRegionesAutocompleta,
} = require("../controllers/autocompleta.controller")

router.route("/autocompleta/especies").get(getEspeciesAutocompleta)
router.route("/autocompleta/regiones").get(getRegionesAutocompleta)

module.exports = router
