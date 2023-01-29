const router = require("express").Router()
const {
  getEspecies,
  getEspecie,
  getEspecieDescripcion,
  getEspeciesBusquedaRegion,
  //getEspeciesBusquedaRegionIconos,
} = require("../controllers/especie.controller")

router.route("/especies").get(getEspecies)
router.route("/especies/:id").get(getEspecie)
router.route("/especies/:id/descripcion").get(getEspecieDescripcion)
router.route("/especies/busqueda/region").get(getEspeciesBusquedaRegion)
// router
//   .route("/especies/busqueda/region/iconos")
//   .get(getEspeciesBusquedaRegionIconos)

module.exports = router
