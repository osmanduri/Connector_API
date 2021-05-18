function get_customer(customer){
    
    const data = [{

        dublinCore:{

            propertyId: customer.propertyId     != null ? customer.propertyId : '',
            type: customer.type != null ? customer.type : 0,
            origin: customer.origin         != null ? customer.origin : 'apaleo',
            languageIso: customer.countryCode       != null ? customer.countryCode : '',

        },
        profile:{
            
            lastName: customer.lastName         != null ? customer.lastName : '',
            firstName: customer.firstName       != null ? customer.firstName : '',
            title: customer.title       != null ? customer.title : '',
        },
        addresses:[
            {
                mainAddress: true,
                addressType: "Personal",
                street1: customer.addressLine1,
                street2: customer.addressLine2,
                street3: "",
                zipCode: customer.postalCode,
                city: customer.city,
                state: "",
                region: "South England",
                country: customer.countryCode
            }
        ],

        contacts:[
            {
                contactCategory: "email",
                mainContact: true,
                contactType: "Personal",
                isValid: true,
                value: customer.email
            },
            {
                contactCategory: "phone",
                mainContact: true,
                contactType: "Work",
                isValid: true,
                value: customer.phoneNumber
            }
        ]

    }];

    return data;
}