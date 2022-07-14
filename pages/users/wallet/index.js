import React, {Fragment, useContext, useEffect, useState} from "react";
import AppWideContext from "../../../store/AppWideContext";
import {useRouter} from "next/router";
import PageHead from "../../../components/PageHead";
import Header from "../../../components/navbar/Header";
import Footer from "../../../components/footer/Footer";
import UserPageTemplate from "../../../components/user/UserPageTemplate";
import formatTwoDecimal from "../../../helpers/formatTwoDecimal";
import {isMobile} from "react-device-detect";

function UsersWalletPage() {
    const [mobile, setMobile] = useState(false);
    const router = useRouter();
    const {dataStore} = useContext(AppWideContext);
    useEffect(() => {
        if (dataStore.userData.contact == null)
            router.replace("/"); //illegal direct access
    }, [dataStore.userData.contact, router])
    useEffect(() => {
        setMobile(isMobile)
    }, [])
    const mobileView = <UserPageTemplate mobile={true}>
        <p className="text-[28px] my-2">My Wallet</p>
        <div className="bg-[#f1f2f3] px-8 py-5 w-full">
            <p className="text-[20px] mb-2">SALT Store Credit</p>
            <p className="text-[#777] font-500 mt-4">
                Available Balance: <span
                className={"text-black font-700"}>{dataStore.currSymbol} {formatTwoDecimal(dataStore.userWallet.WalletAmount)}</span>
            </p>
        </div>
        <div className="flex justify-center bg-[#f1f2f3] px-8 py-5 w-full">
            <form action="" className="flex flex-col gap-x-5 flex-1">
                <input type="text" placeholder="Redeem Gift Voucher"
                       className="py-2.5 min-w-[30%] flex-1 text-sm bg-transparent border-black focus:border-black focus:ring-transparent placeholder:text-black"/>
                <button type="submit"
                        className="flex-1 bg-black mx-[25%] text-center mt-3 py-2 px-8 text-white uppercase">Redeem
                </button>
            </form>
        </div>
    </UserPageTemplate>
    const browserView = (
        <UserPageTemplate>
            <p className="text-[28px] mb-2">My Wallet</p>
            <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                <p className="text-[28px] mb-2">SALT Store Credit</p>
                <p className="text-[#777] font-500 mt-4">
                    Available Balance: {dataStore.currSymbol} {formatTwoDecimal(dataStore.userWallet.WalletAmount)}
                </p>
            </div>
            <div className="bg-[#f1f2f3] px-8 py-5 w-full">
                <form action="" className="flex gap-x-5">
                    <input type="text" placeholder="Redeem Gift Voucher"
                           className="py-2.5 px-2 min-w-[30%] text-sm bg-transparent border-black focus:border-black focus:ring-transparent placeholder:text-black"/>
                    <button type="submit" className="bg-black py-2 px-8 text-white uppercase">Redeem</button>
                </form>
            </div>
        </UserPageTemplate>
    )
    return (
        <Fragment>
            <PageHead url={"/users/wallet"} id={"profile"} isMobile={mobile}/>
            <Header type={mobile ? "minimal" : "shopMenu"} isMobile={mobile}/>
            {(mobile) ? mobileView : browserView}
            <Footer isMobile={mobile}/>
        </Fragment>
    )
}

export default UsersWalletPage;
