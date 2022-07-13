import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import {isMobile} from "react-device-detect";
import formatTwoDecimal from "../../../helpers/formatTwoDecimal";
import Image from "next/image";
import Toast from "../../../components/common/Toast";


function UsersMyReferralsPage() {
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    const [mobile, setMobile] = useState(false);
    const mockFlag = useState(false)
    const [showToaster, setShowToaster] = useState(false)
    const WEBASSETS = process.env.NEXT_PUBLIC_WEBASSETS;

    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])

    useEffect(() => {
        setMobile(isMobile)
    }, [])

    async function copyTextToClipboard() {
        let text = document.getElementById("referralCodeIDValue").innerHTML
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const mobileView = (
        <UserPageTemplate mobile={true}>
            <p className="text-[28px] mb-2">My Referral</p>
            {
                mockFlag
                    ? <div className={"p-4 bg-[#f1f2f3]"}>
                        <p className="text-xl font-500 mb-2 mt-1 w-full">SALT Referral Code</p>
                        <p className="font-700" id={"referralCodeIDValue"}>VARUN10</p>
                        <Image
                            src={WEBASSETS + "/assets/images/share_icon.svg"}
                            height={"10px"}
                            width={"10px"}
                            onClick={() => {
                                copyTextToClipboard().then(() => {
                                    setShowToaster(true)
                                })
                            }}
                        />
                    </div>
                    : <p className="text-[#777] text-lg">No Record Found!</p>
            }
        </UserPageTemplate>
    )
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Referral</p>
            <p className="text-[#777] text-lg">No Record Found!</p>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/my-referral"} id={"profile"} isMobile={dataStore.mobile}/>
            <Header type={dataStore.mobile ? "minimal" : "shopMenu"} isMobile={dataStore.mobile}/>
            {mobile ? mobileView : browserView}
            <Footer isMobile={dataStore.mobile}/>
            <Toast show={showToaster} hideToast={() => setShowToaster(false)}>
                <span>Referral Code copied to share</span>
            </Toast>
        </Fragment>

    )
}

export default UsersMyReferralsPage;
