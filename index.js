const express = require("express")
const bodyParser = require("body-parser")
const { port } = require("./src/config/general.config")
const app = express()

app.use(bodyParser.json())
app.disable("x-powered-by")
app.use("/", [require("./src/routes/especie.routes")])
app.use("/", [require("./src/routes/registro.routes")])
app.use("/", [require("./src/routes/autocompleta.routes")])
app.use("/", [require("./src/routes/estado.routes")])
app.use("/", [require("./src/routes/municipio.routes")])
app.use("/", [require("./src/routes/anp.routes")])
app.use("/", [require("./src/routes/swagger.routes")])

app.use(function (req, res, next) {
  return res.status(404).send({ message: "Route: " + req.url + " Not found." })
})

app.use(function (req, res, next) {
  return res
    .status(500)
    .send({ message: "Route: " + req.url + " Internal Server Error." })
})

app
  .listen(port, () => {
    console.log(`Server started on port ${port}`)
  })
  .on("error", (err) => {
    console.log("ERROR: ", err)
  })

module.exports = app
