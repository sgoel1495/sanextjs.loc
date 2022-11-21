import React, {Fragment, useReducer, useState} from 'react';
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import Toast from "../../../components/common/Toast";
import {connect} from "react-redux";
import Loader from "../../../components/common/Loader";

const Index = ({isMobile}) => {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useReducer((state, e) => {
        return {...state, [e.target.name]: e.target.value}
    }, {})

    const verifyOTP = () => {

    }

    const inputStyle = "placeholder:text-black/30 border-black focus:ring-0 focus:border-black focus:shadow-none border py-2 px-4 text-sm leading-none";
    const buttonStyle = "uppercase border py-3 px-6 text-sm text-white font-600 tracking-wider bg-black";
    return (
        <Fragment>
            <PageHead url={"/users/favourites"} id={"profile"} isMobile={isMobile}/>
            <Header type={isMobile ? "minimal" : "shopMenu"} isMobile={isMobile}/>
            <div className={"container grid place-items-center gap-5 mt-12 mb-44"}>
                <div className={"text-center uppercase tracking-widest font-600 text-[#333]"}>
                    change password
                </div>
                <input
                    type="number"
                    placeholder="OTP"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"otp"}
                    onChange={setPayload}
                />
                <input
                    type="text"
                    placeholder="New Password"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"new_password"}
                    onChange={setPayload}
                />
                <input
                    type="text"
                    placeholder="Confirm Password"
                    className={`${inputStyle}`}
                    disabled={loading}
                    name={"confirm_password"}
                    onChange={setPayload}
                />
                <button
                    type="submit"
                    className={`${buttonStyle}`}
                    disabled={loading}
                    onClick={verifyOTP}
                >
                    {
                        loading ?
                            <Loader className="text-grey"/>
                            :
                            <>Submit</>
                    }
                </button>
            </div>
            <Footer isMobile={isMobile} minimal={true}/>
            <Toast show={show} hideToast={() => setShow(false)}>
                {isMobile}
            </Toast>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isMobile: state.appConfig.isMobile
    }
}

export default connect(mapStateToProps)(Index);