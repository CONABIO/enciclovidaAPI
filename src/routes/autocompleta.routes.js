const router = require("express").Router()
const getEspeciesAutocompleta = require("../controllers/autocompleta.controller")

router.route("/autocompleta/especies").get(getEspeciesAutocompleta)

module.exports = router
