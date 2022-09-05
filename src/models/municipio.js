const knex = require("../config/db.config")
const { limitOffset } = require("../utils/helper.util")

const Municipio = class Municipio {
  static getMunicipios = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["nom_ent", "nom_mun"])

    const { limit, offset } = limitOffset(req.query)
    return query.limit(limit).offset(offset)
  }

  static getMunicipio = (req) => {
    return knex.from(this.tableName).where("munid", req.params.munid).first()
  }

  static getMunicipioUbicacion = (req) => {
    return knex
      .select(this.basicFields)
      .from(this.tableName)
      .whereRaw(
        "ST_Intersects(st_geometryfromtext('POINT(?? ??)', 4326) ,geom::geometry)",
        [req.query.longitud, req.query.latitud]
      )
      .orderBy(["nom_ent", "nom_mun"])
      .first()
  }
}

Municipio.basicFields = ["munid", "nom_mun", "nom_ent"]
Municipio.tableName = "municipios"

module.exports = Municipio
