            dublinCore:{//accountId: customer.accountId       != null ? customer.accountId : '',
            propertyId: customer.propertyId     != null ? customer.propertyId : '',
            /*creationDate: customer.creationDate != null ? customer.creationDate : '',
            lastChangeDate: customer.lastChangeDate         != null ? customer.lastChangeDate : '',
            completed: customer.completed       != null ? customer.completed : '',
            duplicate: customer.duplicate       != null ? customer.duplicate : '',
            verified: customer.verified         != null ? customer.verified : '',
            merged: customer.merged         != null ? customer.merged : '',
            mergedDate: customer.mergedDate         != null ? customer.mergedDate : '',
            mergedUser: customer.mergedUser         != null ? customer.mergedDate : '',
            active: customer.active         != null ? customer.active : '',
            archive: customer.archive       != null ? customer.archive : '',*/
            type: customer.type != null ? customer.type : 0,
            origin: customer.origin         != null ? customer.origin : '',
            languageIso: customer.languageIso       != null ? customer.languageIso : '',
            //nationalityIso: customer.nationalityIso         != null ? customer.nationalityIso : ''}





            profile:{
                //fullname: customer.fullName         != null ? customer.fullName : '',
                lastName: customer.lastName         != null ? customer.lastName : '',
                firstName: customer.firstName       != null ? customer.firstName : '',
                title: customer.title       != null ? customer.title : '',
                //gender: customer.gender         != null ? customer.gender : '',
                //birthday: customer.birthday         != null ? customer.birthday : '',
                //position: customer.position         != null ? customer.position : ''
            },


            app.get('/', async (req, res) => {
                await res.send(data)
            })
            
            app.post('https://dev.guestappz.io/factory/CreateUpdateCustomer', async (req, res) => {
                await res.send('OK')
            })


const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const express = require('express')
const app = express();
const port = 5000;
require('./models/config_db')