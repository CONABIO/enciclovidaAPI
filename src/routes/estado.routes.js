const router = require("express").Router()
const {
  getEstados,
  getEstado,
  getEstadoUbicacion,
} = require("../controllers/estado.controller")

router.route("/estados").get(getEstados)
router.route("/estados/:entid").get(getEstado)
router.route("/estados/ubicacion").get(getEstadoUbicacion)

module.exports = router
