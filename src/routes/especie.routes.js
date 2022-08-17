const router = require("express").Router()
const { getEspecies, getEspecie } = require("../controllers/especie.controller")

router.route("/especies").get(getEspecies)
router.route("/especies/:id").get(getEspecie)

module.exports = router
