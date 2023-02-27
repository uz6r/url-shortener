const { v4: uuidv4 } = require('uuid')
const redisModule = require('redis')
const url = 'redis://:j1c87vmrjzpdqq6ynsce3jenrbt7q31382py0b69v6pz1351sdm3@satisfied-anteater-37bb81f5be.redisgreen.net:11042'
const redis = redisModule.createClient({ url })

redis.on('connect', () => { console.log('Connected to RedisGreen...') })
redis.on('ready', () => { console.log('RedisGreen Server is Ready...') })
redis.on('error', (error) => {
  console.log(error)
  process.exit(0)
})

const store = (url) => {
  return new Promise((resolve, reject) => {
    redis.get(url, (error, reply) => {
      if (error) { return reject('Error occured during Redis operation!') }
      if (reply) { resolve(reply) }
      else {
        let id = uuidv4()
        redis.set(id, url)
        redis.set(url, id)
        resolve(id)
      }
    })
  })
}

const fetch = (key) => {
  return new Promise((resolve, reject) => {
    redis.get(key,(error, reply) => {
      if (error) { console.log('Error occured during Redis operation!') }
      if (reply === null) {
        resolve(null)
      } else { resolve(reply) }
    })
  })
}

module.exports = {
    store: store,
    fetch: fetch
}