import React, {Fragment, useContext, useEffect, useState} from "react";
import PageHead from "../../../components/PageHead";
import Footer from "../../../components/footer/Footer";
import AppWideContext from "../../../store/AppWideContext";
import Header from "../../../components/navbar/Header";

function HomepageSignInPage() {
    const {dataStore} = useContext(AppWideContext);
    // const category = "Contact Us";
    const mobileView = (
        <>

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
                        <span>  Sign Up | </span>
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
