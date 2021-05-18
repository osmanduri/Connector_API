const csvtojson = require('csvtojson');
const fs = require('fs');
const csvfilepath = "./Mews_reservation.csv";
const axios = require('axios');
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6IjUwMTNFNzU1LTcxRjItNEQwNy1BRTMxLTFCOUQ3QzE5NEFCMSIsInNlc3Npb25JRCI6IllDUTQtS1N5OS12OHo5LVhhMW0iLCJjaGFubmVsTmFtZSI6IkFwYWxlbyIsImFjY291bnRzIjpbeyJhY2NvdW50SWQiOiI0RDg4MjVDQi0zN0UxLTQ4QzItOTc2MS04OURDOTYwRjUyMEIiLCJhY2NvdW50TmFtZSI6IlN0YXllcnkiLCJwcm9wZXJ0aWVzIjpbeyJwcm9wZXJ0eUlkIjoiRkQ3RjZDMjgtMjAzMS00MUI0LUEyMzEtNENGM0FBQjQ2MUQyIiwicHJvcGVydHlOYW1lIjoiQmVybGluIEZyaWVkcmljaHNoYWluIn0seyJwcm9wZXJ0eUlkIjoiRjc5NzRCRDgtQUZCQi00RUEzLUFCODMtQTMwNTE4MEY3ODQ5IiwicHJvcGVydHlOYW1lIjoiQmllbGVmZWxkIEhhdXB0YmFobmhvZiJ9XX1dLCJsaWNlbnNlSWQiOm51bGwsInVzZXJJbmZvcm1hdGlvbnMiOnsibmFtZSI6Ikhhbm5pYmFsIER1TW9udCIsImVtYWlsIjoiZHVtb250QGJkLWFwYXJ0bWVudC5jb20iLCJ1c2VyTmFtZSI6ImgxIn19LCJpYXQiOjE2MjEzMzQ2OTAsImV4cCI6MTYyMTQyMTA5MH0.0AdGk_qgpgfgchLq5DzAa-2nKNY-VcfcZ6mCZUh4cfw";
const exp = new RegExp("^((0[1-9])|([1-8][0-9])|(9[0-8])|(2A)|(2B))[0-9]{3}$") // code postal francais
let i = 0;
//let csvKeysJson;

csvtojson()
.fromFile(csvfilepath)
.then((jsonObj) => {
    let finalData = [];
    let singleData = [];
    let customer;
    jsonObj.forEach(element => {
        customer = element;
        singleData = get_customer(customer);
        finalData.push(singleData);
    });
    //csvKeys = Object.keys(jsonObj[0]);

    //console.log(csvKeys)
    /*csvKeys.forEach((e,index) => {
        console.log(e,index)
    })*/



    fs.writeFileSync("output.json", JSON.stringify(finalData), 'utf-8',
    function(err){console.log(err);});

})

function getZipCode(adresse, callback){
    var zipCode;
    adresse = adresse.replace(/,/g, '');
    adresse = adresse.replace(/-/g, '');
    adresse = adresse.split(' ');

    adresse.forEach((element) => {

               if(exp.test(element)){ 
                zipCode = element;
               }

           })
           callback(zipCode);
    }
function removeZipCode(adresse, codepostal){
    adresse = adresse.replace(codepostal, '');
    adresse = adresse.replace(/-/g, '');

    return adresse;
}


function get_customer(customer){

        var codepostal;
    getZipCode(customer.Address, (zipCode) => {
        codepostal = zipCode; // Extrait le code postal de l'Address 1
        customer.Address = removeZipCode(customer.Address, codepostal); // Enleve le code postal de Address 1
    })


    const data = {

        dublinCore:{

            propertyId: "FD7F6C28-2031-41B4-A231-4CF3AAB461D2",
            type: customer.type     != "" && customer.type  != null && customer.type  != undefined  ? customer.type : 1,
            origin: customer.Origin         != "" && customer.Origin  != null && customer.Origin  != undefined  ? customer.Origin : 'Mews',
            languageIso: customer.languageIso       != "" && customer.languageIso  != null && customer.languageIso  != undefined  ? customer.languageIso : 'FR'


        },
        profile:{

            lastName: customer.Last_name         != "" && customer.Last_name  != null && customer.Last_name  != undefined  ? customer.Last_name : 'lastName unknown',
            firstName: customer.First_name       != "" && customer.First_name  != null && customer.First_name  != undefined  ? customer.First_name : 'firstName unknown',
            title: customer.title       != "" && customer.title  != null && customer.title  != undefined  ? customer.title : '-'
        },
        addresses:[
            {
                mainAddress: true                                   != "" && customer.mainAddress  != null && customer.mainAddress  != undefined  ? customer.mainAddress : true,
                addressType: customer.addressType                   != "" && customer.addressType  != null && customer.addressType  != undefined  ? customer.addressType : 'Work or Personal unknown',
                street1: customer.Address                        != "" && customer.Address  != null && customer.Address  != undefined  ? customer.Address : 'Address unknown',
                street2: customer.addressLine2                      != "" && customer.addressLine2  != null && customer.addressLine2  != undefined  ? customer.addressLine2 : 'Address2 unknown',
                //street3: ""                                         != "" && customer.countryCode  != null && customer.countryCode  != undefined  ? customer.countryCode : 'languageIso UNKNOWN',
                zipCode: codepostal                       != "" && codepostal  != null && codepostal  != undefined  ? codepostal : "Zipcode unknown",
                city: customer.city                                 != "" && customer.city  != null && customer.city  != undefined  ? customer.city : 'City unknown',
                state: customer.Customer_nationality                != "" && customer.Customer_nationality   != null && customer.Customer_nationality   != undefined  ? customer.Customer_nationality : 'State unknown',
                //region: "South England"                             != (null || "" || undefined) ? customer.city : '-',
                country: customer.countryCode                       != "" && customer.countryCode  != null && customer.countryCode  != undefined  ? customer.countryCode : 'FR'
            }
        ],

        contacts:[
            {
                contactCategory: "Email",
                mainContact: true,
                contactType: customer.contactType != "" && customer.contactType  != null && customer.contactType  != undefined  ? customer.contactType : 'Work or Personal unknown',
                isValid: true,
                value: customer.Email != "" && customer.Email  != null && customer.Email  != undefined  ? customer.Email : 'Email unknown'
            },
            {
                contactCategory: "Phone",
                mainContact: true,
                contactType: customer.contactType != "" && customer.contactType  != null && customer.contactType  != undefined  ? customer.contactType : 'Work or Personal unknown',
                isValid: true,
                value: customer.phoneNumber != "" && customer.phoneNumber  != null && customer.phoneNumber  != undefined  ? customer.phoneNumber : 'Phone number unknown'
            }
        ],

        notes:[
            {
                noteId: "",
                bookingId:null,
                note: (customer.Notes + '\n' + customer.Customer_notes),
                creationDateUTC:customer.Created
            }
        ],

        tags: [{
            tagId: "",
            value: customer.Segment,
            type: "Segmentation",
            groupTag: "Profile"
        },{
            tagId: "",
            value: customer.Segment,
            type: "Segmentation",
            groupTag: "Profile"
        },{
            tagId: "",
            value: customer.Segment,
            type: "Guest preferences",
            groupTag: "Seasonality"
        },{
            tagId: "",
            value: customer.Segment,
            type: "Guest preferences",
            groupTag: "Seasonality"
        },{
            tagId: "",
            value: customer.Segment,
            type: "Guest preferences",
            groupTag: "F&B"
        }]
    };

    axios.post('https://dev.guestappz.io/factory/CreateUpdateCustomer', data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })
    .then( async response => {

        await console.log(response.data.data.profile.firstName)
        //console.log(customer.Segment)
        await console.log(++i);

    })
    .catch(async function (error) {
        await console.log(error);

      });

    return data;
}