const router = require("express").Router()
const {
  getMunicipios,
  getMunicipio,
  getMunicipioUbicacion,
} = require("../controllers/municipio.controller")

router.route("/municipios").get(getMunicipios)
router.route("/municipios/:munid").get(getMunicipio)
router.route("/municipios/ubicacion").get(getMunicipioUbicacion)

module.exports = router
