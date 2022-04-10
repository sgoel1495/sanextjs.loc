import React, {Fragment} from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import Toast from "../../common/Toast";


function UserLogin(props) {
    /*
    *@todo @team complete login logic
    *@todo default alerts to be replaces by react alerts
    *@todo Facebook Login API needed
    */
    const {closeModal} = props;
    const mobileView = null;
    const [active, setActive] = React.useState(0)
    const [show, setShow] = React.useState(false)
    const [feedback, setFeedback] = React.useState('')

    const showToast = (text) =>{
        setFeedback(text);
        setShow(true);
    }

    let ActiveForm = <></>
    switch (active) {
        case 0:
            ActiveForm = <LoginForm showToast={showToast}/>
            break;
        case 1:
            ActiveForm = <SignUpForm showToast={showToast}/>
            break;
        case 2:
            ActiveForm = <ForgotPassword closeModal={closeModal} showToast={showToast}/>
            break;
    }
    const browserView = (
        <div id="userlogindiv" className={`bg-theme-900/50 fixed inset-0 z-20`}>
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
                    {(active==0)
                        ?<Fragment>
                            <div className={active === 0 ? `underline text-black/80 cursor-default  font-bold` : 'cursor-pointer'} onClick={() => setActive(0)}>Sign In</div>
                            <span>|</span>
                            <div className={active === 1 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(1)}>Sign Up</div>
                            <span>|</span>
                            <div className={active === 2 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(2)}>Forgot your password?</div>
                        </Fragment>
                     :(active==1)
                        ?<Fragment>
                            <div className={active === 1 ? `underline text-black/80 cursor-default  font-bold` : 'cursor-pointer'} onClick={() => setActive(1)}>Sign Up</div>
                            <span>|</span>
                            <div className={active === 0 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(0)}>Sign In</div>
                            <span>|</span>
                            <div className={active === 2 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(2)}>Forgot your password?</div>
                        </Fragment>
                     :(active==2)
                        ?<Fragment>
                            <div className={active === 2 ? `underline text-black/80 cursor-default  font-bold` : 'cursor-pointer'} onClick={() => setActive(2)}>Forgot your password?</div>
                            <span>|</span>
                            <div className={active === 0 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(0)}>Sign In</div>
                            <span>|</span>
                            <div className={active === 1 ? `underline text-black/80 cursor-default` : 'cursor-pointer'} onClick={() => setActive(1)}>Sign Up</div>
                        </Fragment>
                      :null
                    }
                </div>
                {ActiveForm}
                <Toast show={show} hideToast={() => setShow(false)}>
                    <span>{feedback}</span>
                </Toast>
            </div>
        </div>);

    return props.isMobile ? mobileView : browserView
}

export default UserLogin