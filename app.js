const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const validUrl = require('valid-url')
const redis = require('./redis')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/')
})

router.get('/shorten_url/:url', async (request, response) => {
  try {
    let url = await redis.fetch(request.params.url)
    if (url !== null) {
      response.redirect(url)
    } else {
      response.send('Invalid/expired URL')
    }
  } catch(error) {
    console.log(error)
    response.send('Invalid/expired URL')
  }
})

router.post('/api/shorten_url', async (request, response) => {
  if (!validUrl.isUri(request.body.url)) { return response.send('Invalid URL') }
  try {
    let hash = await redis.store(request.body.url)
    response.send(`${request.hostname}:${process.env.BASE_PORT||8000}/shorten_url/${hash}`)
  } catch(error) {
    console.log(error)
    response.send('Error occurred while storing URL.')
  }
})

app.use('/', router)

app.get('*', function(request, response){
  response.status(404).send('Invalid URL!');
})

app.listen(process.env.BASE_PORT || 8000)
console.log(`App is listening at ${process.env.BASE_PORT || 8000}...`)