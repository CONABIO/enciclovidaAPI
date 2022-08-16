const router = require("express").Router()
const {
  getRegistros,
  getRegistroById,
  getRegistroByIdEjemplar,
} = require("../controllers/registro.controller")

router.route("/registros").get(getRegistros)
router.route("/registros/:id").get(getRegistroById)
router.route("/registros/:idejemplar/idejemplar").get(getRegistroByIdEjemplar)

module.exports = router
