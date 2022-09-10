import {useRouter} from "next/router";
import React, {Fragment, useEffect} from "react";
import {userState} from "../../../ReduxStore/initialStates";
import {connect} from "react-redux";
import {setUserState} from "../../../ReduxStore/reducers/userSlice";

function UsersLogoutPage(props) {
    const router = useRouter();
    useEffect(() => {
        props.setUserState(userState)
        router.replace("/");
    }, [])
    return <Fragment>Logging out ...</Fragment>;
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps,{setUserState})(UsersLogoutPage);
