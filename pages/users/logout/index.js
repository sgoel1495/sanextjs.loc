import {useRouter} from "next/router";
import React, {useEffect} from "react";
import {userState} from "../../../ReduxStore/initialStates";
import {connect} from "react-redux";
import {setUserState} from "../../../ReduxStore/reducers/userSlice";
import {setCart} from "../../../ReduxStore/reducers/shoppingCartSlice";
import AppLoading from "../../../components/common/AppLoading";

function UsersLogoutPage(props) {
    const router = useRouter();
    useEffect(() => {
        props.setUserState(userState)
        props.setCart([])
        router.replace("/");
    }, [])
    return <AppLoading/>;
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {setUserState, setCart})(UsersLogoutPage);
