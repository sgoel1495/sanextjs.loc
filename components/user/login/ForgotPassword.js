import React, {useContext, useState} from 'react';
import Loader from "../../common/Loader";
import {validateUsername} from "../../../helpers/loginSignUpHelpers";
import {apiDictionary} from "../../../helpers/apiDictionary";
import {connect} from "react-redux";

const ForgotPassword = (props) => {

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        let isValid = validateUsername(username)
        if (!isValid["valid"]) {
            if (isValid['type'] === "email") {
                props.showToast("Please enter a valid email")
            } else {
                props.showToast("Please enter a valid email/phone")
            }
            return
        }
        setLoading(true)
        let api = apiDictionary("forgotPassword", props.appConfig.apiToken, {username: username})
        fetch(api.url, api.fetcher).then((response) => {
            if (response.status === 200) {
                response.json().then(respData => {
                    if (respData['status'] === 200) {
                        props.showToast("Link to Reset password sent on email/phone")
                        // props.closeModal();
                    } else {
                        props.showToast(respData['response']['body'].toUpperCase())
                    }
                })
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const inputStyle = "placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-2 px-4 text-sm leading-none";
    const buttonStyle = "uppercase border py-3 px-6 text-sm text-black/60 font-600 tracking-wider border-black/30 hover:border-black duration-100";
    return (
        <form className={props.appConfig.isMobile ? "grid grid-cols-1 gap-y-4":"grid grid-cols-4 gap-x-8"} onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="email/phone (required)"
                className={`${inputStyle}`}
                disabled={loading}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className={`col-span-2 flex items-center gap-x-8 justify-start`}>
                <button
                    type="submit"
                    className={`${buttonStyle}`}
                    disabled={loading}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            <>Send Link</>
                    }
                </button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        appConfig: state.appConfig
    }
}

export default connect(mapStateToProps)(ForgotPassword);