require('dotenv').config();
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const md5 = require('crypto-js/md5');

const port = 8080

app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

app.post('/preapprove-notify', (req, res) => {
  console.log(req.body)
})

app.get("/payment-hash", (req, res) => {
  let merchantSecret  = process.env.MERCHANT_SECRET;
  let merchantId      = process.env.MERCHANT_ID;
  let orderId         = '11223';
  let amount          = req.query.amount;
  let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
  let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
  let currency        = 'LKR';
  let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();

  res.send(hash);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
