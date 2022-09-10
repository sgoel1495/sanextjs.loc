import {getUserObject} from "./addTocart";
import {apiCall} from "./apiCall";

export const saveCartMeasurements = (userData, apiToken, cart) => {
    let user = getUserObject(userData)
    cart.forEach(item => {
        if (item.is_tailor)
            apiCall("addMeasurements", apiToken, {
                user: user,
                measurments: item.meas
            }).then(r => {
            })

    })

}