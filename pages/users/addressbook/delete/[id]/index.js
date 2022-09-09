import {useRouter} from "next/router";
import React, {Fragment, useContext, useEffect} from "react";
import AppWideContext from "../../../../../store/AppWideContext";
import {apiCall} from "../../../../../helpers/apiCall";
import {connect} from "react-redux";
import {setUserAddresses} from "../../../../../ReduxStore/reducers/userSlice";

function AddressBookDeleteByIdPage({appConfig, userData,...props}) {
    const router = useRouter();
    const addressId = router.query.id;
    useEffect(() => {
        if (!addressId || userData.userServe.email == null || !userData.userAddresses || userData.userAddresses.length < (addressId + 1))
            router.replace("/"); // no illegal access
    }, [addressId, userData.userServe.email, userData.userAddresses, userData.userAddresses.length, router])


    useEffect(() => {
        const processOnLoad = async () => {
            const resp = await apiCall("removeAddressBook", appConfig.apiToken, {
                "user": {
                    email: userData.userServe.email
                },
                "address": {
                    "index": addressId
                }
            });
            if (resp.status == 200) {
                const addressCall = await apiCall("userAddresses", appConfig.apiToken, {
                    "user": {
                        email: userData.userServe.email
                    }
                });
                if (addressCall.hasOwnProperty("response") && addressCall.response) {
                    props.setUserAddresses("userAddresses", [...addressCall.response]);
                }
            }
        }
        processOnLoad()
            .then(() => {
                router.back()
            })
    }, [router, addressId, appConfig.apiToken, userData.userServe.email])

    return <Fragment>Deleting Address</Fragment>;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps,{setUserAddresses})(AddressBookDeleteByIdPage);
