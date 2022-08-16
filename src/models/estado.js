const knex = require("../config/db.config")
const { limitOffset } = require("../utils/helper.util")

const Estado = class Estado {
  static getEstados = (req) => {
    const query = knex
      .select(this.basicFields)
      .from(this.tableName)
      .orderBy(["nom_ent"])

    const { limit, offset } = limitOffset(req.headers)
    return query.limit(limit).offset(offset)
  }

  static getEstado = (req) => {
    return knex.from(this.tableName).where("entid", req.params.entid).first()
  }
}

Estado.basicFields = ["entid", "nom_ent"]
Estado.tableName = "estados"

module.exports = Estado
