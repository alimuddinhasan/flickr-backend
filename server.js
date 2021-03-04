const app = require('./index')

app.listen(process.env.PORT || 3030, () => {
  console.log('Listening to port 3030')
})