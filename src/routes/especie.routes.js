const router = require("express").Router()
const {
  getEspecies,
  getEspeciesConteo,
  getEspecie,
  getEspecieDescripcion,
  getEspecieMedia,
  getEspeciesBusquedaRegion,
  getEncuentraPorNombre,
  getEspecieDescripcionPorNombre,
  getEspecieRegistros,
  getEspecieClasificacion,
  //getEspeciesBusquedaRegionIconos,
} = require("../controllers/especie.controller")

router.route("/especies").get(getEspecies)
router.route("/especies/conteo").get(getEspeciesConteo)
router.route("/especies/:id(\\d+)").get(getEspecie)
router.route("/especies/:id(\\d+)/descripcion").get(getEspecieDescripcion)
router.route("/especies/:id(\\d+)/media").get(getEspecieMedia)
router.route("/especies/busqueda/region").get(getEspeciesBusquedaRegion)
router.route("/especies/encuentra-por-nombre").get(getEncuentraPorNombre)
router
  .route("/especies/descripcion-por-nombre")
  .get(getEspecieDescripcionPorNombre)
router.route("/especies/:id(\\d+)/registros").get(getEspecieRegistros)
router.route("/especies/:id(\\d+)/clasificacion").get(getEspecieClasificacion)
// router
//   .route("/especies/busqueda/region/iconos")
//   .get(getEspeciesBusquedaRegionIconos)

module.exports = router
