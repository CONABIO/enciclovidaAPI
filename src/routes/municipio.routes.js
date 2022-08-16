const router = require("express").Router()
const {
  getMunicipios,
  getMunicipio,
} = require("../controllers/municipio.controller")

router.route("/municipios").get(getMunicipios)
router.route("/municipios/:munid").get(getMunicipio)

module.exports = router
