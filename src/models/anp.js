const knex = require("../config/db.config")
const { limitOffset } = require("../utils/helper.util")

const ANP = class ANP {
  static getANPS = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["estados", "nombre"])

    const { limit, offset } = limitOffset(req.headers)
    return query.limit(limit).offset(offset)
  }

  static getANP = (req) => {
    return knex.from(this.tableName).where("anpid", req.params.anpid).first()
  }

  static getANPUbicacion = (req) => {
    return knex
      .select(this.basicFields)
      .from(this.tableName)
      .whereRaw(
        "ST_Intersects(st_geometryfromtext('POINT(?? ??)', 4326) ,geom::geometry)",
        [req.query.longitud, req.query.latitud]
      )
      .orderBy(["estados", "nombre"])
  }
}

ANP.basicFields = ["anpid", "nombre", "cat_manejo", "estados", "municipios"]
ANP.tableName = "anp"

module.exports = ANP
