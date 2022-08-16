const knex = require("../config/db.config")

const Snib = class Snib {
  static getANPS = (req) => {
    return knex.select(this.basicFields).from(this.tableName).orderBy(["anpid"])
  }
}

Snib.basicFields = [
  "id",
  "idejemplar",
  "idnombrecatvalido",
  "especievalidabusqueda",
  "comentarioscatvalido",
  "entid",
  "munid",
  "anpid",
  "latitud",
  "longitud",
  "localidad",
  "municipiomapa",
  "estadomapa",
  "paismapa",
  "categoriataxonomica",
  "colector",
  "coleccion",
  "probablelocnodecampo",
  "ejemplarfosil",
  "institucion",
  "paiscoleccion",
  "proyecto",
  "urlproyecto",
  "urlejemplar",
  "urlorigen",
  "tipocoleccion",
]
Snib.tableName = "snib"

module.exports = Snib
