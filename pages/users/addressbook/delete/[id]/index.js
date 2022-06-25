import {useRouter} from "next/router";
import React, {Fragment, useContext, useEffect} from "react";
import AppWideContext from "../../../../../store/AppWideContext";
import {apiCall} from "../../../../../helpers/apiCall";

function AddressBookDeleteByIdPage(){
    const router = useRouter();
    const {dataStore,updateDataStore} = useContext(AppWideContext);
    const addressId = router.query.id;
    useEffect(()=>{
        if( !addressId || dataStore.userData.contact==null || !dataStore.userAddresses || dataStore.userAddresses.length < (addressId+1))
            router.replace("/"); // no illegal access
    },[addressId,dataStore.userData.contact,dataStore.userAddresses,dataStore.userAddresses.length,router])



    useEffect(()=>{
        const processOnLoad = async ()=> {
            const resp = await apiCall("removeAddressBook", dataStore.apiToken, {
                "user": {
                    email: dataStore.userData.contact
                },
                "address": {
                    "index": addressId
                }
            });
            if (resp.status == 200) {
                const addressCall = await apiCall("userAddresses", dataStore.apiToken, {
                    "user": {
                        email: dataStore.userData.contact
                    }
                });
                if (addressCall.hasOwnProperty("response") && addressCall.response) {
                    updateDataStore("userAddresses", [...addressCall.response]);
                }
            }
        }
        processOnLoad()
            .then(()=>{router.back()})
    },[router,updateDataStore,addressId,dataStore.apiToken,dataStore.userData.contact])

    return <Fragment>Deleting Address</Fragment>;
}

export default AddressBookDeleteByIdPage;
