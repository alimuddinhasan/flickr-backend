const qs = require('qs')
const axios = require('axios')
const express = require('express')
const app = express()

axios.defaults.baseURL = 'https://www.flickr.com/services/feeds'

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, {
    arrayFormat: 'indices'
  })
}

app.get('/images', async (req, res, next) => {
  try {
    const fetch = await axios.get('/photos_public.gne', {
      params: {
        format: 'json',
        nojsoncallback: 1
      }
    })

    if (fetch) {
      const { data } = fetch
      res.json(data)
    } else {
      throw new Error('Something went wrong!')
    }



  } catch (err) {
    console.log('ERROR DONG')
    next(err)
  }
});

app.listen(3000, () => {
  console.log('Listening to port 3000')
})