const knex = require("../config/db.config")
const { limitOffset } = require("../utils/helper.util")

const Registro = class Registro {
  static getRegistros = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["id"])

    const { limit, offset } = limitOffset(req.headers)
    return query.limit(limit).offset(offset)
  }

  static getRegistroById = (req) => {
    return knex.from(this.tableName).where("id", req.params.id).first()
  }

  static getRegistroByIdEjemplar = (req) => {
    return knex
      .from(this.tableName)
      .where("idejemplar", req.params.idejemplar)
      .first()
  }
}

Registro.basicFields = [
  "id",
  "idejemplar",
  "idnombrecatvalido",
  "entid",
  "munid",
  "anpid",
  "latitud",
  "longitud",
  "tipocoleccion",
]
Registro.tableName = "snib"

module.exports = Registro
