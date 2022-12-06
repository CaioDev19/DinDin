require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./routes")

app.use(express.json())

app.use(routes)

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
)
