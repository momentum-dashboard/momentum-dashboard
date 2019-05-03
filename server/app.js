require('dotenv').config({path: './.env'})
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/momentum',{ useNewUrlParser : true })

app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
const checkWeather = require('./weather API/checkWeather')
app.get('/api/weather', (req, res) => {
  // console.log(req.query)
  checkWeather(req.query.city, req.query.country, a => {
    if(a) {
      res.status(200).json(a)
    }
  })
})


app.use(route)
app.listen(port,() => {
  console.log(`listening on port: ${port}!`)
})