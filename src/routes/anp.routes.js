const router = require("express").Router()
const {
  getANPS,
  getANP,
  getANPUbicacion,
} = require("../controllers/anp.controller")

router.route("/anps").get(getANPS)
router.route("/anps/:anpid").get(getANP)
router.route("/anps/ubicacion").get(getANPUbicacion)

module.exports = router
