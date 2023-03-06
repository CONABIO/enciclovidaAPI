const router = require("express").Router()
const {
  getEspecies,
  getEspecie,
  getEspecieDescripcion,
  getEspecieMedia,
  getEspeciesBusquedaRegion,
  getEncuentraPorNombre,
  getEspecieDescripcionPorNombre,
  //getEspeciesBusquedaRegionIconos,
} = require("../controllers/especie.controller")

router.route("/especies").get(getEspecies)
router.route("/especies/:id(\\d+)").get(getEspecie)
router.route("/especies/:id(\\d+)/descripcion").get(getEspecieDescripcion)
router.route("/especies/:id(\\d+)/media").get(getEspecieMedia)
router.route("/especies/busqueda/region").get(getEspeciesBusquedaRegion)
router.route("/especies/encuentra-por-nombre").get(getEncuentraPorNombre)
router
  .route("/especies/descripcion-por-nombre")
  .get(getEspecieDescripcionPorNombre)
// router
//   .route("/especies/busqueda/region/iconos")
//   .get(getEspeciesBusquedaRegionIconos)

module.exports = router
