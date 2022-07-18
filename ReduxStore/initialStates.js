import {useContext} from "react";
import AppWideContext from "../store/AppWideContext";


export const userState = {
    basicDetails: {
        user_name: '',
        email: '',
        phone_number: '',
    },
    birthday: '',
    anniversary: '',
    addresses: [
        {
            "name": "Dhiraj",
            "lastname": "Pandey",
            "email": "shubham@webologics.com",
            "phone": "07751023687",
            "address": "603, Raviraj greeneria",
            "landmark": "sddsf",
            "country": "India",
            "zip_code": "411013",
            "state": "Maharashtra",
            "city": "Pune"
        },                                  //address at zero index is defaultAddress
        {
            "name": "Rahul",
            "lastname": "Bhatt",
            "email": "shubham@webologics.com",
            "phone": "123456789",
            "address": "Plot 161, Second Floor, Nitikhand-1, Indirapuram",
            "landmark": "test2",
            "country": "India",
            "zip_code": "201014",
            "state": "Uttar Pradesh",
            "city": "Ghaziabad"
        }
    ],
    wallet: {
        "WalletAmount": 0,
        "TotalCr": 0,
        "TotalDr": 0
    },
    favorites: [
        "Outerwear-Witty-Lavender-Cleanfrontblazer",
        "Tops-Gloaming-PleatedV-NeckTop",
        "Dresses-Felicity-PanelledSheathDress",
        "Dresses-Crescent-ColourBlockDress"
    ],
    measurements: {
        "1657794644681_1": {
            "measure_id": "1657794644681_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657810786991_1": {
            "measure_id": "1657810786991_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657860972120_1": {
            "measure_id": "1657860972120_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657861134978_1": {
            "measure_id": "1657861134978_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657733391010_1": {
            "measure_id": "1657733391010_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657871844062_1": {
            "measure_id": "1657871844062_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657782241018_1": {
            "measure_id": "1657782241018_1",
            "bust": "11",
            "waist": "11",
            "hips": "11",
            "height_f": "4",
            "height_i": "1",
            "biceps": "13",
            "wearing_waist": "11",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "32",
            "brand_top": "Zara",
            "brand_top_other": "",
            "brand_top_size": "EU 36",
            "brand_top_size_other": "",
            "brand_pant": "Marks & Sprencer's",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "EU 44",
            "brand_dress": "Van Heusen",
            "brand_dress_other": "",
            "brand_dress_size": "EU 38",
            "brand_dress_size_other": "",
            "shoulder": "14.5",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        }
    }
}

export const masterDataState = {
    currCurrency: '',
    currSymbol: "₹",
    mobile: false,
    "categories": [
        {
            "category": "TOPS",
            "link": "/shop-tops",
            "new": false
        },
        {
            "category": "SWEATERS",
            "link": "/shop-sweaters",
            "new": true
        },
        {
            "category": "SHIRTS",
            "link": "/shop-shirts",
            "new": false
        },
        {
            "category": "TUNICS",
            "link": "/shop-tunics",
            "new": false
        },
        {
            "category": "JUMPSUITS",
            "link": "/shop-jumpsuits",
            "new": true
        },
        {
            "category": "SHORTS",
            "link": "/shop-shorts",
            "new": true
        },
        {
            "category": "PANTS",
            "link": "/shop-tailored-pants",
            "new": false
        },
        {
            "category": "SKIRTS",
            "link": "/shop-tailored-skirts",
            "new": false
        },
        {
            "category": "DRESSES",
            "link": "/shop-dresses",
            "new": false
        },
        {
            "category": "OUTERWEAR",
            "link": "/shop-outerwear",
            "new": false
        }
    ],
    "accessories": [
        {
            "category": "SCARVES",
            "link": "/shop-scarves",
            "new": false
        },
        {
            "category": "BELTS",
            "link": "/shop-belts",
            "new": false
        },
        {
            "category": "JEWELLERY",
            "link": "/shop-jewellery",
            "new": true
        },
        {
            "category": "MASKS",
            "link": "/shop-masks",
            "new": true
        }
    ],
}


export const userCartState = {
    cart: [
        {
            "product_id": "Giftcards-2000-Voucher",
            "size": "F",
            "qty": 2,
            "cart_id": "Giftcards-2000-Voucher+F",
            "asset_id": "/assets/Giftcards-2000-Voucher/thumb.jpg",
            "tag_line": "",
            "color": {
                "name": "White",
                "code": "#fff"
            },
            "name": "Gift 2000",
            "price": 2000,
            "usd_price": 28
        }
    ]
}

export const ordersState = {
    "currentOrder": {
        product: {},
        date: "",
        paymentMode: "",
        dataOfDelivery: "",
    },
    "pastOrders": {},
}


/*
let tempDataStore = {
    "mobile": false,
    "apiToken": "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0",

    "userData": {
        "contact": "shubham@webologics.com"
    },
    "showSidebarMenuUser": false,
    "userServe": {
        "bust": null,
        "waist": null,
        "hip": null,
        "anyother": 0,
        "cart": {
            "Giftcards-2000-Voucher+F": {
                "product_id": "Giftcards-2000-Voucher",
                "size": "F",
                "qty": 2
            }
        },
        "ref_id": null,
        "temp_user_id": 1658131209802
    },
    "selectedAddress": null,
    "addressIndex": 0,
    "orderPromo": {},
    "fiveDayDelivery": false,
    "currentOrderId": "",
    "currentOrderInCart": {
        "address": {},
        "measurement": {},
        "account": {},
        "order": {},
        "payment": {},
        "shipping_fee": 0,
        "otp_verified": false
    },
    "useWallet": false,
    "refreshFilter": false,
    "filter": [],
    "filterCheckboxes": {}
}

{
    "mobile": false,
    "currCurrency": "inr",
    "currSymbol": "₹",
    "apiToken": "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0",
    "categories": [
        {
            "category": "TOPS",
            "link": "/shop-tops",
            "new": false
        },
        {
            "category": "SWEATERS",
            "link": "/shop-sweaters",
            "new": true
        },
        {
            "category": "SHIRTS",
            "link": "/shop-shirts",
            "new": false
        },
        {
            "category": "TUNICS",
            "link": "/shop-tunics",
            "new": false
        },
        {
            "category": "JUMPSUITS",
            "link": "/shop-jumpsuits",
            "new": true
        },
        {
            "category": "SHORTS",
            "link": "/shop-shorts",
            "new": true
        },
        {
            "category": "PANTS",
            "link": "/shop-tailored-pants",
            "new": false
        },
        {
            "category": "SKIRTS",
            "link": "/shop-tailored-skirts",
            "new": false
        },
        {
            "category": "DRESSES",
            "link": "/shop-dresses",
            "new": false
        },
        {
            "category": "OUTERWEAR",
            "link": "/shop-outerwear",
            "new": false
        }
    ],
    "accessories": [
        {
            "category": "SCARVES",
            "link": "/shop-scarves",
            "new": false
        },
        {
            "category": "BELTS",
            "link": "/shop-belts",
            "new": false
        },
        {
            "category": "JEWELLERY",
            "link": "/shop-jewellery",
            "new": true
        },
        {
            "category": "MASKS",
            "link": "/shop-masks",
            "new": true
        }
    ],
    "userData": {
        "contact": "shubham@webologics.com"
    },
    "userWallet": {
        "WalletAmount": 0,
        "TotalCr": 0,
        "TotalDr": 0
    },
    "showSidebarMenuUser": false,
    "userServe": {
        "email": "shubham@webologics.com",
        "phone_number": "7011281194",
        "user_name": "Shubham",
        "last_name": null,
        "birthday": null,
        "anniversary": null,
        "bust": null,
        "waist": null,
        "hip": null,
        "anyother": 0,
        "favorites": [
            "Outerwear-Witty-Lavender-Cleanfrontblazer",
            "Tops-Gloaming-PleatedV-NeckTop",
            "Dresses-Felicity-PanelledSheathDress",
            "Dresses-Crescent-ColourBlockDress"
        ],
        "cart": {
            "Giftcards-2000-Voucher+F": {
                "product_id": "Giftcards-2000-Voucher",
                "size": "F",
                "qty": 2
            }
        },
        "ref_id": null,
        "temp_user_id": 1658131209802
    },
    "userAddresses": [
        {
            "name": "Dhiraj",
            "lastname": "Pandey",
            "email": "shubham@webologics.com",
            "phone": "07751023687",
            "address": "603, Raviraj greeneria",
            "landmark": "sddsf",
            "country": "India",
            "zip_code": "411013",
            "state": "Maharashtra",
            "city": "Pune"
        },
        {
            "name": "Rahul",
            "lastname": "Bhatt",
            "email": "shubham@webologics.com",
            "phone": "123456789",
            "address": "Plot 161, Second Floor, Nitikhand-1, Indirapuram",
            "landmark": "test2",
            "country": "India",
            "zip_code": "201014",
            "state": "Uttar Pradesh",
            "city": "Ghaziabad"
        }
    ],
    "defaultAddress": {
        "name": "Dhiraj",
        "lastname": "Pandey",
        "email": "shubham@webologics.com",
        "phone": "07751023687",
        "address": "603, Raviraj greeneria",
        "landmark": "sddsf",
        "country": "India",
        "zip_code": "411013",
        "state": "Maharashtra",
        "city": "Pune"
    },
    "selectedAddress": null,
    "addressIndex": 0,
    "userMeasurements": {
        "1657794644681_1": {
            "measure_id": "1657794644681_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657810786991_1": {
            "measure_id": "1657810786991_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657860972120_1": {
            "measure_id": "1657860972120_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657861134978_1": {
            "measure_id": "1657861134978_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657733391010_1": {
            "measure_id": "1657733391010_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657871844062_1": {
            "measure_id": "1657871844062_1",
            "bust": "",
            "waist": "",
            "hips": "",
            "height_f": "",
            "height_i": "",
            "biceps": "",
            "wearing_waist": "",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "",
            "brand_top": "",
            "brand_top_other": "",
            "brand_top_size": "",
            "brand_top_size_other": "",
            "brand_pant": "",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "",
            "brand_dress": "",
            "brand_dress_other": "",
            "brand_dress_size": "",
            "brand_dress_size_other": "",
            "shoulder": "",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        },
        "1657782241018_1": {
            "measure_id": "1657782241018_1",
            "bust": "11",
            "waist": "11",
            "hips": "11",
            "height_f": "4",
            "height_i": "1",
            "biceps": "13",
            "wearing_waist": "11",
            "length": "",
            "abdomen": "",
            "size": "",
            "jeans_pant": "32",
            "brand_top": "Zara",
            "brand_top_other": "",
            "brand_top_size": "EU 36",
            "brand_top_size_other": "",
            "brand_pant": "Marks & Sprencer's",
            "brand_pant_other": "",
            "brand_pant_size_other": "",
            "brand_pant_size": "EU 44",
            "brand_dress": "Van Heusen",
            "brand_dress_other": "",
            "brand_dress_size": "EU 38",
            "brand_dress_size_other": "",
            "shoulder": "14.5",
            "fitting": "",
            "selected_sleeve": "",
            "selected_length": "",
            "biceps_fit": ""
        }
    },
    "userCart": [
        {
            "product_id": "Giftcards-2000-Voucher",
            "size": "F",
            "qty": 2,
            "cart_id": "Giftcards-2000-Voucher+F",
            "asset_id": "/assets/Giftcards-2000-Voucher/thumb.jpg",
            "tag_line": "",
            "color": {
                "name": "White",
                "code": "#fff"
            },
            "name": "Gift 2000",
            "price": 2000,
            "usd_price": 28
        }
    ],
    "userOrderHistory": {},
    "orderPromo": {},
    "fiveDayDelivery": false,
    "currentOrderId": "",
    "currentOrderInCart": {
        "address": {},
        "measurement": {},
        "account": {},
        "order": {},
        "payment": {},
        "shipping_fee": 0,
        "otp_verified": false
    },
    "useWallet": false,
    "refreshFilter": false,
    "filter": [],
    "filterCheckboxes": {}
}
 */
