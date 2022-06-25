const getUserO = (dataStore,alternate=false, contact=false) => {
    let tempId = Date.now()
    let userO = null
    if(contact)
         userO = {
            contact: "",
            is_guest: true,
            temp_user_id: tempId
        }
    else
         userO = {
            email: "",
            is_guest: true,
            temp_user_id: tempId
        }
    console.log("Starting Out ",userO)
    if (dataStore) {
        if(contact)
            userO = {
                contact: (dataStore.userData.contact) ? dataStore.userData.contact : "",
                is_guest: !(dataStore.userData.contact),
                temp_user_id: (dataStore.userServe.temp_user_id)? dataStore.userServe.temp_user_id : tempId
            }
        else
            userO = {
                email: (dataStore.userData.contact) ? dataStore.userData.contact : "",
                is_guest: !(dataStore.userData.contact),
                temp_user_id: (dataStore.userServe.temp_user_id)? dataStore.userServe.temp_user_id : tempId
            }
        console.log("Have DataStore ",userO)
        if(alternate && !dataStore.userData.contact){
            userO.is_guest = true
            if(dataStore.userServe.email!==""){
                if(contact)
                    userO.contact=dataStore.userServe.email
                else
                    userO.email=dataStore.userServe.email
            } else if(
                dataStore.currentOrderInCart
                && dataStore.currentOrderInCart.address
                && dataStore.currentOrderInCart.address.hasOwnProperty("email")
                && dataStore.currentOrderInCart.address.email!==""
            ){
                if(contact)
                    userO.contact=dataStore.currentOrderInCart.address.email
                else
                    userO.email=dataStore.currentOrderInCart.address.email
            }
            console.log("Have Alternate ",userO)
        }
    }
    console.log("USER OBJECT",userO)
    return userO
}
export default getUserO