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
    const params = {}

    if (!_.isNil(req.query.especie_id)) params.id = req.query.especie_id

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

    params.pagina = pagina
    params.por_pagina = por_pagina
    params.busqueda = "avanzada"

    if (_.isNil(params.id)) {
      // Cuando NO selecciono un taxon para sacar sus especies
      return await ajaxRequest(url, params).then(async (especies) => {
        let resultados = {
          pagina: pagina,
          especies: especies.data.taxa,
          sharedUrl: especies.request.res.responseUrl.replace(".json", ""),
        }

        if (pagina == 1) resultados.num_especies = especies.data.x_total_entries
        return resultados
      })
    } else {
      return await Especie.getEspecie({ params: { id: params.id } }).then(
        async ({ especie, sharedUrl }) => {
          // Nos aseguramos que sea una division o phylum y siempre regresa especies
          params.nivel = "="
          params.cat = `7${especie.e_categoria_taxonomica.IdNivel2}00`

          return await ajaxRequest(url, params).then((especies) => {
            let resultados = {
              pagina: pagina,
              especies: especies.data.taxa,
              sharedUrl: especies.request.res.responseUrl.replace(".json", ""),
            }

            if (pagina == 1)
              resultados.num_especies = especies.data.x_total_entries

            return resultados
          })
        }
      )
    }
  }

  /**
   * Es la misma respuesta de una especie desde rails
   * @param {*} req
   * @returns La informacion asociada a una especie
   */
  static getEspecie = async (req) => {
    const url = `${enciclovidaURL}/especies/${req.params.id}.json`
    const params = {}

    return await ajaxRequest(url, params).then(async (especie) => {
      const sharedUrl = `${enciclovidaURL}/especies/${
        req.params.id
      }-${especie.data.NombreCompleto.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 -]/, "")
        .replace(/\s/g, "-")}`
      return { especie: especie.data, sharedUrl: sharedUrl }
    })
  }

  static getEspecieDescripcion = async (req) => {
    const url = `${enciclovidaURL}/especies/${req.params.id}/descripcion`
    const params = {}

    if (!_.isNil(req.query.fuente)) params.from = req.query.fuente
    if (!_.isNil(req.query.sin_fuente)) {
      if (req.query.sin_fuente) params.sin_fuente = "1"
      else params.sin_fuente = "0"
    }
    return await ajaxRequest(url, params).then((especie) => especie.data)
  }

  static getEspecieMedia = async (req) => {
    const bdiPhoto = `${enciclovidaURL}/especies/${req.params.id}/bdi-photos.json`
    const bdiPhotoParams = { type: "photo", api: "1" }
    const bdiUso = `${enciclovidaURL}/especies/${req.params.id}/bdi-photos.json`
    const bdiUsoParams = { album: "usos", api: "1" }
    const naturalistaPhoto = `${enciclovidaURL}/especies/${req.params.id}/fotos-naturalista.json`
    const naturalistaPhotoParams = { api: "1" }
    const xenocantoAudio = `${enciclovidaURL}/especies/${req.params.id}/xeno-canto.json`
    const xenocantoAudioParams = { type: "audio" }
    const macaulayPhoto = `${enciclovidaURL}/especies/${req.params.id}/media-cornell.json`
    const macaulayPhotoParams = { type: "photo" }
    const macaulayVideo = `${enciclovidaURL}/especies/${req.params.id}/media-cornell.json`
    const macaulayVideoParams = { type: "video" }
    const macaulayAudio = `${enciclovidaURL}/especies/${req.params.id}/media-cornell.json`
    const macaulayAudioParams = { type: "audio" }
    const tropicosPhoto = `${enciclovidaURL}/especies/${req.params.id}/media-tropicos.json`
    const tropicosPhotoParams = {}

    return await Promise.all([
      ajaxRequest(bdiPhoto, bdiPhotoParams),
      ajaxRequest(bdiUso, bdiUsoParams),
      ajaxRequest(naturalistaPhoto, naturalistaPhotoParams),
      ajaxRequest(xenocantoAudio, xenocantoAudioParams),
      ajaxRequest(macaulayPhoto, macaulayPhotoParams),
      ajaxRequest(macaulayVideo, macaulayVideoParams),
      ajaxRequest(macaulayAudio, macaulayAudioParams),
      ajaxRequest(tropicosPhoto, tropicosPhotoParams),
    ]).then((medias) => {
      const media = {}
      let fotos = []
      let videos = []
      let audios = []

      const bdiPhotoRes = medias[0].data
      if (_.isArray(bdiPhotoRes)) fotos = _.concat(fotos, bdiPhotoRes)

      const bdiUsoRes = medias[1].data
      if (_.isArray(bdiUsoRes)) fotos = _.concat(fotos, bdiUsoRes)

      const naturalistaPhotoRes = medias[2].data
      if (_.isArray(naturalistaPhotoRes))
        fotos = _.concat(fotos, naturalistaPhotoRes)

      const xenocantoAudioRes = medias[3].data
      if (_.isArray(xenocantoAudioRes))
        audios = _.concat(audios, xenocantoAudioRes)

      const macaulayPhotoRes = medias[4].data
      if (_.isArray(macaulayPhotoRes)) fotos = _.concat(fotos, macaulayPhotoRes)

      const macaulayVideoRes = medias[5].data
      if (_.isArray(macaulayVideoRes))
        videos = _.concat(videos, macaulayVideoRes)

      const macaulayAudioRes = medias[6].data
      if (_.isArray(macaulayAudioRes))
        audios = _.concat(audios, macaulayAudioRes)

      const tropicosPhotoRes = medias[7].data
      if (_.isArray(tropicosPhotoRes)) fotos = _.concat(fotos, tropicosPhotoRes)

      if (fotos.length > 0) media.fotos = fotos
      if (videos.length > 0) media.videos = videos
      if (audios.length > 0) media.audios = audios

      return media
    })
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
        resultados.sharedUrl = especies.request.res.responseUrl
          .replace(".json", "")
          .replace("/especies", "")

        if (pagina == 1) {
          resultados.pagina = pagina
          resultados.num_especies = especies.data.totales
          resultados.num_ejemplares = especies.data.num_ejemplares
        }
      }

      return resultados
    })
  }

  static getEncuentraPorNombre = async (req) => {
    return await ajaxRequest(
      `${enciclovidaURL}/validaciones/encuentra-por-nombre.json`,
      req.query
    ).then(async (especie) => await especie.data)
  }

  static getEspecieDescripcionPorNombre = async (req) => {
    return await Especie.getEncuentraPorNombre(req).then(async (especie) => {
      if (especie.estatus && especie.msg == "Búsqueda exacta") {
        return await Especie.getEspecieDescripcion({
          params: { id: especie.taxon.IdNombre },
          query: req.query,
        })
      } else return "<div></div>"
    })
  }
}

Especie.basicFields = ["entid", "nom_ent"]
Especie.tableName = "estados"

module.exports = Especie
