import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import Header from "../../../components/navbar/Header";

function HomepageSignInPage() {
    const {dataStore} = useContext(AppWideContext);
    // const category = "Contact Us";
    const [view, setView] = useState("SIGN_IN")         // other value is "SIGN_UP"
    const [signInStep, setSignInStep] = useState(0)

    const mobileView = (
        view === "SIGN_IN"
            ? <>
                <div className="flex-col mt-20 p-8 border-0 shadow-none uppercase text-xs bg-transparent">
                <span className={"relative left-45"}>
                    <img src="https://saltattire.com/assets/images/close-black.png" className={"w-4"}/>
                </span>
                    <div className="uppercase text-xs">
                        <span className="underline">Sign In</span>
                        <span> |</span>
                    </div>
                    <div className="uppercase text-xs text-neutral-500">
                    <span className="cursor-pointer inline">
                        <span onClick={() => {
                            setView("SIGN_UP")
                        }}>  Sign Up | </span>
                        <span className="cursor-pointer inline">Forgot Your Password?</span>
                    </span>
                    </div>
                    <div>
                        <form action="">
                            <div className={'my-4'}>
                                <input type="text" placeholder={"email/phone (required)"} className={'w-full mb-1'}/>
                                <input type="password" placeholder={"enter your password"} className={'w-full mt-1'}/>
                            </div>
                            <div className={"flex flex-col justify-evenly text-center h-32 px-16 mt-1"}>
                                <button className="uppercase py-2 px-4 my-1 border-solid border-2 border-gray-200">
                                    Sign in
                                </button>
                                <span className="uppercase ">
                                or
                                </span>
                                <button className="py-2 px-4 my-1 border-solid border-2 border-gray-200">
                                    Login using OTP
                                </button>
                                <button className="py-2 px-4 my-1 border-solid border-2 border-gray-200">
                                <span>
                                Login using Facebook
                            </span>
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </>
            :
            view === "SIGN_UP" ?
                <>
                    <div className="flex-col mt-20 p-8 border-0 shadow-none uppercase text-xs bg-transparent">
                <span className={"relative left-45"}>
                    <img src="https://saltattire.com/assets/images/close-black.png" className={"w-4"}/>
                </span>
                        <div className="uppercase text-xs">
                            <span className="underline">Sign Up</span>
                            <span> |</span>
                        </div>
                        <div className="uppercase text-xs text-neutral-500">
                    <span className="cursor-pointer">
                        <span className="cursor-pointer inline">Already have an account?</span>
                        <span>  Sign In </span>
                    </span>
                        </div>
                        <div className={'mt-3'}>
                            <h6>Step 1 of 2 | Personal Information</h6>
                            <form action="">
                                <div className={'mb-4'}>
                                    <input type="text" placeholder={"full name (required)"}
                                           className={'w-full mb-1'}/>
                                    <input type="password" placeholder={"email (required)"}
                                           className={'w-full mt-1'}/>
                                    <input type="password" placeholder={"phone (required)"}
                                           className={'w-full mt-1'}/>
                                </div>
                                <div className={"flex flex-start text-center h-8 mt-1"}>
                                    <button className="uppercase px-4 border-solid border-2 border-gray-200"
                                            onClick={setSignInStep(signInStep + 1)}>
                                        Next
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </>
                : ''
    );

    const browserView = <></>;

    return (
        <Fragment>
            <PageHead
                url="/homepage/signin"
                id="signin"
                isMobile={dataStore.mobile}
            />
            <Header
                type={dataStore.mobile ? "minimal" : "shopMenu"}
                isMobile={dataStore.mobile}
            />
            {dataStore.mobile ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile} minimal={true} color={"#f5f5f5"}/>
        </Fragment>
    );
}

export default HomepageSignInPage;
