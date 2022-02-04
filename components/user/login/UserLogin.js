import React from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";


function UserLogin(props) {
    /*
    *@todo @team complete login logic
    *@todo default alerts to be replaces by react alerts
    *@todo Facebook Login to be done
    */
    const {closeModal} = props;
    const mobileView = null;
    const [active, setActive] = React.useState(0)
    let ActiveForm = <></>
    switch (active) {
        case 0:
            ActiveForm = <LoginForm/>
            break;
        case 1:
            ActiveForm = <SignUpForm/>
            break;
        case 2:
            ActiveForm = <ForgotPassword closeModal={closeModal}/>
            break;
    }
    const browserView = (
        <div className={`bg-theme-900/50 fixed inset-0 z-20`} onClick={closeModal}>
            <div
                className="h-fit w-full bg-white overflow-hidden p-10 flex flex-col gap-y-8 relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button className={`w-8 h-8 absolute right-10 top-10`} onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-8 h-8`} viewBox="0 0 24 24">
                        <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"/>
                    </svg>
                </button>
                <div className={`flex items-center gap-x-4 text-sm uppercase text-black/60`}>
                    <div className={active===0?`underline text-black/80 cursor-default`:'cursor-pointer'} onClick={() => setActive(0)}>Sign In</div>
                    <span>|</span>
                    <div className={active===1?`underline text-black/80 cursor-default`:'cursor-pointer'} onClick={() => setActive(1)}>Sign Up</div>
                    <span>|</span>
                    <div className={active===2?`underline text-black/80 cursor-default`:'cursor-pointer'} onClick={() => setActive(2)}>Forgot your password?</div>
                </div>
                {ActiveForm}
            </div>
        </div>);

    return props.isMobile ? mobileView : browserView
}

export default UserLogin