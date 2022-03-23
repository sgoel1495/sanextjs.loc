import React, {useContext} from 'react';
import Loader from "../../common/Loader";
import {validateEmail} from "../../../helpers/loginSignUpHelpers";
import {apiDictionary} from "../../../helpers/apiDictionary";
import AppWideContext from "../../../store/AppWideContext";

const SignUpForm = (props) => {

    const {dataStore, updateDataStore} = useContext(AppWideContext);
    const [stage, setStage] = React.useState(0)
    const [loading, setLoading] = React.useState(false)
    const [isValid, setIsValid] = React.useState({
        full_name: true,
        email: true,
        phone: true,
        password: true,
        confirm_password: true
    })
    const [data, setData] = React.useState({
        full_name: '',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
    })

    const saveUserDataAfterSuccessfulLogin = (username) => {
        let userData = {
            contact: username
        }
        updateDataStore("userData", userData);
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    const validateData = () => {
        if (data.full_name.length < 3) {
            if (data.full_name.length)
                props.showToast("Name should be minimum of 3 characters long")
            else
                props.showToast('Please enter a Full Name')
            setIsValid({...isValid, email: true, phone: true, full_name: false});
            return false
        }
        if (!validateEmail(data.email)) {
            props.showToast('Please enter a valid email')
            setIsValid({...isValid, email: data.email !== '', phone: true, full_name: true});
            return false
        }
        if (!data.phone) {
            props.showToast('Please enter a valid phone number')
            setIsValid({...isValid, email: true, phone: false, full_name: true});
            return false
        }
        if (stage === 0)
            return true
        if (data.password.length < 6) {
            if (data.password)
                props.showToast('Your Password must be 6 character long.')
            else
                props.showToast('Please enter your password')
            setData({...data, password: "", confirm_password: ""})
            setIsValid({...isValid, password: false, confirm_password: false});
            return false
        }
        if (data.confirm_password !== data.password) {
            if (data.confirm_password.length === 0)
                props.showToast('Please enter Confirm Password');
            else if (data.confirm_password.length < 6)
                props.showToast('Please Enter Minimum 6 character Confirm Password')
            else
                props.showToast("Password and Confirm Password should be same")
            setData({...data, password: "", confirm_password: ""})
            setIsValid({...isValid, password: false, confirm_password: false});
            return false
        }
        return true
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (stage === 0)
                setStage(1)
            else {
                setLoading(true)
                let api = apiDictionary("userSignUp", dataStore.apiToken, data)
                fetch(api.url, api.fetcher).then((response) => {
                    if (response.status === 200) {
                        response.json().then(respData => {
                            if (respData['status'] === 200) {
                                saveUserDataAfterSuccessfulLogin(data.email)
                            } else {
                                props.showToast(respData['response'].toUpperCase())
                            }
                        })
                    }
                }).finally(() => {
                    setLoading(false)
                })
            }
        }
    }


    const goBack = () => {
        setData({...data, password: "", confirm_password: ""})
        setIsValid({...isValid, password: true, confirm_password: true})
        setStage(0)
    }

    const inputStyle = "placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-2 px-4 text-sm leading-none";
    const buttonStyle = "uppercase border py-3 px-6 text-sm text-black/60 font-600 tracking-wider border-black/30 hover:border-black duration-100";
    return (
        <>
            <span className={"text-xs font-700"}>{stage === 0 ? "Step 1 of 2 | Personal Information" : "Step 2 of 2 | Login Credentials"}</span>
            <form className={`grid grid-cols-4 gap-x-8`} onSubmit={onSubmit}>
                {
                    stage === 0 ?
                        <>
                            <input
                                type="text"
                                placeholder="Full Name (required)"
                                className={inputStyle + [isValid.full_name ? "" : " placeholder:text-red-600"]}
                                value={data.full_name}
                                onChange={(e) => setData({...data, full_name: e.target.value})}
                            />
                            <input
                                type="text"
                                className={inputStyle + [isValid.email ? "" : " placeholder:text-red-600"]}
                                placeholder={"email (required)"}
                                value={data.email}
                                onChange={(e) => setData({...data, email: e.target.value})}
                            />
                            <input
                                type="tel"
                                pattern="[6789][0-9]{9}"
                                className={inputStyle + [isValid.phone ? "" : " placeholder:text-red-600"]}
                                placeholder={"phone (required)"}
                                value={data.phone}
                                onChange={(e) => setData({...data, phone: e.target.value})}
                            />
                            <div>
                                <button
                                    type="submit"
                                    className={`${buttonStyle}`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                        :
                        <>
                            <input
                                type="password"
                                placeholder="Password (required)"
                                className={inputStyle + [isValid.password ? "" : " placeholder:text-red-600"]}
                                value={data.password}
                                onChange={(e) => setData({...data, password: e.target.value})}
                            />
                            <input
                                type="password"
                                className={inputStyle + [isValid.confirm_password ? "" : " placeholder:text-red-600"]}
                                placeholder={"Confirm Password (required)"}
                                value={data.confirm_password}
                                onChange={(e) => setData({...data, confirm_password: e.target.value})}
                            />
                            <div className={`col-span-2 flex items-center gap-x-8 justify-start`}>
                                {loading || <button
                                    type="button"
                                    onClick={goBack}
                                    className={`${buttonStyle}`}
                                >
                                    Previous
                                </button>}
                                <button
                                    type="submit"
                                    className={`${buttonStyle}`}
                                >
                                    {
                                        loading ?
                                            <Loader className="text-grey"/>
                                            :
                                            <>Finish</>
                                    }
                                </button>
                            </div>
                        </>
                }

            </form>
        </>
    );
};

export default SignUpForm;