const _ = require("lodash")
const { enciclovidaURL } = require("../config/general.config")
const { ajaxRequest } = require("../utils/helper.util")

const Autocompleta = class Autocompleta {
  static getEspeciesAutocompleta = async (req) => {
    const url = `${enciclovidaURL}/sm/search`
    let categorias

    if (!_.isNil(req.query.cat_principales) && req.query.cat_principales) {
      categorias = this.categoriasPrincipales
    } else {
      categorias = req.query.cat
    }

    const params = {
      term: req.query.q,
      limit: req.query.por_pagina,
      types: categorias,
    }

    return await ajaxRequest(url, params).then((result) => {
      return result.data.results
    })
  }
}

Autocompleta.categoriasPrincipales = [
  "especie",
  "genero",
  "familia",
  "orden",
  "clase",
  "phylum",
  "division",
  "Reino",
]

module.exports = Autocompleta
