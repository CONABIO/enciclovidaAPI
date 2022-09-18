const knex = require("../config/db.config")
const { limitOffset } = require("../utils/helper.util")

const Registro = class Registro {
  static getRegistros = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["id"])

    const { limit, offset } = limitOffset(req.query)
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

  static getNumRegistros = () => {
    return knex.first("id").from(this.tableName).orderBy("id", "desc")
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
