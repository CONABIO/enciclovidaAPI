const router = require("express").Router()
const { getEstados, getEstado } = require("../controllers/estado.controller")

router.route("/estados").get(getEstados)
router.route("/estados/:entid").get(getEstado)

module.exports = router
