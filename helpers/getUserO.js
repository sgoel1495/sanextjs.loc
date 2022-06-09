const getUserO = (dataStore,alternate=false) => {
    let tempId = Date.now()
    let userO = {
        email: "",
        is_guest: true,
        temp_user_id: tempId
    }
    console.log("Starting Out ",userO)
    if (dataStore) {
        userO = {
            email: (dataStore.userData.contact) ? dataStore.userData.contact : "",
            is_guest: !!(dataStore.userData.contact),
            temp_user_id: (dataStore.userServe.temp_user_id)? dataStore.userServe.temp_user_id : tempId
        }
        console.log("Have DataStore ",userO)
        if(alternate && !dataStore.userData.contact){
            if(dataStore.userServe.email!==""){
                userO.email=dataStore.userServe.email
            } else if(
                dataStore.currentOrderInCart
                && dataStore.currentOrderInCart.address
                && dataStore.currentOrderInCart.address.hasOwnProperty("email")
                && dataStore.currentOrderInCart.address.email!==""
            ){
                userO.email=dataStore.currentOrderInCart.address.email
            }
            console.log("Have Alternate ",userO)
        }
    }
    console.log("USER OBJECT",userO)
    return userO
}
export default getUserO