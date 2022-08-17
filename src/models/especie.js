const { enciclovidaURL } = require("../config/general.config")
const { paginadoDefault, ajaxRequest } = require("../utils/helper.util")

const Especie = class Especie {
  static getEspecies = (req) => {
    return new Promise((resolve, reject) => {
      const { pagina, por_pagina } = paginadoDefault(req.headers)
      const url = `${enciclovidaURL}/busquedas/resultados.json`
      const params = {
        busqueda: "avanzada",
        por_pagina: por_pagina,
        pagina: pagina,
      }

      ajaxRequest(url, params)
        .then((result) => {
          resolve(result.data.taxa)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  static getEspecie = (req) => {
    const url = `${enciclovidaURL}/especies/${req.params.id}.json`
    const params = {}

    return ajaxRequest(url, params).then((especie) => especie.data)
  }
}

Especie.basicFields = ["entid", "nom_ent"]
Especie.tableName = "estados"

module.exports = Especie
