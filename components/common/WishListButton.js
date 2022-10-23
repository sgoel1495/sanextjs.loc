import React, {useContext, useEffect, useState} from "react";
import AppWideContext from "../../store/AppWideContext";
import {apiCall} from "../../helpers/apiCall";
import {useRouter} from "next/router";
import ReactDom from "react-dom";
import AccountMenu from "../user/AccountMenu";
import UserLogin from "../user/login/UserLogin";
import Toast from "./Toast";
import {connect} from "react-redux";
import {setUserServe} from "../../ReduxStore/reducers/userSlice";
import {setShowLogin} from "../../ReduxStore/reducers/userConfigSlice";

/**
 * @NoteG the favs of a user are available in api
 * ProductId has to be in props.
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const WishListButton = (props) => {
    const [pidChecked, setPidChecked] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (props.userData.userServe.favorites.includes(props.pid))
            setPidChecked(true);
    }, [props.userData.userServe.email, props.userData.userServe.favorites, props.pid])

    const addRemoveFav = async () => {
        console.log(props)
        if (props.userData.userServe.email) {
            const oldUserServe = JSON.parse(JSON.stringify(props.userData.userServe));
            if (pidChecked) {
                //remove
                oldUserServe.favorites = props.userData.userServe.favorites.filter((value, index, arr) => {
                    return (value != props.pid)
                });
                props.setUserServe(oldUserServe);
                const resp = await apiCall("removeFromFav", props.appConfig.apiToken, {
                    product: props.pid,
                    email: props.userData.userServe.email
                });
                setPidChecked(false);
            } else {
                //add
                oldUserServe.favorites = [props.pid, ...props.userData.userServe.favorites];
                props.setUserServe(oldUserServe);
                const resp = await apiCall("addToFav", props.appConfig.apiToken, {
                    product: props.pid,
                    email: props.userData.userServe.email
                });
                setPidChecked(true);
            }
            setTimeout(()=>{
                setShow(true)
            },100)
        } else {
            if (props.isMobile) {
                setShow(true)
            } else {
                props.setShowLogin(true);
            }
        }
    };

    return <button className={`w-6 h-6 ${props.className}`} onClick={addRemoveFav}>
        {pidChecked
            ? <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} fillOpacity={1} viewBox="0 0 24 24">
                <path
                    d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"/>
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6`} fillOpacity={0.5} viewBox="0 0 24 24">
                <path
                    d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"/>
            </svg>
        }
        <Toast show={show} hideToast={() => setShow(false)}>
            <span>{props.userData.userServe.email?pidChecked?props.pid.split("-")[1]+" added to your Favourites.":props.pid.split("-")[1]+" removed from your Favourites.":"Please login first."}</span>
        </Toast>
    </button>;
}

const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps, {setUserServe, setShowLogin})(WishListButton);