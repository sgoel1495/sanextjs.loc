import {getUserObject} from "./addTocart";
import {apiCall} from "./apiCall";

export const saveCartMeasurements = (dataStore, updateDataStore, cart) => {
    let user = getUserObject(dataStore, updateDataStore)
    console.log(cart)
    cart.forEach(item => {
        if (item.is_tailor)
            apiCall("addMeasurements", dataStore.apiToken, {
                user: user,
                measurments: item.meas
            }).then(r => {
            })

    })

}