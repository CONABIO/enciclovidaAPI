const _ = require("lodash")
const { enciclovidaURL } = require("../config/general.config")
const { paginadoDefault, ajaxRequest } = require("../utils/helper.util")

const Especie = class Especie {
  /**
   * Es la misma respuesta de la busqueda avanzada de rails
   * @param {*} req
   * @returns Un listado de especies
   */
  static getEspecies = async (req) => {
    const { pagina, por_pagina } = paginadoDefault(req.query)
    const url = `${enciclovidaURL}/busquedas/resultados.json`
    const params = {
      busqueda: "avanzada",
      por_pagina: por_pagina,
      pagina: pagina,
    }

    return await ajaxRequest(url, params).then((especies) => {
      let resultados = {
        pagina: pagina,
        especies: especies.data.taxa,
      }

      if (pagina == 1) resultados.num_especies = especies.data.x_total_entries

      return resultados
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

  static getEspecieDescripcion = async (req) => {
    const url = `${enciclovidaURL}/especies/${req.params.id}/descripcion`
    const params = {}

    if (!_.isNil(req.query.fuente)) params.from = req.query.fuente
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
    const { pagina, por_pagina } = paginadoDefault(req.query)
    const url = `${enciclovidaURL}/explora-por-region/especies.json`
    const params = {}

    if (!_.isNil(req.query.tipo_region))
      params.tipo_region = req.query.tipo_region

    if (!_.isNil(req.query.region_id)) params.region_id = req.query.region_id

    if (!_.isNil(req.query.especie_id)) params.especie_id = req.query.especie_id

    if (!_.isEmpty(req.query.dist)) params.dist = req.query.dist

    // Este campo se separo en nom, iucn y cites para hacerlo mas entendible,
    // de regreso en el query se vuelven a juntar
    let edo_cons = _.concat(
      req.query.nom_ids,
      req.query.iucn_ids,
      req.query.cites_ids,
      req.query.ev_conabio_ids
    )

    edo_cons = _.compact(edo_cons)

    if (!_.isEmpty(edo_cons)) params.edo_cons = edo_cons

    if (!_.isEmpty(req.query.uso)) params.uso = req.query.uso

    if (!_.isEmpty(req.query.forma)) params.forma = req.query.forma

    if (!_.isEmpty(req.query.ambiente)) params.ambiente = req.query.ambiente

    if (!_.isEmpty(req.query.correo) && req.query.guia) {
      params.correo = req.query.correo
      params.guia = "1"
    } else {
      params.pagina = pagina
      params.por_pagina = por_pagina
    }

    return await ajaxRequest(url, params).then((especies) => {
      const resultados = {}
      if (req.query.guia) {
        resultados.especies = especies.data
      } else {
        resultados.especies = especies.data.taxones

        if (pagina == 1) {
          resultados.pagina = pagina
          resultados.num_especies = especies.data.totales
          resultados.num_ejemplares = especies.data.num_ejemplares
        }
      }

      return resultados
    })
  }
}

//{"tipo_region"=>"municipio", "region_id"=>"204", "especie_id"=>"22654", "correo"=>"calonso@conabio.gob.mx", "guia"=>"1", "nivel"=>">=", "cat"=>"7100", "id_gi"=>"22654", "pagina"=>"1", "por_pagina"=>"50"}

//{"utf8"=>"???", "nombre_region"=>"Coyoac??n, Ciudad de M??xico", "region_id"=>"204", "tipo_region"=>"municipio", "especie_id"=>"22654", "pagina"=>"1", "nivel"=>"=", "cat"=>"7100", "id_gi"=>"22654", "correo"=>"calonso@conabio.gob.mx", "guia"=>"1"}

Especie.basicFields = ["entid", "nom_ent"]
Especie.tableName = "estados"

module.exports = Especie
