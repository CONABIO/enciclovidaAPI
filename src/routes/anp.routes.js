const router = require("express").Router()
const { getANPS, getANP } = require("../controllers/anp.controller")

router.route("/anps").get(getANPS)
router.route("/anps/:anpid").get(getANP)

module.exports = router
