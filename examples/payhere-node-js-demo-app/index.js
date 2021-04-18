const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

app.post('/preapprove-notify', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})