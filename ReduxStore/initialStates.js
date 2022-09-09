export const userState = {
    userServe: {
        "email": "",
        "phone_number": "",
        "user_name": "",
        "favorites": [],
        "cart": {},
        "ref_id": null,
        "temp_user_id": ""
    },
    defaultAddress: {},
    userAddresses: [],
    wallet: {},
    measurements: {}
}

export const shoppingCartState = {
    cart: []
}

export const filterState = {
    filter:[],
    refreshFilter:false,
    filterCheckboxes: {},
    sortBy:""
}

export const userConfigState = {
    currCurrency: "inr",
    currSymbol: "₹",
    showLogin: false
}

export const appConfigState = {
    apiToken: "b16ee1b2bcb512f67c3bca5fac24a924fcc2241bcbfe19ddfdde33ecd24114a0", // used
    isMobile: false,
    categories: [
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
    accessories: [
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

export const orderState = {
    currentOrderId: "",
    orderSummary: {},
    orderHistory: []
}
