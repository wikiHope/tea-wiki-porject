const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const db = require('./db')
const cors = require('cors')
require('dotenv/config')
const app = express()


//configuration
const port = process.env.PORT || 3000

//Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
  res.send('Hello World!!')
})
app.use('/api', routes)

//DB
db.initialize()

app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`))