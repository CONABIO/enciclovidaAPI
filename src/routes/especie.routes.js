const router = require("express").Router()
const {
  getEspecies,
  getEspecie,
  getEspeciesBusquedaRegion,
} = require("../controllers/especie.controller")

router.route("/especies").get(getEspecies)
router.route("/especies/:id").get(getEspecie)
router.route("/especies/busqueda/region").get(getEspeciesBusquedaRegion)

module.exports = router
