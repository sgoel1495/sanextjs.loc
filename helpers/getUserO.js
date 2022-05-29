const getUserO = (dataStore) => {
    let tempId = Date.now()
    let userO = {
        email: "",
        is_guest: true,
        temp_user_id: tempId
    }
    if (dataStore) {
        userO = {
            email: (dataStore.userData.contact) ? dataStore.userData.contact : "",
            is_guest: !!(dataStore.userData.contact),
            temp_user_id: (dataStore.userServe.temp_user_id)? dataStore.userServe.temp_user_id : tempId
        }
    }
    console.log("USER OBJECT",userO)
    return userO
}
export default getUserO