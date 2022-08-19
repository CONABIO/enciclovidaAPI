const { enciclovidaURL } = require("../config/general.config")
const { paginadoDefault, ajaxRequest } = require("../utils/helper.util")

const Especie = class Especie {
  /**
   * Es la misma respuesta de la busqueda avanzada de rails
   * @param {*} req
   * @returns Un listado de especies
   */
  static getEspecies = async (req) => {
    const { pagina, por_pagina } = paginadoDefault(req.headers)
    const url = `${enciclovidaURL}/busquedas/resultados.json`
    const params = {
      busqueda: "avanzada",
      por_pagina: por_pagina,
      pagina: pagina,
    }

    return await ajaxRequest(url, params).then((result) => {
      return result.data.taxa
    })
  }

  /**
   * Es la misma respuesta de una especie desde rails
   * @param {*} req
   * @returns La informacion asociada a una especie
   */
  static getEspecie = async (req) => {
    const url = `${enciclovidaURL}/especies/${req.params.id}.json`
    const params = {}

    return await ajaxRequest(url, params).then((especie) => especie.data)
  }

  /**
   * Es la misma informacion de la busqueda por region de rails
   * La respuesta es diferente a la de getEspecies por que una viene de
   * catalogocentralizado y la otra de postgres (corte del SNIB).
   * @param {*} req
   * @returns Un listado de especies
   */
  static getEspeciesBusquedaRegion = async (req) => {
    const { pagina, por_pagina } = paginadoDefault(req.headers)
    const url = `${enciclovidaURL}/explora-por-region/especies.json`
    const params = {
      region_id: req.query.region_id,
      tipo_region: req.query.tipo_region,
      //por_pagina: 8, //Este por pagina viene definido desde rails por default
      pagina: pagina,
    }

    return await ajaxRequest(url, params).then((especie) => {
      return especie.data
    })
  }
}

Especie.basicFields = ["entid", "nom_ent"]
Especie.tableName = "estados"

module.exports = Especie
