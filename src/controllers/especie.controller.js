const Especie = require("../models/especie")
const PaginadoReq = require("../middlewares/openapi/schema/request/helper.request")
const {
  getEspecieReq,
  getEspecieDescripcionReq,
  getEspeciesReq,
  getEspeciesBusquedaRegionReq,
  getEncuentraPorNombreReq,
  getEspecieDescripcionPorNombreReq,
  getEspecieRegistrosReq,
} = require("../middlewares/openapi/schema/request/especie.request")
const { validateReq } = require("../utils/helper.util")

const getEspecies = async (req, res, next) => {
  validateReq(req.query, getEspeciesReq)
    .then(async (validated) => await Especie.getEspecies({ query: validated }))
    .then(async (resultados) => {
      // Para poner los totales en el header solo en la primera pagina
      if (resultados.pagina == 1) {
        res.setHeader("num_especies", resultados.num_especies)
      }

      res.setHeader("shared-url", resultados.sharedUrl)
      res.send(resultados.especies)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspeciesConteo = async (req, res, next) => {
  validateReq(req.query, getEspeciesReq)
    .then(
      async (validated) => await Especie.getEspeciesConteo({ query: validated })
    )
    .then(async (resultados) => res.send(resultados))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecie = async (req, res, next) => {
  validateReq(req.params, getEspecieReq)
    .then(async (params) => await Especie.getEspecie({ params: params }))
    .then(async ({ especie, sharedUrl }) => {
      res.setHeader("shared-url", sharedUrl)
      return await res.send(especie)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const EspecieDescripcionVal = (req) => {
  return new Promise((resolve, reject) => {
    validateReq(req.params, getEspecieReq).then((validatedParams) => {
      validateReq(req.query, getEspecieDescripcionReq).then(
        (validatedQuery) => {
          resolve({ params: validatedParams, query: validatedQuery })
        }
      )
    })
  })
}

const getEspecieDescripcion = (req, res, next) => {
  EspecieDescripcionVal(req)
    .then((validated) => Especie.getEspecieDescripcion(validated))
    .then((especie) => res.send(especie))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecieMedia = (req, res, next) => {
  validateReq(req.params, getEspecieReq)
    .then((validated) => Especie.getEspecieMedia({ params: validated }))
    //.then((media) => Especie.getEspecieMediaObject(media))
    .then((mediaObject) => res.send(mediaObject))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspeciesBusquedaRegion = (req, res, next) => {
  validateReq(req.query, getEspeciesBusquedaRegionReq)
    .then((validated) =>
      Especie.getEspeciesBusquedaRegion({ query: validated })
    )
    .then((resultados) => {
      if (req.query.guia) {
        // Solo mando un json para saber si fue correcto.
        res.send({
          estatus: true,
          msg: "La guía fue generada exitosamente. Se te enviará un corrreo para la descarga.",
        })
      } else {
        // Para poner los totales en el header solo en la primera pagina
        if (resultados.pagina == 1) {
          res.setHeader("num_especies", resultados.num_especies)
          res.setHeader("num_ejemplares", resultados.num_ejemplares)
        }

        res.setHeader("shared-url", resultados.sharedUrl)
        res.send(resultados.especies)
      }
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEncuentraPorNombre = (req, res, next) => {
  validateReq(req.query, getEncuentraPorNombreReq)
    .then((query) => Especie.getEncuentraPorNombre({ query: query }))
    .then((especies) => res.send(especies))
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecieDescripcionPorNombre = (req, res, next) => {
  validateReq(req.query, getEspecieDescripcionPorNombreReq)
    .then((query) => Especie.getEspecieDescripcionPorNombre({ query: query }))
    .then((descripcion) => {
      res.send(descripcion)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecieRegistros = (req, res, next) => {
  Promise.all([
    validateReq(req.params, getEspecieReq),
    validateReq(req.query, getEspecieRegistrosReq),
  ])
    .then(
      async (validated) =>
        await Especie.getEspecieRegistros({
          params: validated[0],
          query: validated[1],
        })
    )
    .then(async (registros) => {
      await res.send(registros)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const getEspecieClasificacion = (req, res, next) => {
  validateReq(req.params, getEspecieReq)
    .then(
      async (especie_id) =>
        await Especie.getEspecieClasificacion({
          params: especie_id,
        })
    )
    .then(async (clasificacion) => {
      await res.send(clasificacion)
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

/*
const getEspeciesBusquedaRegionIconos = (req, res, next) => {
  ajaxEspecies()
    .then((especies) => {
      ajaxIconos(especies.data).then((especiesIconos) => {
        console.log(especiesIconos)
        res.send(especiesIconos)
      })
    })
    .catch(
      (errorHandler = (err) => {
        console.log("ERROR: ", err.message)
        next()
      })
    )
}

const ajaxEspecies = async () => {
  let url = "https://api.enciclovida.mx/v2/especies/busqueda/region"
  let params = {
    tipo_region: "municipio",
    region_id: 450,
    pagina: 1,
    por_pagina: 10,
  }

  return await ajaxRequest(url, params)
}

const ajaxIconos = (especies) => {
  return new Promise((resolve, reject) => {
    especiesIconos = []

    especies.forEach((especie) => {
      let url = "https://api.enciclovida.mx/v2/autocompleta/especies"
      let params = {
        q: especie.especie.NombreCompleto,
        cat_principales: false,
        cat: "especie",
        por_pagina: 5,
      }

      res = ajaxRequest(url, params).then((e) => {
        console.log(e.data)
        especies[0].especie.calonso = true
        return {
          especie: especie.especie,
          cons_amb_dist: e.data.especie[0].cons_amb_dist,
        }
        // especiesIconos.push({
        //   especie: especie.especie,
        //   cons_amb_dist: e.data.especie[0].cons_amb_dist,
        // })
      })

      especiesIconos.push(res)
    })

    //console.log(especiesIconos)

    resolve(especiesIconos)
  })
}
*/

module.exports = {
  getEspecies,
  getEspeciesConteo,
  getEspecie,
  getEspecieDescripcion,
  getEspecieMedia,
  getEspeciesBusquedaRegion,
  getEncuentraPorNombre,
  getEspecieDescripcionPorNombre,
  getEspecieRegistros,
  getEspecieClasificacion,
  //getEspeciesBusquedaRegionIconos,
}
