const knex = require("../config/db.config")
const _ = require("lodash")
const { limitOffset } = require("../utils/helper.util")

const Estado = class Estado {
  static getEstados = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["nom_ent"])

    const { limit, offset } = limitOffset(req.query)
    return query.limit(limit).offset(offset)
  }

  static getEstado = (req) => {
    return knex.from(this.tableName).where("entid", req.params.entid).first()
  }

  static getEstadoUbicacion = (req) => {
    return knex
      .select(this.basicFields)
      .from(this.tableName)
      .whereRaw(
        "ST_Intersects(st_geometryfromtext('POINT(?? ??)', 4326) ,geom::geometry)",
        [req.query.longitud, req.query.latitud]
      )
      .orderBy(["nom_ent"])
      .first()
  }
}

Estado.basicFields = ["entid", "nom_ent"]
Estado.tableName = "estados"

module.exports = Estado
