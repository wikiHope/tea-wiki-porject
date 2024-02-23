const mongoose = require('mongoose')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

function initialize () {
  mongoose.connect(process.env.DB_CONNECTION, options).then(
    () => {
      console.log("Connected to DB")
    }).catch((error) => {
      console.log(`Database connection error: ${error}`)
    })
}

module.exports = {
  initialize
}