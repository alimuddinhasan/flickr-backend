const qs = require('qs')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

axios.defaults.baseURL = 'https://www.flickr.com/services/feeds'

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {
    arrayFormat: 'indices'
  })
}

app.use(cors())

app.get('/images', async (req, res, next) => {
  const queries = req.query
  try {
    const fetch = await axios.get('/photos_public.gne', {
      params: {
        format: 'json',
        nojsoncallback: 1,
        ...queries
      }
    })

    if (fetch) {
      const { data } = fetch
      res.json(data)
    } else {
      throw new Error('Something went wrong!')
    }

  } catch (err) {
    next(err)
  }
});

module.exports = app