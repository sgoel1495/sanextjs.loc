import {useRouter} from "next/router";
import React, {Fragment, useContext, useEffect} from "react";
import AppWideContext from "../../../../../store/AppWideContext";
import {apiCall} from "../../../../../helpers/apiCall";

function AddressBookDeleteByIdPage(){
    const router = useRouter();
    const query = router.query;
    const {dataStore,updateDataStore} = useContext(AppWideContext);
    const addressId = query.pageid;
    if( !addressId || dataStore.userData.contact==null || !dataStore.userAddresses.length < (addressId+1) )
        router.replace("/"); // no illegal access

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
        router.back();
    }

    useEffect(()=>{
        processOnLoad();
    },[]);// eslint-disable-line react-hooks/exhaustive-deps

    return <Fragment>Deleting Address</Fragment>;
}

export default AddressBookDeleteByIdPage;
