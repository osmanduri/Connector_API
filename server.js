const express = require('express')
const app = express();
const port = 5000;
require('./models/config_db')
//require('./index')
const routeApi = require('./Routes/customers')
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use('/api', routeApi);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
